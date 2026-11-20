import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.56.1:2',
  releaseNotes: {
    en_US:
      'Packaging update: the go-quai source is checked against the exact release before it is built. Nothing changes in how the node runs.',
    es_ES:
      'Actualización del empaquetado: el código fuente de go-quai se verifica contra la versión exacta antes de compilarse. No cambia nada en el funcionamiento del nodo.',
    de_DE:
      'Paketierungs-Update: Der go-quai-Quellcode wird vor dem Bauen gegen die exakte Version geprüft. An der Funktionsweise des Knotens ändert sich nichts.',
    pl_PL:
      'Aktualizacja pakietu: kod źródłowy go-quai jest sprawdzany względem dokładnego wydania przed kompilacją. Działanie węzła się nie zmienia.',
    fr_FR:
      "Mise à jour de l'empaquetage : le code source de go-quai est vérifié par rapport à la version exacte avant d'être compilé. Rien ne change dans le fonctionnement du nœud.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
