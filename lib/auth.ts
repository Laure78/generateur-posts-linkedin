import { createHash } from 'crypto'

export function hashSecret(secret: string) {
  return createHash('sha256').update(secret).digest('hex')
}
