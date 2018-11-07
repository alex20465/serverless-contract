# SERVERLESS-CONTRACT

This module generates schemas (jsonschema) as node-module package based on typescript definitions IEvent & IResult.

## Getting started

> **IMPORTANT**: This packages is tested using the `aws-nodejs-typescript` using the command `sls create --template aws-nodejs-typescript`.

The schema definitions are defined using typescript interface notation, example:

```typescript
interface IEvent {
    name: string;

    /**
     * @TJS-type integer
     */
    age: string;
}

interface IResult {
    content: string;
}

export const handler = function(event: IEvent, context: any, Callback: any) {
    // .....
};
```

> **INFO**: To generate the schema package we use the package [typescript-json-schema](https://www.npmjs.com/package/typescript-json-schema), it supports additional customizations.

## Generate using CLI

To use this tool via CLI, run the following command in your root project:

```
npm install serverless-contract
```

Lets assume you have the following project structure:

```
backend/
├── packages
│   ├── contracts (the contract packages directory)
└── services
    ├── package
    │   ├── handlers
    │   ├── package.json
    │   ├── serverless.yml
    │   ├── tsconfig.json
    ├── user
    │   ├── handlers
    │   ├── package.json
    │   ├── serverless.yml
    │   ├── tsconfig.json
```

To generate the contract package of the service `user` use the following command:

```
slsc generate backend/services/user user-contract ./packages/contracts
```

This command will generate a npm-module under the location `backend/packages/contracts/user-contract`, which provides a `schema.json` file and exposes main functionality (see API section) to validate invocation input of `IEvent` OR `IResult`.

Finally install the generated contract package using

```
npm install <pathToContract>/user-contract
```

## Generated Contract API

[Not Implemented]

## Node module usage

[Not Implemented]