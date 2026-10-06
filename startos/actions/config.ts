import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  varDiff: Value.toggle({
    name: i18n('Variable Difficulty'),
    description: i18n(
      'Automatically tune each worker to about one share every 30 seconds. A miner can still force a fixed difficulty by putting d= followed by the value in its password field.',
    ),
    default: true,
  }),
  shareRpc: Value.toggle({
    name: i18n('Share node RPC with other packages'),
    description: i18n(
      'Needed by the Quai Mining Dashboard package to show reward estimates and network difficulty. go-quai has no RPC authentication, so leave this off unless a package on this server needs it.',
    ),
    default: false,
  }),
  logLevel: Value.select({
    name: i18n('Log Level'),
    description: i18n(
      '- error: Only errors.\n- warn: Errors and warnings. Keep this day to day.\n- info: Also every block while syncing, which runs to gigabytes, and each miner connecting to stratum. Use it while troubleshooting.\n- debug: More detail still. Turn it on only while chasing a specific problem, then switch back.',
    ),
    default: 'warn',
    values: {
      error: 'error',
      warn: 'warn',
      info: 'info',
      debug: 'debug',
    },
  }),
})

export const config = sdk.Action.withInput(
  'config',

  async ({ effects }) => ({
    name: i18n('Settings'),
    description: i18n('Variable difficulty, RPC sharing, and log level'),
    warning: i18n('Saving restarts the node if it is running.'),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => {
    const s = await storeJson.read().once()
    return {
      varDiff: s?.varDiff ?? true,
      logLevel: s?.logLevel ?? 'warn',
      shareRpc: s?.shareRpc ?? false,
    }
  },

  async ({ effects, input }) => {
    await storeJson.merge(effects, {
      varDiff: input.varDiff,
      logLevel: input.logLevel,
      shareRpc: input.shareRpc,
    })
  },
)
