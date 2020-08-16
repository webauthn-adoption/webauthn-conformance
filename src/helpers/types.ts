/**
 * Test results sorted into pass/fail
 */
export type TestResults = {
  passed: TestIdentifer[];
  failed: TestIdentifer[];
};

/**
 * Values identifying a given conformance test case
 */
export type TestIdentifer = {
  suite: 'attestation' | 'assertion';
  mode: 'options' | 'response';
  id: string;
};

/**
 * A custom error for us to throw when a test fails
 */
export class TestFailureError {
  identifier: TestIdentifer;

  constructor(identifier: TestIdentifer) {
    this.identifier = identifier;
  }
}
