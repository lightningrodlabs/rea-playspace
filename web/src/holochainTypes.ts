export const ZOME_CALL_INVOCATION_ENUM_TAG = 'zome_call_invocation'
export const ERROR_TAG = 'error'
export const APP_INFO_ENUM_TAG = 'app_info'
export const WIRE_MESSAGE_SIGNAL_ENUM_TAG = 'Signal'
export const WIRE_MESSAGE_RESPONSE_ENUM_TAG = 'Response'
export const WIRE_MESSAGE_REQUEST_ENUM_TAG = 'Request'

export interface SignalWireMessage {
  type: typeof WIRE_MESSAGE_SIGNAL_ENUM_TAG
  data: Uint8Array
}
export interface RequestWireMessage {
  type: typeof WIRE_MESSAGE_REQUEST_ENUM_TAG
  id: number
  data: Uint8Array
}
export interface ResponseWireMessage {
  type: typeof WIRE_MESSAGE_RESPONSE_ENUM_TAG
  id: number
  data: Uint8Array
}
export type WireMessage =
  | SignalWireMessage
  | RequestWireMessage
  | ResponseWireMessage

export type HoloHash = Buffer // length 39
export type AgentPubKey = HoloHash
export type CellId = [HoloHash, AgentPubKey]
export type CellNick = string
export type InstalledAppId = string
export type InstalledCell = {
  cell_id: CellId
  cell_nick: CellNick
}
export type PausedAppReason = {
  error: string
}
export type DisabledAppReason =
  | {
      never_started: null
    }
  | { user: null }
  | { error: string }
export type InstalledAppInfoStatus =
  | {
      paused: { reason: PausedAppReason }
    }
  | {
      disabled: {
        reason: DisabledAppReason
      }
    }
  | {
      running: null
    }
export type InstalledAppInfo = {
  installed_app_id: InstalledAppId
  cell_data: Array<InstalledCell>
  status: InstalledAppInfoStatus
}

export type AppInfoResponse = {
  type: typeof APP_INFO_ENUM_TAG
  data: InstalledAppInfo
}

export type ZomeCallInvocationSuccess = {
  type: typeof ZOME_CALL_INVOCATION_ENUM_TAG
  data: Uint8Array // in case of success, data is encoded
}

export type ZomeCallInvocationError = {
  type: typeof ERROR_TAG
  data: {
    type: 'ribosome_error'
    data: string
  }
}

export type ZomeCallInvocationResponse =
  | ZomeCallInvocationError
  | ZomeCallInvocationSuccess
