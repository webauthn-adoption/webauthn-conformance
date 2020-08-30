import type { TestResult } from './types';
import logger from './logger';

export default function logTestResult(result: TestResult): void {
  let message = result.identifier.id;

  if (result.result === 'passed') {
    message = `pass ${message}`;
  } else {
    message = `fail ${message} (reason: ${result.reason})`;
  }

  logger.info(message);
}
