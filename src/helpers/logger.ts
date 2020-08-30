import pino from 'pino';

const logger = pino({
  name: 'webauthn',
  prettyPrint: true,
});

export default logger;
