
# Stratify CLI

Command-line tool for [Stratify](https://www.npmjs.com/package/@stratify/core), a modular Fastify framework with DI and TypeScript support.
It scaffolds a ready-to-use Stratify project with TypeScript, ESLint, and Prettier.

## Installation

```bash
npm install -g @stratify/cli
```

## Usage

```bash
npx stratify-cli new <app-name>
```

Creates a new project with:

* TypeScript + ESM
* ESLint and Prettier setup
* Example module under `/src/tasks` (controllers, providers, hooks, installers, adapters)

Then:

```bash
cd <app-name>
npm install
npm run dev
```
