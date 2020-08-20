import httpClient from "../../helpers/HTTPClient.ts";
import { TestIdentifer } from "../../helpers/types.ts";
import { asserts } from "../../deps.ts";

const { assertNotEquals } = asserts

const attestationOptionsP3ID: TestIdentifer = {
  suite: "attestation",
  mode: "options",
  id: "AttestationOptionsP3",
};

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
    `Server must generate a unique challenge for each attestation!`,
  );
}

export default {
  id: attestationOptionsP3ID,
  test: attestationOptionsP3Test,
};
