import { AttestationCredentialJSON, PublicKeyCredentialCreationOptionsJSON } from "../deps.ts";

/**
 * HTTP client to contain all of the request URLs used in testing.
 */
class HTTPClient {
  private url: string = "";

  /**
   * Specify the URL to the Relying Party being tested
   */
  setRPURL(url: string) {
    this.url = url;
  }

  /**
   * POST /attestation/options
   */
  async postAttestationOptions(opts: AttestationOptionsRequestOpts) {
    return fetch(`${this.url}/attestation/options`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    });
  }

  /**
   * POST /attestation/result
   */
  async postAttestationResponse(opts: AttestationCredentialJSON) {
    return fetch(`${this.url}/attestation/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    });
  }
}

const httpClient = new HTTPClient();

/**
 * Export an instance of the class so we have a singleton we can import anywhere
 */
export default httpClient;

export type AttestationOptionsRequestOpts = {
  username: string;
  displayName: string;
  attestation: AttestationConveyancePreference;
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  extensions?: AuthenticationExtensionsClientInputsTemp;
};

/**
 * `AuthenticationExtensionsClientInputs` in TypeScript's dom.lib.d.ts is woefully out of date
 * (the spec just moves too fast), so let's maintain a version of it here temporarily
 */
type AuthenticationExtensionsClientInputsTemp = {
  [key: string]: boolean;
};
