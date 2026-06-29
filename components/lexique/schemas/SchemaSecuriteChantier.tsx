import { Boite, SchemaSvg, S } from './schema-utils';

export function SchemaSecuriteChantier() {
  return (
    <SchemaSvg viewBox="0 0 400 180">
      <Boite x={140} y={8} w={120} h={40} label="PGC" sub="Coordonnateur SPS" fill={S.bleuClair} textFill="#fff" />

      <line x1={200} y1={48} x2={200} y2={68} stroke={S.bleu} strokeWidth={1.5} />
      <line x1={80} y1={68} x2={320} y2={68} stroke={S.bleu} strokeWidth={1.5} />

      <Boite x={30} y={72} w={100} h={44} label="PPSPS" sub="Entreprise A" />
      <Boite x={150} y={72} w={100} h={44} label="PPSPS" sub="Entreprise B" />
      <Boite x={270} y={72} w={100} h={44} label="PPSPS" sub="Entreprise C" />

      <line x1={200} y1={116} x2={200} y2={132} stroke={S.bordure} strokeWidth={1} strokeDasharray="4" />

      <Boite x={100} y={136} w={90} h={36} label="DUERP" sub="Risques" fill={S.grisClair} stroke={S.bordure} />
      <Boite x={210} y={136} w={90} h={36} label="Carte BTP" sub="Ouvriers" fill={S.grisClair} stroke={S.bordure} />
    </SchemaSvg>
  );
}
