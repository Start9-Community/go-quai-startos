import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.56.0:12',
  releaseNotes: {
    en_US:
      '- The Log Level setting describes each level.\n- The Sync Method choice describes each option.',
    es_ES:
      '- El ajuste Nivel de registro describe cada nivel.\n- La elección de Método de sincronización describe cada opción.',
    de_DE:
      '- Die Einstellung Protokollstufe beschreibt jede Stufe.\n- Die Auswahl der Synchronisierungsmethode beschreibt jede Option.',
    pl_PL:
      '- Ustawienie Poziom logowania opisuje każdy poziom.\n- Wybór metody synchronizacji opisuje każdą opcję.',
    fr_FR:
      '- Le réglage Niveau de journalisation décrit chaque niveau.\n- Le choix de la méthode de synchronisation décrit chaque option.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
