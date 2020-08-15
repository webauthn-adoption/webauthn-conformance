import logger from "./logger.ts";

type TestResults = {
  passed: string[];
  failed: string[];
};

/**
 * Begin conformance tests against the specified Relying Party
 *
 * @param rpURL URL of the Relying Party
 */
export default async function startTests(rpURL: string): Promise<TestResults> {
  logger.debug(`starting tests against ${rpURL}`);

  const promiseResults = await Promise.allSettled([
    new Promise<string>((resolve, reject) =>
      setTimeout(() => {
        resolve("p1");
      }, 100)
    ),
    new Promise<string>((resolve, reject) =>
      setTimeout(() => {
        reject("p2");
      }, 100)
    ),
  ]);

  const passed: string[] = [];
  const failed: string[] = [];

  promiseResults.forEach((result) => {
    if (result.status === "fulfilled") {
      passed.push(result.value);
    } else if (result.status === "rejected") {
      failed.push(result.reason);
    }
  });

  const results: TestResults = {
    passed,
    failed,
  };

  return results;
}
