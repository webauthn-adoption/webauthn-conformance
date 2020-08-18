import logger from "./helpers/logger.ts";
import startTests from "./startTests.ts";
import logTestResult from "./helpers/logTestResult.ts";

/**
 * Commandline arguments
 *
 * @param {string} args[0] Relying Party URL to test
 */
const { args } = Deno;

if (!args[0]) {
  throw new Error("Relying Party URL is required");
}

const rpURL = args[0];

const results = await startTests(rpURL);

// Mash all results together and then sort by test ID
const allResults = results
  .sort((a, b) => {
    const aID = a.identifier.id;
    const bID = b.identifier.id;

    if (aID < bID) return -1;
    if (aID > bID) return 1;
    return 0;
  });

logger.info("[RESULTS]");

allResults.forEach((test) => {
  logTestResult(test);
});
