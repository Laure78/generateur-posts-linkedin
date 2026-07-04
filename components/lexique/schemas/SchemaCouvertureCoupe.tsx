import { Boite, SchemaSvg, S } from './schema-utils';

/** Coupe simplifiée d'une toiture tuile — du faîtage à la gouttière. */
export function SchemaCouvertureCoupe() {
  return (
    <SchemaSvg viewBox="0 0 420 200">
      {/* Pente toiture */}
      <polygon
        points="60,150 210,40 360,150"
        fill={S.grisClair}
        stroke={S.bordure}
        strokeWidth={1.5}
      />
      {/* Charpente */}
      <line x1={90} y1={130} x2={210} y2={55} stroke="#92400e" strokeWidth={3} />
      <line x1={210} y1={55} x2={330} y2={130} stroke="#92400e" strokeWidth={3} />
      <line x1={90} y1={130} x2={330} y2={130} stroke="#92400e" strokeWidth={2} />

      <Boite x={8} y={8} w={88} h={36} label="Charpente" sub="fermettes / chevrons" fill="#fef3c7" stroke="#92400e" />
      <Boite x={108} y={8} w={88} h={36} label="Pare-pluie" sub="membrane" fill={S.bleuSoft} />
      <Boite x={208} y={8} w={88} h={36} label="Liteaux" sub="27 × 32 mm" fill="#fef3c7" stroke="#92400e" />
      <Boite x={308} y={8} w={88} h={36} label="Tuiles" sub="Canal S" fill={S.grisClair} stroke={S.gris} />

      {/* Tuiles stylisées sur le pan */}
      {[120, 160, 200, 240, 280].map((x, i) => (
        <rect
          key={x}
          x={x}
          y={95 + i * 8}
          width={36}
          height={14}
          rx={2}
          fill="#94a3b8"
          stroke={S.gris}
          strokeWidth={0.8}
        />
      ))}

      {/* Gouttière */}
      <rect x={50} y={148} width={320} height={10} rx={5} fill={S.bleuClair} opacity={0.5} />
      <Boite x={160} y={162} w={100} h={32} label="Gouttière" sub="EP alu" fill={S.bleuSoft} />

      <text x={210} y={192} textAnchor="middle" fill={S.gris} fontSize={9} fontFamily="system-ui, sans-serif">
        Chatières = ventilation combles · Solin = rive contre mur
      </text>
    </SchemaSvg>
  );
}
