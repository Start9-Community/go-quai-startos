import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.56.1:0',
  releaseNotes: {
    en_US:
      '- Updated go-quai to v0.56.1.\n- Stops trusting certificates from a compromised certificate authority (eMudhra).',
    es_ES:
      '- go-quai actualizado a v0.56.1.\n- Deja de confiar en los certificados de una autoridad de certificación comprometida (eMudhra).',
    de_DE:
      '- go-quai auf v0.56.1 aktualisiert.\n- Vertraut Zertifikaten einer kompromittierten Zertifizierungsstelle (eMudhra) nicht mehr.',
    pl_PL:
      '- Zaktualizowano go-quai do v0.56.1.\n- Przestaje ufać certyfikatom przejętego urzędu certyfikacji (eMudhra).',
    fr_FR: `- go-quai mis à jour vers v0.56.1.\n- Ne fait plus confiance aux certificats d'une autorité de certification compromise (eMudhra).`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
