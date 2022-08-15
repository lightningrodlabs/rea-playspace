import { EntryHash } from "@holochain/client";
import { assignFields } from "../../utils";
import { PathedData } from "../PathedData";

type Op = 'put' | 'delete';

export class SignalMessage {
  op: Op;
  path?: string;
  entryHash: EntryHash;
  data?: PathedData;

  constructor (message: {}) {
    assignFields<{}, SignalMessage>(message, this);
  }
}