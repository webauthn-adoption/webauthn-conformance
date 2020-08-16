/**
 * Test results sorted into pass/fail
 */
export type TestResult = {
  identifier: TestIdentifer;
  result: "passed" | "failed";
  reason?: string;
};

/**
 * Values identifying a given conformance test case
 */
export type TestIdentifer = {
  suite: "attestation" | "assertion";
  mode: "options" | "response";
  id: string;
};
