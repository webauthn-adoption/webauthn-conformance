import { TestIdentifer } from "../../helpers/types.ts";

export default async function AttestationOptionsP1(): Promise<TestIdentifer> {
  const result: TestIdentifer = {
    suite: 'attestation',
    mode: 'options',
    id: 'P-1',
  };

  return result;
}
