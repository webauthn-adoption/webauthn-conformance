import logger from "./helpers/logger.ts";
import { TestResults, TestIdentifer, TestFailureError } from "./helpers/types.ts";

import AttestationOptionsP1 from './attestation/options/P-1.ts';
import AttestationOptionsP2 from './attestation/options/P-2.ts';
import AttestationOptionsP3 from './attestation/options/P-3.ts';

/**
 * Begin conformance tests against the specified Relying Party
 *
 * @param rpURL URL of the Relying Party
 */
export default async function startTests(rpURL: string): Promise<TestResults> {
  logger.info(`starting tests against ${rpURL}`);

  const promiseResults = await Promise.allSettled([
    AttestationOptionsP1(),
    AttestationOptionsP2(),
    AttestationOptionsP3(),
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

  logger.info(`${passed.length} test(s) passed: ${passed.map((test) => test.id).join(', ')}`);
  logger.info(`${failed.length} test(s) failed: ${failed.map((test) => test.id).join(', ')}`);

  const results: TestResults = {
    passed,
    failed,
  };

  return results;
}
