import { TestResult, TestIdentifer } from "./types.ts";

/**
 * A custom error for us to throw when a test fails
 */
export default class TestFailure {
  result: TestResult;

  constructor(identifier: TestIdentifer, reason?: string) {
    this.result = {
      identifier,
      result: "failed",
      reason,
    };
  }
}
