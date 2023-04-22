
import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const reaPlayspaceDnaPath = path.join(__dirname, "../../happ/workdir/playspace.dna");

export const sleep = (ms: number) => new Promise(resolve => setTimeout(() => resolve(null), ms));

