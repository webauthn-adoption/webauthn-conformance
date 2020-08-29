import { uuidv4, base64URLEncode } from "../../deps.ts";

export function generateCredentialID(): string {
  return base64URLEncode(uuidv4.generate());
}
