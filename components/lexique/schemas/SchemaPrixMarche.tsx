import { Boite, SchemaSvg, S } from './schema-utils';

export function SchemaPrixMarche() {
  return (
    <SchemaSvg viewBox="0 0 400 160">
      <text x={100} y={20} textAnchor="middle" fill={S.navy} fontSize={11} fontWeight={600} fontFamily="system-ui">
        Forfait (DPGF)
      </text>
      <Boite x={20} y={28} w={160} h={50} label="Prix global fixe" sub="Tous les postes listés" />
      <text x={100} y={95} textAnchor="middle" fill={S.gris} fontSize={9} fontFamily="system-ui">
        Oubli = à votre charge
      </text>

      <line x1={200} y1={10} x2={200} y2={150} stroke={S.bordure} strokeWidth={2} />

      <text x={300} y={20} textAnchor="middle" fill={S.navy} fontSize={11} fontWeight={600} fontFamily="system-ui">
        Unitaire (BPU + DQE)
      </text>
      <Boite x={220} y={28} w={160} h={50} label="Prix × quantités" sub="DQE = estimation" />
      <text x={300} y={95} textAnchor="middle" fill={S.gris} fontSize={9} fontFamily="system-ui">
        Payé sur quantités réelles
      </text>

      <Boite x={120} y={115} w={160} h={36} label="Situation mensuelle" sub="% avancement validé" fill={S.bleuSoft} />
    </SchemaSvg>
  );
}
