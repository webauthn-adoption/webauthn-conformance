import httpClient from "../../helpers/HTTPClient.ts";
import { TestIdentifer } from "../../helpers/types.ts";
import { asserts } from "../../deps.ts";

const { assertStrictEquals } = asserts;

const attestationOptionsP2ID: TestIdentifer = {
  suite: "attestation",
  mode: "options",
  id: "AttestationOptionsP2",
};

/**
 * P-2
 * Request from server ServerPublicKeyCredentialCreationOptionsResponse with "none" attestation,
 * and check that server, and check that
 * ServerPublicKeyCredentialCreationOptionsResponse.attestation is set to "none"
 */
async function attestationOptionsP2Test(): Promise<void> {
  const opts = {
    username: "qjse5WykdS15QAWGXdaP",
    displayName: "Bilbo Baggins",
    authenticatorSelection: {
      requireResidentKey: false,
      userVerification: "preferred",
    },
    attestation: "none",
  };

  const resp = await httpClient.postAttestationOptions(opts).then((resp) =>
    resp.json()
  );

  assertStrictEquals(
    resp.attestation,
    opts.attestation,
    `Client requested "none" attestation, but RP returned "${resp.attestation}" attestation`,
  );
}

export default {
  id: attestationOptionsP2ID,
  test: attestationOptionsP2Test,
};
