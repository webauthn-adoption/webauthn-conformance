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
}

const httpClient = new HTTPClient();

/**
 * Export an instance of the class so we have a singleton we can import anywhere
 */
export default httpClient;

type AttestationOptionsRequestOpts = {
  username: string;
  displayName: string;
  // TODO Define this properly
  attestation: unknown;
  // TODO Needs to be `AuthenticatorSelectionCriteria` from lib.dom.d.ts
  authenticatorSelection?: unknown;
  // TODO Define this properly
  extensions?: unknown;
};
