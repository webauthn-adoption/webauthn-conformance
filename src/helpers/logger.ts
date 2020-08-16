import { log } from "../deps.ts";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    webauthn: {
      level: "DEBUG",
      handlers: ["console"],
    },
  },
});

const logger = log.getLogger("webauthn");

export default logger;
