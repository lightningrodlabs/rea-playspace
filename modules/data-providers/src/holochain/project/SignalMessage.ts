import { EntryHash } from "@holochain/client";
import { assignFields } from "typed-object-tweezers";

export type Op = 'put' | 'delete';

export class SignalMessage<S> {
  op: Op;
  path?: string;
  entryHash: EntryHash;
  data?: S;

  constructor (message: {}) {
    assignFields<{}, SignalMessage<S>>(message, this);
  }
}