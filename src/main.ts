import startTests from "./startTests.ts";

/**
 * Commandline arguments
 *
 * @param {string} args[0] Relying Party URL to test
 */
const { args } = Deno;

if (!args[0]) {
  throw new Error('Relying Party URL is required');
}

const rpURL = args[0];

await startTests(rpURL);
