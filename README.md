<div align="center">

# @yukikaze-bot/erlpack

**A encoder and decoder utility.**

[![GitHub](https://img.shields.io/github/license/yukikaze-bot/erlpack)](https://github.com/yukikaze-bot/erlpack/blob/main/LICENSE.md)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@yukikaze-bot/erlpack?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@yukikaze-bot/erlpack)
[![npm](https://img.shields.io/npm/v/@yukikaze-bot/erlpack?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@yukikaze-bot/erlpack)

</div>

**Table of Contents**

-   [@yukikaze-bot/erlpack](#yukikaze-boterlpack)
    -   [Description](#description)
    -   [Features](#features)
    -   [Installation](#installation)
    -   [Usage](#usage)
        -   [Basic Usage](#basic-usage)
    -   [API Documentation](#api-documentation)

## Description

Erlpack is a fast encoder and decoder for the Erlang Term Format (version 131) for JavaScript.

## Features

-   Written in TypeScript
-   Offers CommonJS, ESM bundles
-   Fully tested
-   Powered by C++

## Installation

```sh
yarn add @yukikaze-bot/erlpack
# npm install @yukikaze-bot/erlpack
# pnpm add @yukikaze-bot/erlpack
```

## Usage

**Note:** While this section uses `require`, the imports match 1:1 with ESM imports. For example `const { pack } = require('@yukikaze-bot/erlpack')` equals `import { pack } from '@yukikaze-bot/erlpack'`.

**Note:** When using ESM syntax you can also default-import `pack` function: `import pack from '@yukikaze-bot/erlpack'`.

### Basic Usage

```ts
const { pack, unpack } = require('@yukikaze-bot/erlpack');
const packed = pack('Hello, World!');

console.log(unpack(packed));
```

---

## API Documentation

For the full API documentation please refer to the TypeDoc generated [documentation](https://yukikaze-bot.github.io/erlpack).
