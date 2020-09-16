<!-- omit in toc -->
# Roadmap

Tracking the general direction of the project.

- [Phase 1 - Seeding tests](#phase-1---seeding-tests)
  - [Downloading FIDO Conformance Tools](#downloading-fido-conformance-tools)
  - [Accessing unit tests](#accessing-unit-tests)
    - [macOS](#macos)
    - [Windows](#windows)
  - [Porting tests](#porting-tests)
  - [Test Architecture](#test-architecture)
    - [Test Naming](#test-naming)
  - [Challenges](#challenges)

## Phase 1 - Seeding tests

Right now the name of the game is bootstrapping a suite of tests that instill confidence in RP functionality. Fortunately the FIDO Conformance tests are a good foundational collection of unit tests across many different types of attestations and assertions to help enhance confidence in WebAuthn compatibility.

Initial efforts during this phase should focus on porting over these conformance tests. Here's a breakdown of the process I used to seed the small handful of tests that are currently in this repo:

### Downloading FIDO Conformance Tools

First, secure a copy of the FIDO Conformance Tools desktop application. If you don't already have it, you can submit a download request by filling out the [Test Tool Access Request](https://fidoalliance.org/test-tool-access-request/) form.

### Accessing unit tests

The FIDO Conformance Tools are an Electron app containing HTML, CSS, and most importantly JavaScript files. The next step is to dive into the app's internals and grab just the "FIDO2 > Server Tests" files:

#### macOS

- Right-click **fido-conformance-tools-electron.app** and select **Show Package Contents**
- From within, navigate to **./Contents/Resources/app/modules/fido2-conformance-module/tests/Server** and make a copy of the folders within:
  - **GetAssertion/**
  - **MakeCredential/**
  - **MDS/**

#### Windows

TBD (I'm not sure where these files become accessible, perhaps somewhere in **%USER%**?)

### Porting tests

FIDO Conformance Tools tests are standard [Mocha](https://mochajs.org/) unit tests written in JavaScript. A small degree of refactor is needed to get the various groupings of assertions into a state suitable for use in this TypeScript project.

### Test Architecture

Individual test cases are intended to be encapsulated into a discrete file. These files should `export default` the following data structure:

```ts
interface TestCase {
  id: string;
  test: () => Promise<void>
}
```

The function provided for `test` should make a network request to the RP passed in when executing the tool (see "Commandline Usage" in [**README.md**](./README.md)) using `httpClient` from [**src/helpers/HTTPClient.ts**](./src/helpers/HTTPClient.ts), then make various assertions using `assert` from Node's `'assert'` module. Assertions that fail will throw an error that gets caught and marks the test case as FAIL. If no test fails, the test will get marked as PASS.

Check out [**src/tests/attestation/options/P-1.ts**](./src/tests/attestation/options/P-1.ts) for a clearer example of how tests should be architected.

> Note: the current testing architecture is not set in stone - improvements at these early stages are welcome!

Once a test is defined, it should be added as an entry in [**src/tests/index.ts**](./src/tests/index.ts). It will then be executed on the next commandline execution.

#### Test Naming

Test naming convention is probably not scalable. Please feel free to experiment with an organization structure that ideally enables sane grouping of tests to somewhat match the order in the FIDO Conformance Tools while also enabling tests to be split up into multiple files.

### Challenges

- We need to write "software authenticators" capable of producing each type of attestation type.

This project might be able to borrow some of what FIDO Conformance Tools uses. There's an opportunity here to "work backwards" through an attestation verification and write something from the ground up, though, and I suggest we take this. Whatever results should be capable of producing good attestations, and attestations we can selectively mangle as per the various tests cases.

- We need to write something that can generate assertions

In the same vein as the attestation authenticators, we need something capable of generating the various buffers and signed payloads that are expected to be in assertions. This too should enable fine-tuned tweaking to allow for specifying invalid values within.
