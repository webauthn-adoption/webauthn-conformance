import logger from "./helpers/logger.ts";
import httpClient from "./helpers/HTTPClient.ts";
import { TestResult } from "./helpers/types.ts";
import { runAllTests } from "./tests/index.ts";

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
  const promiseResults = await Promise.allSettled(runAllTests());

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
