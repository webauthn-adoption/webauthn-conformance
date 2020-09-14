import logger from './helpers/logger';
import startTests from './startTests';
import logTestResult from './helpers/logTestResult';

async function main() {
  /**
   * Commandline arguments
   *
   * @param {string} args[0] Relying Party URL to test
   */
  const { argv } = process;

  const rpURL = argv[2];

  if (!rpURL) {
    throw new Error('Relying Party URL is required');
  }

  const results = await startTests(rpURL);

  // Mash all results together and then sort by test ID
  const allResults = results.sort((a, b) => {
    const aID = a.identifier.id;
    const bID = b.identifier.id;

    if (aID < bID) return -1;
    if (aID > bID) return 1;
    return 0;
  });

  logger.info('[RESULTS]');

  allResults.forEach((test) => {
    logTestResult(test);
  });
}

main();
