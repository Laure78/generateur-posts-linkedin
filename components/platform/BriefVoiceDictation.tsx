'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

type BriefVoiceDictationProps = {
  onTranscript: (text: string) => void;
  disabled?: boolean;
};

type SpeechRecognitionCtor = new () => {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult:
    | ((ev: {
        resultIndex?: number;
        results: { length: number; [i: number]: { [j: number]: { transcript: string } } };
      }) => void)
    | null;
  onerror: ((ev: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognition(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Dictée vocale (Web Speech API) — Chrome / Edge / Safari récents. */
export function BriefVoiceDictation({ onTranscript, disabled }: BriefVoiceDictationProps) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionCtor> | null>(null);

  useEffect(() => {
    setSupported(Boolean(getSpeechRecognition()));
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Ctor = getSpeechRecognition();
    if (!Ctor) {
      setError('Dictée non supportée sur ce navigateur (utilisez Chrome ou Edge).');
      return;
    }
    setError(null);
    const rec = new Ctor();
    rec.lang = 'fr-FR';
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (event) => {
      let transcript = '';
      const start = event.resultIndex ?? 0;
      for (let i = start; i < event.results.length; i++) {
        const part = event.results[i]?.[0]?.transcript;
        if (part) transcript += part;
      }
      if (transcript.trim()) onTranscript(transcript.trim());
    };
    rec.onerror = (ev) => {
      setError(ev.error === 'not-allowed' ? 'Autorisez le micro dans le navigateur.' : `Erreur : ${ev.error}`);
      setListening(false);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }, [onTranscript]);

  useEffect(() => () => stop(), [stop]);

  if (!supported) {
    return (
      <p className="text-xs text-slate-400">
        Dictée vocale : non disponible sur ce navigateur.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => (listening ? stop() : start())}
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ring-1 transition-colors ${
          listening
            ? 'bg-red-50 text-red-800 ring-red-200'
            : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50'
        }`}
      >
        {listening ? <MicOff size={16} /> : <Mic size={16} />}
        {listening ? 'Arrêter la dictée' : 'Dicter le brief'}
      </button>
      {listening && (
        <span className="text-xs text-red-600 animate-pulse">Écoute en cours… parlez clairement.</span>
      )}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
