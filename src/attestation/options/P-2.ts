import { TestIdentifer, TestFailureError } from "../../types.ts";

export default async function AttestationOptionsP2(): Promise<TestIdentifer> {
  throw new TestFailureError({
    suite: 'attestation',
    mode: 'options',
    id: 'P-2',
  });
}
