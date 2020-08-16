import { TestResult, TestIdentifer } from "./types.ts";

/**
 * A custom class containing info on a test that passed
 */
export default class TestSuccess {
  result: TestResult;

  constructor(identifier: TestIdentifer, reason?: string) {
    this.result = {
      identifier,
      result: "passed",
      reason,
    };
  }
}
