import * as path from 'path'
import { app } from 'electron'
import { HolochainRunnerOptions, StateSignal, PathOptions } from 'electron-holochain'

const MAIN_APP_ID = 'main-app'
const COMMUNITY_PROXY_URL =
  'kitsune-proxy://SYVd4CF3BdJ4DS7KwLLgeU3_DbHoZ34Y-qroZ79DOs8/kitsune-quic/h/165.22.32.11/p/5779/--'
// increment this version when an update to the application
// requires to have a new DHT/DNA
const DATABASES_VERSION_ID = '0-0-1'
// increment this version when you want the application
// to use a new keystore
const KEYSTORE_VERSION_ID = '0-0-1'

// these messages get seen on the splash page
export enum StateSignalText {
  IsFirstRun = 'Welcome to ElectronHolochainTemplate...',
  IsNotFirstRun = 'Loading...',
  CreatingKeys = 'Creating cryptographic keys...',
  RegisteringDna = 'Registering DNA to Holochain...',
  InstallingApp = 'Installing DNA bundle to Holochain...',
  EnablingApp = 'Enabling DNA...',
  AddingAppInterface = 'Attaching API network port...',
}

export function stateSignalToText(state: StateSignal): StateSignalText {
  switch (state) {
    case StateSignal.IsFirstRun:
      return StateSignalText.IsFirstRun
    case StateSignal.IsNotFirstRun:
      return StateSignalText.IsNotFirstRun
    case StateSignal.CreatingKeys:
      return StateSignalText.CreatingKeys
    case StateSignal.RegisteringDna:
      return StateSignalText.RegisteringDna
    case StateSignal.InstallingApp:
      return StateSignalText.InstallingApp
    case StateSignal.EnablingApp:
      return StateSignalText.EnablingApp
    case StateSignal.AddingAppInterface:
      return StateSignalText.AddingAppInterface
  }
}

const applicationDnaPath = app.isPackaged
  ? path.join(app.getAppPath(), '../app.asar.unpacked/binaries/application.dna')
  : path.join(app.getAppPath(), '../dna/workdir/application.dna')

// in production
// must point to unpacked versions, not in an asar archive
// in development
// fall back on defaults in the electron-holochain package
const BINARY_PATHS: PathOptions | undefined = app.isPackaged
  ? {
      holochainRunnerBinaryPath: path.join(
        __dirname,
        `../../app.asar.unpacked/binaries/holochain-runner${process.platform === 'win32' ? '.exe' : ''}`
      ),
      lairKeystoreBinaryPath: path.join(
        __dirname,
        `../../app.asar.unpacked/binaries/lair-keystore${process.platform === 'win32' ? '.exe' : ''}`,
      ),
    }
  : undefined

// These options are in use when the application is under development
const devOptions: HolochainRunnerOptions = {
  dnaPath: applicationDnaPath, // preload
  datastorePath: process.env.EH_TEST_USER_2
    ? '../user2-data/databases'
    : path.join(__dirname, '../../user-data/databases'),
  appId: MAIN_APP_ID,
  appWsPort: process.env.EH_TEST_USER_2 ? 8899 : 8888,
  adminWsPort: process.env.EH_TEST_USER_2 ? 1236 : 1234,
  keystorePath: process.env.EH_TEST_USER_2
    ? '../user2-data/keystore'
    : path.join(__dirname, '../../user-data/keystore'),
  proxyUrl: COMMUNITY_PROXY_URL,
}

// These options are in use when the application is packaged
// for shipping
const prodOptions: HolochainRunnerOptions = {
  dnaPath: applicationDnaPath, // preload
  datastorePath: path.join(app.getPath('userData'), `databases-${DATABASES_VERSION_ID}`),
  appId: MAIN_APP_ID,
  appWsPort: 8889,
  adminWsPort: 1235,
  keystorePath: path.join(app.getPath('userData'), `keystore-${KEYSTORE_VERSION_ID}`),
  proxyUrl: COMMUNITY_PROXY_URL,
}

export { applicationDnaPath, BINARY_PATHS, devOptions, prodOptions }
