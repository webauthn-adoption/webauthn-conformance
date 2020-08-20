import httpClient from "../../helpers/HTTPClient.ts";
import { TestIdentifer } from "../../helpers/types.ts";
import { asserts } from "../../deps.ts";

const {
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
  assertMatch,
  equal,
  AssertionError,
} = asserts;

// Deno complains that "'assert' needs an explicit type annotation." when I try to use `assert` as
// exported from `asserts`, so I copy-pasted it here where it works fine for some reason
function assert(expr: unknown, msg = ""): asserts expr {
  if (!expr) {
    throw new AssertionError(msg);
  }
}

const attestationOptionsP1ID: TestIdentifer = {
  suite: "attestation",
  mode: "options",
  id: "AttestationOptionsP1",
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
  const opts = {
    username: "2cKNGn1rOXC5_C0yR08W",
    displayName: "Lakeesha Hemstreet",
    authenticatorSelection: {
      "requireResidentKey": false,
      "userVerification": "preferred",
    },
    attestation: "direct",
    extensions: {
      "example.extension": true,
    },
  };

  const resp = await httpClient.postAttestationOptions(opts).then((resp) =>
    resp.json()
  );

  assertNotEquals(
    resp.status,
    undefined,
    'Response is missing "status" field!',
  );
  assertEquals(
    typeof resp.status,
    "string",
    "Response.status MUST be of type DOMString!",
  );
  assertStrictEquals(
    resp.status,
    "ok",
    'Response.status MUST be set to "ok"!',
  );

  assertNotEquals(
    resp.errorMessage,
    undefined,
    'Response is missing "errorMessage" field!',
  );

  assertEquals(
    typeof resp.errorMessage,
    "string",
    "Response.errorMessage MUST be of type DOMString!",
  );

  assert(
    resp.errorMessage.length < 1,
    "Response.errorMessage MUST be empty when OK!",
  );

  /* ----- User ----- */
  assertNotEquals(
    resp.user,
    undefined,
    'Response is missing "user" field!',
  );
  assertEquals(
    typeof resp.user,
    "object",
    "Response.user MUST be of type Object!",
  );
  assertNotEquals(
    resp.user.name,
    undefined,
    'Response.user missing "name" field!',
  );
  assertEquals(
    typeof resp.user.name,
    "string",
    "Response.user.name is not of type DOMString!",
  );
  assert(
    resp.user.name.length > 0,
    "Response.user.name is empty!",
  );
  assertStrictEquals(
    resp.user.name,
    opts.username,
    "Response.user.name is not set to requested name!",
  );

  assertNotEquals(
    resp.user.displayName,
    undefined,
    'Response.user missing "displayName" field!',
  );
  assertEquals(
    typeof resp.user.displayName,
    "string",
    "Response.user.displayName is not of type DOMString!",
  );
  assert(
    resp.user.displayName.length > 0,
    "Response.user.displayName is empty!",
  );
  assertStrictEquals(
    resp.user.displayName,
    opts.displayName,
    "Response.user.displayName is not set to requested displayName!",
  );

  assertNotEquals(
    typeof resp.user.id,
    undefined,
    'Response.user missing "id" field!',
  );
  assertEquals(
    typeof resp.user.id,
    "string",
    "Response.user.id is not of type DOMString!",
  );
  assert(
    resp.user.id.length > 0,
    "Response.user.id is empty!",
  );
  assertMatch(
    resp.user.id,
    /^[a-zA-Z0-9_-]+$/,
    "Response.user.id MUST be base64URL(without padding) encoded!",
  );

  if (resp.user.icon) {
    assertEquals(
      typeof resp.user.icon,
      "string",
      "Response.user.icon is not of type DOMString!",
    );
    assert(
      resp.user.icon.length > 0,
      "Response.user.icon is empty!",
    );
  }

  /* ----- RP ----- */
  assertNotEquals(
    typeof resp.rp,
    undefined,
    'Response is missing "rp" field!',
  );
  assertNotEquals(
    typeof resp.rp.name,
    undefined,
    'Response.rp missing "name" field!',
  );
  assertEquals(
    typeof resp.rp.name,
    "string",
    "Response.rp.name is not of type DOMString!",
  );
  assert(
    resp.rp.name.length > 0,
    "Response.rp.name is empty!",
  );

  if (resp.rp.id) {
    assertEquals(
      typeof resp.rp.id,
      "string",
      "Response.rp.id is not of type DOMString!",
    );
    assert(
      resp.rp.id.length > 0,
      "Response.rp.id is empty!",
    );
  }

  if (resp.rp.icon) {
    assertEquals(
      typeof resp.rp.icon,
      "string",
      "Response.rp.icon is not of type DOMString!",
    );
    assert(
      resp.rp.icon.length > 0,
      "Response.rp.icon is empty!",
    );
  }

  assertNotEquals(
    typeof resp.challenge,
    undefined,
    'Response is missing "challenge" field!',
  );
  assertEquals(
    typeof resp.challenge,
    "string",
    "Response.challenge MUST be of type DOMString!",
  );
  assertMatch(
    resp.challenge,
    /^[a-zA-Z0-9_-]+$/,
    "Response.challenge MUST be base64URL(without padding) encoded!",
  );
  assert(
    resp.challenge.length > 21,
    "Response.challenge MUST be at least 16 bytes long!",
  );

  assertNotEquals(
    typeof resp.pubKeyCredParams,
    undefined,
    'Response is missing "pubKeyCredParams" field!',
  );

  if (resp.timeout) {
    assertEquals(
      typeof resp.timeout,
      "number",
      "Response.timeout MUST be of type Number!",
    );
    assert(
      resp.timeout > 0,
      "Response.timeout MUST bigger than 0!",
    );
  }

  assertStrictEquals(
    resp.attestation,
    opts.attestation,
    `Response.attestation "${resp}" was not set to the expected attestation "${opts.attestation}"!`,
  );

  assert(
    equal(resp.authenticatorSelection, opts.authenticatorSelection),
    `Response.authenticatorSelection MUST be set to the requested authenticatorSelection! Expected "${
      JSON.stringify(
        resp.authenticatorSelection,
      )
    }" to equal "${JSON.stringify(opts.authenticatorSelection)}"`,
  );

  assert(
    equal(resp.extensions, opts.extensions),
    `Response.extensions MUST be set to the requested extensions! Expected "${
      JSON.stringify(
        resp.extensions,
      )
    }" to equal "${JSON.stringify(opts.extensions)}"`,
  );
}

export default {
  id: attestationOptionsP1ID,
  test: attestationOptionsP1Test,
};
