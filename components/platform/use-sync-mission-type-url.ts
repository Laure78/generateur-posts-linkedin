'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { isValidMissionTypeId, missionTypeFromSearchParam } from '@/lib/bework/mission-type-url';

/** Synchronise type + étape du formulaire « nouvelle demande » avec ?type= dans l’URL (menu latéral). */
export function useSyncMissionTypeFromUrl(
  setType: (type: string) => void,
  setStep: (step: 1 | 2) => void
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hadTypeInUrlRef = useRef(false);

  useEffect(() => {
    if (!pathname.startsWith('/plateforme/demandes/nouvelle')) return;

    const typeParam = searchParams.get('type');
    if (isValidMissionTypeId(typeParam)) {
      setType(typeParam);
      setStep(2);
      hadTypeInUrlRef.current = true;
      return;
    }

    if (hadTypeInUrlRef.current) {
      setType(missionTypeFromSearchParam(null));
      setStep(1);
      hadTypeInUrlRef.current = false;
    }
  }, [pathname, searchParams, setType, setStep]);
}
