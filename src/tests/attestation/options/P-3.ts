import httpClient from "../../../helpers/HTTPClient.ts";
import { TestIdentifer } from "../../../helpers/types.ts";
import { assertNotEquals } from "../../../deps.ts";

const attestationOptionsP3ID: TestIdentifer = {
  suite: "attestation",
  mode: "options",
  id: "AttestationOptionsP3",
};

/**
 * P-3
 * Get two ServerPublicKeyCredentialCreationOptionsResponses, and check that challenge in Request1
 * is different to challenge in Request2
 */
async function attestationOptionsP3Test(): Promise<void> {
  const opts = {
    username: "MZxsLzeMU0duIIHyJvHS",
    displayName: "Rosalia Jarret",
    authenticatorSelection: {
      requireResidentKey: false,
      userVerification: "preferred",
    },
    attestation: "direct",
  };

  const resp1 = await httpClient.postAttestationOptions(opts).then((resp) =>
    resp.json()
  );

  const resp2 = await httpClient.postAttestationOptions(opts).then((resp) =>
    resp.json()
  );

  assertNotEquals(
    resp1.challenge,
    resp2.challenge,
    `Server must generate a unique challenge for each attestation`,
  );
}

export default {
  id: attestationOptionsP3ID,
  test: attestationOptionsP3Test,
};
