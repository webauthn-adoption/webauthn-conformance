import {
  AuthenticatorAttestationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
} from "../deps.ts";
import { generateCredentialID } from "./utils/generateCredentialID.ts";

/**
 * A "software authenticator" capable of generating a basic attestation response, not including
 * an attestationObject.
 */
export function generateBasicAttestationResponse(
  opts: PublicKeyCredentialCreationOptionsJSON,
): AuthenticatorAttestationResponseJSON {
  console.log(opts);

  const credentialID = generateCredentialID();

  return {
    id: credentialID,
    rawId: credentialID,
  };
}
