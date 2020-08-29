export * as log from "https://deno.land/std@0.65.0/log/mod.ts";
export * as colors from "https://deno.land/std@0.65.0/fmt/colors.ts";
export { v4 as uuidv4 } from "https://deno.land/std@0.65.0/uuid/mod.ts";
export { encode as base64URLEncode } from "https://deno.land/std@0.65.0/encoding/base64url.ts";
/**
 * Avoid an issue with TS being unable to infer typing for `assert` by explicitly exporting
 * assertions
 *
 * See https://github.com/microsoft/TypeScript/issues/37818
 */
export {
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
  assertMatch,
  equal,
  assert,
  AssertionError,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";

/**
 * Third-party packages
 */
export {
  AttestationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
  AuthenticatorAttestationResponseJSON,
  AssertionCredentialJSON,
} from "https://unpkg.com/@simplewebauthn/typescript-types@0.8.2/dist/index.d.ts";
