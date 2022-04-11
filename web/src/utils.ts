export const sleep100 = async () => {
  return new Promise((resolve) => setTimeout(resolve, 100))
}

export function HashToString(buff: Uint8Array): string {
  return buff.reduce((prev: string, curr: number) => {
    return prev + curr.toString(16).padStart(2, '0');
  }, '');
}

export function StringToHash(s: string): Uint8Array {
  const b = new Uint8Array(Math.ceil(s.length/2));
  for (let i = 0; i < b.byteLength; i++) {
    b[i] = parseInt(s.slice(i*2,(i*2)+2),16);
  }
  return b;
}