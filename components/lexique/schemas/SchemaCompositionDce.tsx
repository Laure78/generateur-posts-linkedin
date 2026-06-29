import { Boite, SchemaSvg, S } from './schema-utils';

export function SchemaCompositionDce() {
  return (
    <SchemaSvg viewBox="0 0 400 220">
      <Boite x={140} y={8} w={120} h={40} label="DCE" sub="Dossier complet" fill={S.bleuClair} textFill="#fff" stroke={S.bleu} />

      <line x1={200} y1={48} x2={200} y2={68} stroke={S.bleu} strokeWidth={1.5} />
      <line x1={70} y1={68} x2={330} y2={68} stroke={S.bleu} strokeWidth={1.5} />

      <Boite x={10} y={72} w={72} h={40} label="RC" sub="Comment répondre" />
      <Boite x={92} y={72} w={72} h={40} label="CCAP" sub="Règles admin." />
      <Boite x={174} y={72} w={72} h={40} label="CCTP" sub="Travaux" />
      <Boite x={256} y={72} w={72} h={40} label="DPGF" sub="Prix" />
      <Boite x={338} y={72} w={52} h={40} label="Plans" />

      <line x1={46} y1={112} x2={46} y2={128} stroke={S.bordure} strokeWidth={1} strokeDasharray="4" />
      <line x1={128} y1={112} x2={128} y2={128} stroke={S.bordure} strokeWidth={1} strokeDasharray="4" />
      <line x1={210} y1={112} x2={210} y2={128} stroke={S.bordure} strokeWidth={1} strokeDasharray="4" />

      <Boite x={10} y={132} w={72} h={36} label="AE" sub="Engagement" fill={S.grisClair} stroke={S.bordure} />
      <Boite x={92} y={132} w={72} h={36} label="PGC" sub="Sécurité" fill={S.grisClair} stroke={S.bordure} />
      <Boite x={174} y={132} w={72} h={36} label="RICT" sub="Contrôle" fill={S.grisClair} stroke={S.bordure} />

      <text x={200} y={195} textAnchor="middle" fill={S.gris} fontSize={10} fontFamily="system-ui">
        Chaque pièce a un rôle — ne pas les confondre
      </text>
    </SchemaSvg>
  );
}
