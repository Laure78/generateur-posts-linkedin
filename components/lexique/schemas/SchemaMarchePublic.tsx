import { Boite, Fleche, SchemaSvg } from './schema-utils';

export function SchemaMarchePublic() {
  return (
    <SchemaSvg viewBox="0 0 400 100">
      <Boite x={4} y={28} w={68} h={44} label="AAPC" sub="Annonce" />
      <Fleche x1={72} y1={50} x2={88} y2={50} />
      <Boite x={88} y={28} w={68} h={44} label="DCE" sub="Dossier" />
      <Fleche x1={156} y1={50} x2={172} y2={50} />
      <Boite x={172} y={28} w={68} h={44} label="Offre" sub="Prix + mémoire" />
      <Fleche x1={240} y1={50} x2={256} y2={50} />
      <Boite x={256} y={28} w={68} h={44} label="Notation" sub="Comparaison" />
      <Fleche x1={324} y1={50} x2={340} y2={50} />
      <Boite x={328} y={28} w={68} h={44} label="Marché" sub="Signé" fill="#dcfce7" stroke="#059669" />
    </SchemaSvg>
  );
}
