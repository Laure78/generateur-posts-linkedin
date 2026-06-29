import { Boite, SchemaSvg, S } from './schema-utils';

export function SchemaActeursChantier() {
  return (
    <SchemaSvg viewBox="0 0 400 200">
      <Boite x={155} y={8} w={90} h={44} label="MOA" sub="Client / commanditaire" fill={S.bleuClair} textFill="#fff" />

      <line x1={200} y1={52} x2={200} y2={72} stroke={S.bleu} strokeWidth={1.5} />
      <Boite x={155} y={72} w={90} h={44} label="MOE" sub="Architecte / BET" />

      <line x1={200} y1={116} x2={200} y2={136} stroke={S.bleu} strokeWidth={1.5} />
      <line x1={100} y1={136} x2={300} y2={136} stroke={S.bleu} strokeWidth={1.5} />

      <Boite x={20} y={140} w={100} h={44} label="Entreprise" sub="Vous — travaux" fill="#dcfce7" stroke={S.vert} />
      <Boite x={150} y={140} w={100} h={44} label="Bureau contrôle" sub="Vérif. technique" />
      <Boite x={280} y={140} w={100} h={44} label="CSPS" sub="Sécurité chantier" />
    </SchemaSvg>
  );
}
