# WebAuthn Conformance Proof of Concept

## Goal

To discover a CI/CD-friendly way to administer FIDO Conformance testing.

Ideally we can identify a codebase structure that enables an easy porting of existing tests, while allowing for the addition of new tests that are specifically for testing WebAuthn Relying Parties.

## Requirements

- Node v14.9.0+ ([installation instructions](https://nodejs.org/en/download/))

Once Node is available, install dependencies:

```sh
$> npm install
```

## Development

Start the test suite in watch mode so that code changes changes will trigger a re-run:

```sh
$> npm run dev -- http://localhost
```

## Commandline Usage

Run the test suite, making sure to point to your RP's URL:

```sh
$> npm start -- http://localhost
```

This will run the test against `http://localhost`. Update the server URL if your RP is running on a different address.
