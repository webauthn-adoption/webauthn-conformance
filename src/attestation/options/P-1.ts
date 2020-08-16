import TestSuccess from "../../helpers/TestSuccess.ts";
import HTTPClient from "../../helpers/HTTPClient.ts";
import logger from "../../helpers/logger.ts";
import TestFailure from "../../helpers/TestFailure.ts";
import { TestIdentifer } from "../../helpers/types.ts";
import { assert } from "../../deps.ts";

const identifier: TestIdentifer = {
  suite: "attestation",
  mode: "options",
  id: "P-1",
};

export default async function AttestationOptionsP1(
  client: HTTPClient,
): Promise<TestSuccess> {
  logger.info("START AttestationOptionsP1");
  try {
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
    const resp = await client.postAttestationOptions(opts).then((resp) =>
      resp.json()
    );
    // logger.debug(`P1 - response: ${JSON.stringify(resp, null, 2)}`);

    assert(
      typeof resp.challenge !== "undefined",
      "challenge must not be undefined",
    );
    assert(
      resp.challenge.length >= 21,
      "challenge must be at least 21 bytes long",
    );
  } catch (err) {
    throw new TestFailure(identifier, err.message);
  }

  return new TestSuccess(identifier);
}
