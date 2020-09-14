import { v4 as uuidv4 } from 'uuid';
import base64url from 'base64url';

export default function generateCredentialID(): string {
  return base64url.encode(uuidv4());
}
