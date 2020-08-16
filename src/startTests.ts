import logger from "./logger.ts";
import { TestResults, TestIdentifer, TestFailureError } from "./types.ts";

import AttestationOptionsP1 from './attestation/options/P-1.ts';
import AttestationOptionsP2 from './attestation/options/P-2.ts';

/**
 * Begin conformance tests against the specified Relying Party
 *
 * @param rpURL URL of the Relying Party
 */
export default async function startTests(rpURL: string): Promise<TestResults> {
  logger.debug(`starting tests against ${rpURL}`);

  const promiseResults = await Promise.allSettled([
    AttestationOptionsP1(),
    AttestationOptionsP2(),
  ]);

  const passed: TestIdentifer[] = [];
  const failed: TestIdentifer[] = [];

  // Sort all of the results into passed/failed
  promiseResults.forEach((result) => {
    if (result.status === "fulfilled") {
      passed.push(result.value);
    } else if (result.status === "rejected") {
      failed.push((result.reason as TestFailureError).identifier);
    }
  });

  const results: TestResults = {
    passed,
    failed,
  };

  return results;
}
