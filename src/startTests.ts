import logger from "./helpers/logger.ts";
import httpClient from "./helpers/HTTPClient.ts";
import runTest from "./helpers/runTest.ts";
import { TestResult } from "./helpers/types.ts";

import attestationOptionsP1 from "./tests/attestation/options/P-1.ts";
import attestationOptionsP2 from "./tests/attestation/options/P-2.ts";
import attestationOptionsP3 from "./tests/attestation/options/P-3.ts";
import AttestationResponseResp1P1 from "./tests/attestation/response/Resp-1/P-1.ts";

/**
 * Begin conformance tests against the specified Relying Party
 *
 * @param rpURL URL of the Relying Party
 */
export default async function startTests(rpURL: string): Promise<TestResult[]> {
  logger.info(`Starting tests against ${rpURL}`);

  // Set an RP URL on the HTTP client singleton
  httpClient.setRPURL(rpURL);

  // Run all tests
  const promiseResults = await Promise.allSettled([
    runTest(attestationOptionsP1.id, attestationOptionsP1.test),
    runTest(attestationOptionsP2.id, attestationOptionsP2.test),
    runTest(attestationOptionsP3.id, attestationOptionsP3.test),
    runTest(AttestationResponseResp1P1.id, AttestationResponseResp1P1.test),
  ]);

  const results: TestResult[] = [];

  // Get the test results out from `allSettled()`
  promiseResults.forEach((result) => {
    if (result.status === "fulfilled") {
      results.push(result.value);
    } else if (result.status === "rejected") {
      results.push(result.reason);
    }
  });

  logger.info("Tests complete\n");

  return results;
}
