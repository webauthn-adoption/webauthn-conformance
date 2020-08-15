#!/usr/bin/env node
import logger from "./logger.ts";
import startTests from "./startTests.ts";

const { args } = Deno;

if (!args[0]) {
  throw new Error('Relying Party URL is required');
}

logger.debug(`testing ${args[0]}`);
