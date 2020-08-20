import httpClient from "../../helpers/HTTPClient.ts";
import { TestIdentifer } from "../../helpers/types.ts";
import { asserts } from "../../deps.ts";

const attestationOptionsP1ID: TestIdentifer = {
  suite: "attestation",
  mode: "options",
  id: "AttestationOptionsP1",
};

/**
 * Test Attestation Options generation happy path
 */
async function attestationOptionsP1Test(): Promise<void> {
  const opts = {
    username: "2cKNGn1rOXC5_C0yR08W",
    displayName: "Lakeesha Hemstreet",
    authenticatorSelection: {
      "requireResidentKey": false,
      "userVerification": "preferred",
    },
    attestation: "direct",
    extensions: {
      "example.extension": true,
    },
  };

  const resp = await httpClient.postAttestationOptions(opts).then((resp) =>
    resp.json()
  );

  assert(
    typeof resp.challenge !== "undefined",
    "challenge must not be undefined",
  );
  assert(
    resp.challenge.length >= 21,
    "challenge must be at least 21 bytes long",
  );
}

export default {
  id: attestationOptionsP1ID,
  test: attestationOptionsP1Test,
};
