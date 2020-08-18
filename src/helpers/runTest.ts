import { TestResult, TestIdentifer } from "./types.ts";
import logger from "./logger.ts";

/**
 * Helper method to execute individual tests and report back on the results
 *
 * @param identifier Test identifier
 * @param testFn Test method containing RP request and assertions against RP response
 */
export default async function runTest(
  identifier: TestIdentifer,
  testFn: () => Promise<void>,
): Promise<TestResult> {
  logger.debug(`START ${identifier.id}`);

  try {
    // Run the test
    await testFn();
  } catch (err) {
    // Test failed. Make sure to include the reason why
    return {
      identifier,
      result: "failed",
      reason: err.message,
    };
  }

  // Test passed!
  return {
    identifier,
    result: "passed",
  };
}
