import runTest from "../helpers/runTest.ts";
import { TestResult } from "../helpers/types.ts";

import attestationOptionsP1 from "./attestation/options/P-1.ts";
import attestationOptionsP2 from "./attestation/options/P-2.ts";
import attestationOptionsP3 from "./attestation/options/P-3.ts";
import AttestationResponseResp1P1 from "./attestation/response/Resp-1/P-1.ts";

/**
 * A simple method for kicking off tests
 *
 * Serves as a convenient place for us to register test cases without having to embiggen
 * **startTests.ts**
 */
export function runAllTests(): Promise<TestResult>[] {
  return [
    /**
     * Attestation options generation
     */
    runTest(attestationOptionsP1.id, attestationOptionsP1.test),
    runTest(attestationOptionsP2.id, attestationOptionsP2.test),
    runTest(attestationOptionsP3.id, attestationOptionsP3.test),
    /**
     * Attestation response verification
     */
    runTest(AttestationResponseResp1P1.id, AttestationResponseResp1P1.test),
  ];
}
