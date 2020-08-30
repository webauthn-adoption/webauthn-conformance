// // import assert from 'assert';
// import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/typescript-types';

// import httpClient, { AttestationOptionsRequestOpts } from '../../../../helpers/HTTPClient';
import { TestIdentifer } from '../../../../helpers/types';
// import generateBasicAttestationResponse
//   from '../../../../authenticators/generateBasicAttestationResponse';

const attestationResponseResp1P1ID: TestIdentifer = {
  suite: 'attestation',
  mode: 'options',
  id: 'AttestationResponseResp1P1',
};

/**
 * P-1
 * Get PublicKeyCredentialCreationOptions, generate a valid response(with for example packed
 * attestation). Get another one of PublicKeyCredentialCreationOptions for the same username as in
 * previous request, and check that it's have "excludeCredentials" field and:
 *         (a) it's of type Array
 *         (b) it's not empty
 *         (c) each member is of type PublicKeyCredentialDescriptor
 *         (d) it contains PublicKeyCredentialDescriptor, with "type" set to "public-key", and "id"
 *             set to base64url encoded credId from the previous registration
 */
async function attestationResponseResp1P1Test(): Promise<void> {
  // const opts: AttestationOptionsRequestOpts = {
  //   displayName: 'Marcelle Ritchie',
  //   username: 'GU7iv9rnWGMrvEpGqqEP',
  //   attestation: 'direct',
  // };
  // const opts1: PublicKeyCredentialCreationOptionsJSON = await httpClient
  //   .postAttestationOptions(opts)
  //   .then((resp) => resp.json());
  // TODO: This would probably need to be generated by a software authenticator, and use
  // opts1.challenge
  // const attestationResponse = generateBasicAttestationResponse(opts1);
  // const resp1 = await httpClient
  //   .postAttestationResponse(attestationResponse)
  //   .then((resp) => resp.json());
  // const credId = attestationResponse.id;
  // const opts2: PublicKeyCredentialCreationOptionsJSON = await httpClient
  //   .postAttestationOptions(opts)
  //   .then((resp) => resp.json());
  // assert.notEqual(
  //   typeof opts2.excludeCredentials,
  //   undefined,
  //   'Response is missing "excludeCredentials" field!',
  // );
  // assert(
  //   Array.isArray(opts2.excludeCredentials),
  //   'Response.excludeCredentials is not of type Sequence',
  // );
  // assert(opts2.excludeCredentials.length > 0, 'Response.excludeCredentials is empty');
  // opts2.excludeCredentials.forEach((cred) => {
  //   if (cred.id === credId) {
  //     return;
  //   }
  //   throw new Error(
  //     `ExcludeCredentials do not contain expected credential! Expected "${JSON.stringify(
  //       opts2.excludeCredentials,
  //     )}" to include "${JSON.stringify({ type: 'public-key', id: credId })}"`,
  //   );
  // });
}

export default {
  id: attestationResponseResp1P1ID,
  test: attestationResponseResp1P1Test,
};
