import { colors } from "../deps.ts";
import type { TestResult } from "./types.ts";
import logger from "./logger.ts";

const { red, green } = colors;

export default function logTestResult(result: TestResult): void {
  let message = result.identifier.id;

  if (result.result === "passed") {
    message = `${green("pass")} ${message}`;
  } else {
    message = `${red("fail")} ${message} (reason: ${result.reason})`;
  }

  logger.info(message);
}
