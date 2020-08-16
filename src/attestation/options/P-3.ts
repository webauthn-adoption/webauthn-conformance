import TestSuccess from "../../helpers/TestSuccess.ts";

export default async function AttestationOptionsP3(): Promise<TestSuccess> {
  return new TestSuccess({
    suite: "attestation",
    mode: "options",
    id: "P-3",
  });
}
