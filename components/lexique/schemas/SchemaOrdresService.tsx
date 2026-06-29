import { Boite, Fleche, SchemaSvg, S } from './schema-utils';

export function SchemaOrdresService() {
  return (
    <SchemaSvg viewBox="0 0 400 100">
      <Boite x={4} y={28} w={80} h={44} label="OS n°1" sub="Démarrage" fill="#dcfce7" stroke={S.vert} />
      <Fleche x1={84} y1={50} x2={100} y2={50} />
      <Boite x={100} y={28} w={80} h={44} label="Travaux" sub="Exécution" />
      <Fleche x1={180} y1={50} x2={196} y2={50} />
      <Boite x={196} y={28} w={80} h={44} label="OS modif." sub={'Travaux +'} fill="#fef3c7" stroke={S.ambre} />
      <Fleche x1={276} y1={50} x2={292} y2={50} />
      <Boite x={292} y={28} w={100} h={44} label="Réception" sub="Fin officielle" />
    </SchemaSvg>
  );
}
