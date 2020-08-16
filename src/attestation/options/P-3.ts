import { TestIdentifer } from "../../helpers/types.ts";

export default async function AttestationOptionsP3(): Promise<TestIdentifer> {
  const result: TestIdentifer = {
    suite: 'attestation',
    mode: 'options',
    id: 'P-3',
  };

  return result;
}
