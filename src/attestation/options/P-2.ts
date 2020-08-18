import httpClient from "../../helpers/HTTPClient.ts";
import { TestIdentifer } from "../../helpers/types.ts";
import { assert } from "https://deno.land/std@0.65.0/_util/assert.ts";

export const attestationOptionsP2ID: TestIdentifer = {
  suite: "attestation",
  mode: "options",
  id: "AttestationOptionsP2",
};

/**
 * Check that `options.attestation` can be set to `"none"`
 */
export async function attestationOptionsP2Test(): Promise<void> {
  // Some conditional that is easy to fail
  assert(httpClient === undefined, "intentionally failed");
}

export default {
  id: attestationOptionsP2ID,
  test: attestationOptionsP2Test,
};
