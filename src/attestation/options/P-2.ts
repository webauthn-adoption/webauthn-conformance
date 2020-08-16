import { TestIdentifer, TestFailureError } from "../../helpers/types.ts";

export default async function AttestationOptionsP2(): Promise<TestIdentifer> {
  throw new TestFailureError({
    suite: 'attestation',
    mode: 'options',
    id: 'P-2',
  });
}
