export default class HTTPClient {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async postAttestationOptions(opts: AttestationOptionsRequestOpts) {
    return fetch(`${this.url}/attestation/options`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opts),
    });
  }
}

type AttestationOptionsRequestOpts = {
  username: string,
  displayName: string,
  // TODO Needs to be `AuthenticatorSelectionCriteria` from lib.dom.d.ts
  authenticatorSelection: unknown,
  // TODO Define this properly
  attestation: unknown,
  // TODO Define this properly
  extensions: unknown,
};
