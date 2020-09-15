import assert from 'assert';

import httpClient, { AttestationOptionsRequestOpts } from '../../../helpers/HTTPClient';
import type { TestIdentifer } from '../../../helpers/types';

const attestationOptionsP1ID: TestIdentifer = {
  suite: 'attestation',
  mode: 'options',
  id: 'AttestationOptionsP1',
};

/**
 * P-1
 * Get ServerPublicKeyCredentialCreationOptionsResponse, and check that:
 *     (a) response MUST contain "status" field, and it MUST be of type DOMString and set to "ok"
 *     (b) response MUST contain "errorMessage" field, and it MUST be of type DOMString and set to
 *         an empty string
 *     (c) response contains "user" field, of type Object and:
 *         (1) check that user.name is not missing, and is of type DOMString
 *         (2) check that user.displayName is not missing, and is of type DOMString
 *         (3) check that user.id is not missing, and is of type DOMString, and is not empty. It
 *             MUST be base64url encoded byte sequence, and is not longer than 64 bytes.
 *         (4) If user.icon is presented, check that it's is of type DOMString
 *     (d) response contains "rp" field, of type Object and:
 *         (1) check that rp.name is not missing, and is of type DOMString
 *         (2) check that rp.id is not missing, and is of type DOMString.
 *         (3) If rp.icon is presented, check that it's is of type DOMString
 *     (e) response contains "challenge" field, of type String, base64url encoded and not less than
 *         16 bytes.
 *     (f) response contains "pubKeyCredParams" field, of type Array and:
 *         (1) each member MUST be of type Object
 *         (2) each member MUST contain "type" field of type DOMString
 *         (3) each member MUST contain "alg" field of type Number
 *         (4) MUST contain one member with type set to "public-key" and alg set to an algorithm
 *             that is supported by the authenticator
 *     (g) If response contains "timeout" field, check that it's of type Number and is bigger than 0
 *     (h) response contains "extensions" field, with "example.extension" key presented
 */
async function attestationOptionsP1Test(): Promise<void> {
  const opts: AttestationOptionsRequestOpts = {
    username: '2cKNGn1rOXC5_C0yR08W',
    displayName: 'Lakeesha Hemstreet',
    authenticatorSelection: {
      requireResidentKey: false,
      userVerification: 'preferred',
    },
    attestation: 'direct',
    extensions: {
      'example.extension': true,
    },
  };

  const resp = await httpClient.postAttestationOptions(opts).then((_resp) => _resp.json());

  assert.notStrictEqual(resp.status, undefined, 'Response is missing "status" field!');
  assert.strictEqual(typeof resp.status, 'string', 'Response.status MUST be of type DOMString');
  assert.strictEqual(resp.status, 'ok', 'Response.status MUST be set to "ok"!');

  assert.notStrictEqual(resp.errorMessage, undefined, 'Response is missing "errorMessage" field!');

  assert.strictEqual(
    typeof resp.errorMessage,
    'string',
    'Response.errorMessage MUST be of type DOMString',
  );

  assert(resp.errorMessage.length < 1, 'Response.errorMessage MUST be empty when OK');

  /* ----- User ----- */
  assert.notStrictEqual(resp.user, undefined, 'Response is missing "user" field!');
  assert.strictEqual(typeof resp.user, 'object', 'Response.user MUST be of type Object');
  assert.notStrictEqual(resp.user.name, undefined, 'Response.user missing "name" field!');
  assert.strictEqual(
    typeof resp.user.name,
    'string',
    'Response.user.name is not of type DOMString',
  );
  assert(resp.user.name.length > 0, 'Response.user.name is empty');
  assert.strictEqual(
    resp.user.name,
    opts.username,
    'Response.user.name is not set to requested name',
  );

  assert.notStrictEqual(
    resp.user.displayName,
    undefined,
    'Response.user missing "displayName" field!',
  );
  assert.strictEqual(
    typeof resp.user.displayName,
    'string',
    'Response.user.displayName is not of type DOMString',
  );
  assert(resp.user.displayName.length > 0, 'Response.user.displayName is empty');
  assert.strictEqual(
    resp.user.displayName,
    opts.displayName,
    'Response.user.displayName is not set to requested displayName',
  );

  assert.notStrictEqual(typeof resp.user.id, undefined, 'Response.user missing "id" field!');
  assert.strictEqual(typeof resp.user.id, 'string', 'Response.user.id is not of type DOMString');
  assert(resp.user.id.length > 0, 'Response.user.id is empty');
  assert.match(
    resp.user.id,
    /^[a-zA-Z0-9_-]+$/,
    'Response.user.id MUST be base64URL(without padding) encoded',
  );

  if (resp.user.icon) {
    assert.strictEqual(
      typeof resp.user.icon,
      'string',
      'Response.user.icon is not of type DOMString',
    );
    assert(resp.user.icon.length > 0, 'Response.user.icon is empty');
  }

  /* ----- RP ----- */
  assert.notStrictEqual(typeof resp.rp, undefined, 'Response is missing "rp" field!');
  assert.notStrictEqual(typeof resp.rp.name, undefined, 'Response.rp missing "name" field!');
  assert.strictEqual(typeof resp.rp.name, 'string', 'Response.rp.name is not of type DOMString');
  assert(resp.rp.name.length > 0, 'Response.rp.name is empty');

  if (resp.rp.id) {
    assert.strictEqual(typeof resp.rp.id, 'string', 'Response.rp.id is not of type DOMString');
    assert(resp.rp.id.length > 0, 'Response.rp.id is empty');
  }

  if (resp.rp.icon) {
    assert.strictEqual(typeof resp.rp.icon, 'string', 'Response.rp.icon is not of type DOMString');
    assert(resp.rp.icon.length > 0, 'Response.rp.icon is empty');
  }

  assert.notStrictEqual(typeof resp.challenge, undefined, 'Response is missing "challenge" field!');
  assert.strictEqual(
    typeof resp.challenge,
    'string',
    'Response.challenge MUST be of type DOMString',
  );
  assert.match(
    resp.challenge,
    /^[a-zA-Z0-9_-]+$/,
    'Response.challenge MUST be base64URL(without padding) encoded',
  );
  assert(
    resp.challenge.length > 21,
    `Response.challenge must be at least 21 bytes long but was ${resp.challenge.length} bytes`,
  );

  assert.notStrictEqual(
    typeof resp.pubKeyCredParams,
    undefined,
    'Response is missing "pubKeyCredParams" field!',
  );

  if (resp.timeout) {
    assert.strictEqual(typeof resp.timeout, 'number', 'Response.timeout MUST be of type Number');
    assert(resp.timeout > 0, 'Response.timeout MUST bigger than 0');
  }

  assert.strictEqual(
    resp.attestation,
    opts.attestation,
    `Response.attestation "${resp}" was not set to the expected attestation "${opts.attestation}"`,
  );

  assert.deepStrictEqual(
    resp.authenticatorSelection,
    opts.authenticatorSelection,
    `Response.authenticatorSelection MUST be set to the requested authenticatorSelection! Expected "${JSON.stringify(
      resp.authenticatorSelection,
    )}" to equal "${JSON.stringify(opts.authenticatorSelection)}"`,
  );

  assert.deepStrictEqual(
    resp.extensions,
    opts.extensions,
    `Response.extensions MUST be set to the requested extensions! Expected "${JSON.stringify(
      resp.extensions,
    )}" to equal "${JSON.stringify(opts.extensions)}"`,
  );
}

export default {
  id: attestationOptionsP1ID,
  test: attestationOptionsP1Test,
};
