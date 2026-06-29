type Props = {
  id: string;
  schema: Record<string, unknown>;
};

/** JSON-LD SSR — `<script type="application/ld+json">`. */
export function JsonLd({ id, schema }: Props) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
