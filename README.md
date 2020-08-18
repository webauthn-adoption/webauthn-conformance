# WebAuthn Conformance Proof of Concept

## Goal

To discover a CI/CD-friendly way to administer FIDO Conformance testing.

Ideally we can identify a codebase structure that enables an easy porting of existing tests, while allowing for additional tests that may be relevant specifically for testing WebAuthn Relying Parties.

## Requirements

- Deno v1.3.0 ([installation instructions](https://deno.land/#installation))

## Development

To execute the tests, execute the following shell script:

```sh
$> ./runTest.sh
```

This will run the test against `http://localhost`. Update the server URL in the script file if your RP is running on a different address.
