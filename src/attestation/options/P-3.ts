import { TestIdentifer } from "../../helpers/types.ts";

const attestationOptionsP3ID: TestIdentifer = {
  suite: "attestation",
  mode: "options",
  id: "AttestationOptionsP3",
};

async function attestationOptionsP3Test(): Promise<void> {
}

export default {
  id: attestationOptionsP3ID,
  test: attestationOptionsP3Test,
};
