import type {
  AttestationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
} from '@simplewebauthn/typescript-types';

import generateCredentialID from './utils/generateCredentialID';

/**
 * A "software authenticator" capable of generating a basic attestation response, not including
 * an attestationObject.
 */
export default function generateBasicAttestationResponse(
  opts: PublicKeyCredentialCreationOptionsJSON,
): BasicAttestationCredentialJSON {
  console.log(opts);

  const credentialID = generateCredentialID();

  return {
    id: credentialID,
    rawId: credentialID,
    response: {
      clientDataJSON: '',
    },
    type: 'public-key',
  };
}

/**
 * Temporary for now, this should eventually be replaced directly with `AttestationCredentialJSON`
 */
interface BasicAttestationCredentialJSON extends Omit<AttestationCredentialJSON, 'response'> {
  response: {
    clientDataJSON: string;
  };
}
