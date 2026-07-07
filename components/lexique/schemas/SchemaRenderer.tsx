import type { ComponentType } from 'react';
import type { SchemaId } from '@/data/parcours-btp';
import { SchemaActeursChantier } from './SchemaActeursChantier';
import { SchemaCompositionDce } from './SchemaCompositionDce';
import { SchemaMarchePublic } from './SchemaMarchePublic';
import { SchemaOrdresService } from './SchemaOrdresService';
import { SchemaOrdresServiceGuide } from './SchemaOrdresServiceGuide';
import { SchemaPrixMarche } from './SchemaPrixMarche';
import { SchemaSecuriteChantier } from './SchemaSecuriteChantier';
import { SchemaCouvertureCoupe } from './SchemaCouvertureCoupe';
import { SchemaImplantationChantier } from './SchemaImplantationChantier';

const SCHEMAS: Record<SchemaId, ComponentType> = {
  'marche-public': SchemaMarchePublic,
  'composition-dce': SchemaCompositionDce,
  'acteurs-chantier': SchemaActeursChantier,
  'prix-marche': SchemaPrixMarche,
  'ordres-service': SchemaOrdresService,
  'ordres-service-guide': SchemaOrdresServiceGuide,
  'securite-chantier': SchemaSecuriteChantier,
  'couverture-coupe': SchemaCouvertureCoupe,
  'implantation-chantier': SchemaImplantationChantier,
};

export function SchemaRenderer({ id, titre }: { id: SchemaId; titre?: string }) {
  const Component = SCHEMAS[id];
  const pleinFormat = id === 'ordres-service-guide';
  return (
    <figure
      className={pleinFormat ? '' : 'bework-card overflow-hidden p-4 sm:p-5'}
      aria-label={titre ?? 'Schéma explicatif'}
    >
      <Component />
      {titre && (
        <figcaption className="mt-3 text-center text-xs font-medium text-slate-500">{titre}</figcaption>
      )}
    </figure>
  );
}
