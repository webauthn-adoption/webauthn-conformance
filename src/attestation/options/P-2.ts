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
 * Check that `options.attestation` can be set to `"none"`
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
    `Client requested that server would set attestation to "none". Server has not returned
    attestation set to "none"!`,
  );
}

export default {
  id: attestationOptionsP2ID,
  test: attestationOptionsP2Test,
};
