'use client';

import { useState, useRef, useEffect } from 'react';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function VoiceRecorder({ onTranscript, disabled, className = '' }: VoiceRecorderProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<{
    start: () => void;
    stop: () => void;
    abort: () => void;
  } | null>(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const win = window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown };
    const API = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!API) {
      setSupported(false);
      return;
    }
    const rec = new API() as {
      start: () => void;
      stop: () => void;
      abort: () => void;
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onresult: (e: { resultIndex: number; results: { length: number; [i: number]: { [0]: { transcript: string }; isFinal?: boolean } } }) => void;
      onerror: () => void;
    };
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'fr-FR';
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const text = res[0]?.transcript ?? '';
        if (res.isFinal) {
          finalTranscriptRef.current += text;
        } else {
          interim += text;
        }
      }
      setTranscript(finalTranscriptRef.current + interim);
    };
    rec.onerror = () => setIsListening(false);
    recognitionRef.current = rec;
    return () => {
      try {
        rec.abort();
      } catch {}
    };
  }, []);

  const toggle = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      const text = finalTranscriptRef.current.trim() || transcript.trim();
      if (text) onTranscript(text);
      finalTranscriptRef.current = '';
    } else {
      finalTranscriptRef.current = '';
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!supported) {
    return (
      <p className="text-sm text-amber-600">
        Reconnaissance vocale non supportée par ce navigateur. Utilise Chrome ou Edge.
      </p>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
          isListening
            ? 'bg-red-100 text-red-700'
            : 'bg-[#377CF3]/10 text-[#377CF3] hover:bg-[#377CF3]/20'
        }`}
      >
        <span className="text-xl">{isListening ? '⏹' : '🎤'}</span>
        {isListening ? 'Arrêter' : 'Dicter'}
      </button>
      {transcript && (
        <p className="mt-2 text-sm text-neutral-600">
          Transcription : {transcript.slice(0, 200)}
          {transcript.length > 200 ? '...' : ''}
        </p>
      )}
    </div>
  );
}
