import { encode, decode } from '@msgpack/msgpack'
import blobToBuffer from 'blob-to-buffer'
import {
  ZOME_CALL_INVOCATION_ENUM_TAG,
  WIRE_MESSAGE_REQUEST_ENUM_TAG,
  RequestWireMessage,
  ResponseWireMessage,
  ZomeCallInvocationResponse,
  APP_INFO_ENUM_TAG,
  AppInfoResponse,
  WireMessage,
} from './holochainTypes'
import { APP_PORT, MAIN_APP_ID, ZOME_A_NAME } from './holochainConfig'

export class SimpleZomeClient {
  appId: string
  zomeName: string
  agentPubKey: Uint8Array
  dnaHash: Uint8Array
  ws: WebSocket

  constructor(wsUrl: string, appId: string, zomeName: string) {
    this.ws = new WebSocket(wsUrl)
    this.appId = appId
    this.zomeName = zomeName
  }

  async callZome<Input, Output>(zomeFn: string, input: Input): Promise<Output> {
    await this.awaitReadiness()

    // encode step 1: the payload
    const payload = encode(input)
    // encode step 2: the zome call
    const zomeCall = encode({
      type: ZOME_CALL_INVOCATION_ENUM_TAG,
      data: {
        cap: null,
        cell_id: [this.dnaHash, this.agentPubKey],
        zome_name: this.zomeName,
        fn_name: zomeFn,
        payload,
        provenance: this.agentPubKey,
      },
    })
    // id must be an int
    const requestId = Math.floor(Math.random() * 100000)
    // encode step 3: the conductor api protocol
    const encodedMsg = encode({
      id: requestId,
      type: WIRE_MESSAGE_REQUEST_ENUM_TAG,
      data: zomeCall,
    } as RequestWireMessage)

    // setup the response handling
    let resolve: (
        value: ResponseWireMessage | PromiseLike<ResponseWireMessage>
      ) => void,
      reject: (reason?: any) => void
    let wireMessagePromise = new Promise<ResponseWireMessage>(
      (_resolve, _reject) => {
        resolve = _resolve
        reject = _reject
      }
    )
    const listener = this.genResponseListener(requestId, resolve, reject)
    this.ws.addEventListener('message', listener)

    // send the request
    this.ws.send(encodedMsg)

    // wait for the response and do the relevant decoding

    // does the first decode, to get the conductor layer response
    const conductorResponse = await wireMessagePromise

    // do the second decode, to get the zome call layer response
    const zomeCallResponse = decode(
      conductorResponse.data
    ) as ZomeCallInvocationResponse

    // catch an error and throw
    if (zomeCallResponse.type === 'error') {
      throw new Error(JSON.stringify(zomeCallResponse.data))
    }
    // console.log(zomeCallResponse)
    // debugger

    // do the third decode, to get the application layer response
    return decode(zomeCallResponse.data) as Output
  }

  async awaitReadiness() {
    if (this.ws.readyState !== this.ws.OPEN) {
      await new Promise<void>((resolve, reject) => {
        this.ws.onopen = () => resolve()
        this.ws.onerror = (e) => reject(e)
      })
    }
    if (this.agentPubKey && this.dnaHash) {
      // this means it is already ready
      return
    }
    const appInfoCall = encode({
      type: APP_INFO_ENUM_TAG,
      data: {
        installed_app_id: this.appId,
      },
    })
    // id must be an int
    const requestId = this.generateId()
    // encode step 3: the conductor api protocol
    const encodedMsg = encode({
      id: requestId,
      type: WIRE_MESSAGE_REQUEST_ENUM_TAG,
      data: appInfoCall,
    } as RequestWireMessage)

    // set up for the response handling
    let resolve: (
        value: ResponseWireMessage | PromiseLike<ResponseWireMessage>
      ) => void,
      reject: (reason?: any) => void
    let wireMessagePromise = new Promise<ResponseWireMessage>(
      (_resolve, _reject) => {
        resolve = _resolve
        reject = _reject
      }
    )
    const listener = this.genResponseListener(requestId, resolve, reject)
    this.ws.addEventListener('message', listener)

    // send the request
    this.ws.send(encodedMsg)

    // await the response and then do the relevant decoding
    const wireMessageResponse = await wireMessagePromise
    const appInfoResponse = decode(wireMessageResponse.data) as AppInfoResponse
    const appInfo = appInfoResponse.data
    const firstCell = appInfo.cell_data[0]
    this.dnaHash = firstCell.cell_id[0]
    this.agentPubKey = firstCell.cell_id[1]
  }

  generateId() {
    return Math.floor(Math.random() * 100000)
  }

  // TODO: add timeout -> reject
  genResponseListener(
    requestId: number,
    resolve: (
      value: ResponseWireMessage | PromiseLike<ResponseWireMessage>
    ) => void,
    _reject: (reason?: any) => void
  ) {
    const listener = async (message: MessageEvent) => {
      let messageData = await ensureBuffer(message.data)
      const wireMessage: WireMessage = decode(messageData) as WireMessage
      if (wireMessage.type === 'Response' && wireMessage.id === requestId) {
        resolve(wireMessage)
        this.ws.removeEventListener('message', listener)
      }
    }
    return listener
  }
}

async function ensureBuffer(data: Buffer | Blob): Promise<Buffer> {
  if (!Buffer.isBuffer(data)) {
    data = await new Promise<Buffer>((resolve, reject) => {
      blobToBuffer(data, function (err: Error, buffer: Buffer) {
        if (err) reject(err)
        resolve(buffer)
      })
    })
  }
  return data
}




const setupSimpleZomeClient = async () => {
  const simpleZomeClient = new SimpleZomeClient(
    `ws://localhost:${APP_PORT}`,
    MAIN_APP_ID,
    ZOME_A_NAME
  )
  try {
    await simpleZomeClient.awaitReadiness()
  } catch (e) {
    console.error(e)
    throw e
  }
  return simpleZomeClient
}

export {
  setupSimpleZomeClient,
}
