import TestSuccess from "../../helpers/TestSuccess.ts";
import TestFailure from "../../helpers/TestFailure.ts";

export default async function AttestationOptionsP2(): Promise<TestSuccess> {
  throw new TestFailure({
    suite: "attestation",
    mode: "options",
    id: "P-2",
  }, "unexpected return value");
}
