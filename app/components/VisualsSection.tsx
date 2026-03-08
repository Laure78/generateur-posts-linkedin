'use client';

import { useState, useEffect, useRef } from 'react';

const BLUE = '#377CF3';

type VisualsSectionProps = {
  postContent: string;
  /** Quand défini et change, lance la génération de tous les visuels automatiquement */
  triggerFullGeneration?: number;
};

export default function VisualsSection({ postContent, triggerFullGeneration }: VisualsSectionProps) {
  const lastTriggerRef = useRef<number>(0);

  useEffect(() => {
    if (triggerFullGeneration && triggerFullGeneration !== lastTriggerRef.current && postContent.trim()) {
      lastTriggerRef.current = triggerFullGeneration;
      generateAll();
    }
  }, [triggerFullGeneration, postContent]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [infographicUrl, setInfographicUrl] = useState<string | null>(null);
  const [infographicLoading, setInfographicLoading] = useState(false);

  const [carouselLoading, setCarouselLoading] = useState(false);
  const [carouselViralLoading, setCarouselViralLoading] = useState(false);

  const [allLoading, setAllLoading] = useState(false);

  const generateImage = async () => {
    if (!postContent.trim()) return;
    setImageLoading(true);
    setImageError(null);
    setImageUrl(null);
    try {
      const res = await fetch('/api/generate-visual-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: postContent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setImageUrl(data.url);
      setImagePrompt(data.prompt || null);
    } catch (e) {
      setImageError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setImageLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'illustration-post-linkedin.png';
    a.target = '_blank';
    a.click();
  };

  const generateInfographic = async () => {
    if (!postContent.trim()) return;
    setInfographicLoading(true);
    setInfographicUrl(null);
    try {
      const res = await fetch('/api/generate-infographic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: postContent }),
      });
      if (!res.ok) throw new Error('Erreur');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setInfographicUrl(url);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'infographie-linkedin.pdf';
      a.click();
    } catch {
      setInfographicUrl(null);
    } finally {
      setInfographicLoading(false);
    }
  };

  const generateCarousel = async (viral = false) => {
    if (!postContent.trim()) return;
    viral ? setCarouselViralLoading(true) : setCarouselLoading(true);
    try {
      const res = await fetch('/api/generate-carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: postContent,
          maxSlides: viral ? 7 : 10,
          viral: viral,
        }),
      });
      if (!res.ok) throw new Error('Erreur');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = viral ? 'carrousel-viral-linkedin.pdf' : 'carrousel-linkedin.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      //
    } finally {
      viral ? setCarouselViralLoading(false) : setCarouselLoading(false);
    }
  };

  const generateAll = async () => {
    if (!postContent.trim()) return;
    setAllLoading(true);
    await Promise.all([
      generateImage().then(() => {}),
      generateInfographic().then(() => {}),
      generateCarousel(false).then(() => {}),
    ]);
    setAllLoading(false);
  };

  return (
    <div className="rounded-2xl border-2 border-[#377CF3]/30 bg-[#377CF3]/5 p-6">
      <h3 className="mb-4 text-lg font-semibold text-[#377CF3]">VISUELS DU POST</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={generateImage}
          disabled={imageLoading || !postContent.trim()}
          className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2d6ad4] disabled:opacity-50"
        >
          {imageLoading ? '…' : '🖼 Générer une image'}
        </button>
        <button
          type="button"
          onClick={generateInfographic}
          disabled={infographicLoading || !postContent.trim()}
          className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2d6ad4] disabled:opacity-50"
        >
          {infographicLoading ? '…' : '📊 Générer une infographie'}
        </button>
        <button
          type="button"
          onClick={() => generateCarousel(false)}
          disabled={carouselLoading || !postContent.trim()}
          className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2d6ad4] disabled:opacity-50"
        >
          {carouselLoading ? '…' : '📑 Générer un carrousel'}
        </button>
        <button
          type="button"
          onClick={() => generateCarousel(true)}
          disabled={carouselViralLoading || !postContent.trim()}
          className="rounded-xl border-2 border-[#377CF3] bg-white px-4 py-2.5 text-sm font-medium text-[#377CF3] hover:bg-[#377CF3]/10 disabled:opacity-50"
        >
          {carouselViralLoading ? '…' : '🔥 Carrousel viral'}
        </button>
        <button
          type="button"
          onClick={generateAll}
          disabled={allLoading || !postContent.trim()}
          className="rounded-xl bg-[#2d6ad4] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2563c4] disabled:opacity-50"
        >
          {allLoading ? '…' : '✨ Générer tous les visuels'}
        </button>
      </div>

      {imageError && (
        <p className="mb-3 text-sm text-red-600">
          {imageError}
          {imageError.includes('REPLICATE') && ' Configure REPLICATE_API_TOKEN dans Railway.'}
        </p>
      )}

      {imageUrl && (
        <div className="mb-4 rounded-xl border border-[#377CF3]/20 bg-white p-4">
          <p className="mb-2 text-sm font-medium text-neutral-600">Image générée</p>
          <img src={imageUrl} alt="Illustration" className="mb-3 max-h-80 rounded-lg object-contain" />
          {imagePrompt && (
            <p className="mb-2 text-xs text-neutral-500">Prompt : {imagePrompt.slice(0, 100)}…</p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={downloadImage}
              className="rounded-lg bg-[#377CF3] px-3 py-2 text-sm text-white"
            >
              Télécharger
            </button>
            <button
              type="button"
              onClick={generateImage}
              disabled={imageLoading}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            >
              Régénérer
            </button>
          </div>
        </div>
      )}

      {infographicUrl && (
        <div className="mb-4 rounded-xl border border-[#377CF3]/20 bg-white p-4">
          <p className="mb-2 text-sm font-medium text-neutral-600">Infographie (PDF téléchargé)</p>
          <iframe src={infographicUrl} className="h-64 w-full rounded-lg border" title="Aperçu infographie" />
          <a
            href={infographicUrl}
            download="infographie-linkedin.pdf"
            className="mt-2 inline-block rounded-lg bg-[#377CF3] px-3 py-2 text-sm text-white"
          >
            Télécharger à nouveau
          </a>
        </div>
      )}
    </div>
  );
}
