import logger from './logger.ts';

export default async function startTests(rpURL: string): Promise<void> {
  logger.debug(`starting tests against ${rpURL}`);
}
