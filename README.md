# PocketBase TypeScript hooks

A [Bun](https://bun.sh) template that supports building TypeScript hooks for your [PocketBase](https://pocketbase.io) application.

## Requirements

This template is designated for developing with [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers). You only need to add [its associated extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) to your [Visual Studio Code](https://code.visualstudio.com) along with ensuring that [Docker](https://docs.docker.com/engine/install) is available in your machine.

If you just want to go on your way, please make sure that the following dependencies are available:

1. [Bun](https://bun.sh): Bun is a fast JavaScript bundler (we only use its bundling feature here). At the moment I was writing this README, Bun was supported on macOS, Linux, and Windows Subsystem for Linux (WSL). Feel free to check out the installation guide [here](https://bun.sh/docs/installation).
2. [PocketBase](https://pocketbase.io): PocketBase is an open-source back-end for your next SaaS and mobile application in a single file (yes, I took this slogan from its [home page](https://pocketbase.io)). It supports being extended via its Hooks. Though we can work with PocketBase Hooks by using either Go or JavaScript, for the Node-family developers, the [JavaScript way](https://pocketbase.io/docs/js-overview/) seems to be easier. To install PocketBase, please follow [this documentation](https://pocketbase.io/docs).

## Usage

### Add dependencies

For adding a new dependency, we can use `bun install` command. For example, if we want to use the functionalities of the npm package [is-even](https://www.npmjs.com/package/is-even), run the following command:

```sh
bun install is-even
```

For installing all dependencies defined in `package.json`, run:

```sh
bun install
```

### Add TypeScript hooks

To add a new TypeScript hook, create a `.pb.ts` file (it is mandatory that a PocketBase hook must end with `.pb.js`) inside the `src` directory. For type hints, we can add a [reference triple-slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-) at the beginning of the file:

```ts
/// <reference path="../types/pocketbase.d.ts" />
```

For reference, please take a look at this overview of [Extending with JavaScript](https://pocketbase.io/docs/js-overview).

### Build

*Building* is a step to compile our TypeScript files into JavaScript and move the built ones to the right place for our PocketBase application. To do that, run:

```sh
bun run build
```

If the building process succeeds, a directory `pb_data` will be created in the current workspace.

### Start

After building, we can start our PocketBase application via:

```sh
pocketbase serve --dir=pb_data --hooksDir=pb_data/pb_hooks
```

The application will listen on port `8090` and, of course, be integrated with our added JavaScript hooks.

> For more convenience in local development, we can use `bun dev` to start the application right after building.

### And...

For more other helpful scripts for development, take a look at `bun run help` command.

## Contribution

This template is made for personal uses. Please **use it at your own risk** and feel free to **create a pull request** if you have and suggestion to make it better.
