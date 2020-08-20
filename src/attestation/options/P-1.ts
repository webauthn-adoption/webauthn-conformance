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
 * Test Attestation Options generation happy path
 */
async function attestationOptionsP1Test(): Promise<void> {
  const username = "2cKNGn1rOXC5_C0yR08W";
  const displayName = "Lakeesha Hemstreet";
  const attestation = "direct";
  const authenticatorSelection = {
    "requireResidentKey": false,
    "userVerification": "preferred",
  };
  const extensions = {
    "example.extension": true,
  };

  const opts = {
    username,
    displayName,
    authenticatorSelection,
    attestation,
    extensions,
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
    username,
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
    displayName,
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
    attestation,
    `Response.attestation "${resp}" was not set to the expected attestation "${attestation}"!`,
  );

  assert(
    equal(resp.authenticatorSelection, authenticatorSelection),
    `Response.authenticatorSelection MUST be set to the requested authenticatorSelection! Expected "${
      JSON.stringify(
        resp.authenticatorSelection,
      )
    }" to equal "${JSON.stringify(authenticatorSelection)}"`,
  );

  assert(
    equal(resp.extensions, extensions),
    `Response.extensions MUST be set to the requested extensions! Expected "${
      JSON.stringify(
        resp.extensions,
      )
    }" to equal "${JSON.stringify(extensions)}"`,
  );
}

export default {
  id: attestationOptionsP1ID,
  test: attestationOptionsP1Test,
};
