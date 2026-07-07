import { Boite, SchemaSvg, S } from './schema-utils';

/** Vue en plan — chaises d'implantation, cordeaux et emprise du bâtiment. */
export function SchemaImplantationChantier() {
  const bx = 130;
  const by = 70;
  const bw = 160;
  const bh = 100;

  const chaises = [
    { x: bx - 55, y: by - 35, label: 'Chaise N' },
    { x: bx + bw + 25, y: by - 35, label: 'Chaise E' },
    { x: bx - 55, y: by + bh + 15, label: 'Chaise O' },
    { x: bx + bw + 25, y: by + bh + 15, label: 'Chaise S' },
  ];

  return (
    <SchemaSvg viewBox="0 0 420 220">
      {/* Emprise fouilles (pointillés) */}
      <rect
        x={bx - 20}
        y={by - 20}
        width={bw + 40}
        height={bh + 40}
        fill="none"
        stroke={S.gris}
        strokeWidth={1}
        strokeDasharray="6 4"
        rx={4}
      />
      <text x={bx + bw / 2} y={by - 24} textAnchor="middle" fill={S.gris} fontSize={8} fontFamily="system-ui, sans-serif">
        Emprise fouilles (peinture)
      </text>

      {/* Bâtiment */}
      <rect x={bx} y={by} width={bw} height={bh} fill={S.bleuSoft} stroke={S.bleu} strokeWidth={2} rx={4} />
      <text x={bx + bw / 2} y={by + bh / 2 + 4} textAnchor="middle" fill={S.navy} fontSize={11} fontWeight="600" fontFamily="system-ui, sans-serif">
        Emprise bâtiment
      </text>

      {/* Cordeaux */}
      <line x1={chaises[0].x + 20} y1={chaises[0].y + 8} x2={chaises[3].x + 20} y2={chaises[3].y + 8} stroke={S.ambre} strokeWidth={1.5} />
      <line x1={chaises[1].x} y1={chaises[1].y + 8} x2={chaises[2].x} y2={chaises[2].y + 8} stroke={S.ambre} strokeWidth={1.5} />

      {/* Croisement cordeaux */}
      <circle cx={bx + bw / 2} cy={by + bh / 2} r={5} fill={S.ambre} />
      <text x={bx + bw / 2 + 12} y={by + bh / 2 + 4} fill={S.ambre} fontSize={8} fontFamily="system-ui, sans-serif">
        croisement
      </text>

      {/* Chaises */}
      {chaises.map((c) => (
        <g key={c.label}>
          <line x1={c.x} y1={c.y + 16} x2={c.x + 4} y2={c.y} stroke="#92400e" strokeWidth={2} />
          <line x1={c.x + 36} y1={c.y + 16} x2={c.x + 40} y2={c.y} stroke="#92400e" strokeWidth={2} />
          <rect x={c.x} y={c.y + 14} width={40} height={6} fill="#fef3c7" stroke="#92400e" strokeWidth={1} />
          <circle cx={c.x + 20} cy={c.y + 17} r={2} fill={S.navy} />
        </g>
      ))}

      <Boite x={8} y={8} w={108} h={40} label="Chaises" sub="retrait 1,5–2 m" fill="#fef3c7" stroke="#92400e" />
      <Boite x={300} y={8} w={108} h={40} label="Cordeaux" sub="axes conservés" fill="#fff7ed" stroke={S.ambre} />
      <Boite x={154} y={178} w={112} h={36} label="3-4-5 + diagonales" sub="± 1 à 2 cm" fill={S.bleuSoft} />

      <text x={210} y={212} textAnchor="middle" fill={S.gris} fontSize={9} fontFamily="system-ui, sans-serif">
        Bornes géomètre → piquets angles → chaises en retrait → cordeaux → contrôle avant béton
      </text>
    </SchemaSvg>
  );
}
