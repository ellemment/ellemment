---
title: Getting Started
summary: "Complete guide to setting up and running your first Epic Stack application"
featured: false
date: 2024-03-20
image: /blog-images/headers/getting-started.png
ogImage: /blog-images/headers/getting-started.png
imageAlt: Getting Started
imageDisableOverlay: true
authors:
  - Dony Alior
---

# Getting Started with the Epic Stack

The Epic Stack is a [Remix Stack](https://remix.run/stacks). To start your Epic
Stack, run the following [`npx`](https://docs.npmjs.com/cli/v9/commands/npx)
command:

```sh
npx create-epic-app@latest
```

This will prompt you for a project name (the name of the directory to put your
project). Once you've selected that, the CLI will start the setup process.

Once the setup is complete, go ahead and `cd` into the new project directory and
run `npm run dev` to get the app started.

Check the project README.md for instructions on getting the app deployed. You'll
want to get this done early in the process to make sure you're all set up
properly.

If you'd like to skip some of the setup steps, you can set the following
environment variables when you run the script:

- `SKIP_SETUP` - skips running `npm run setup`
- `SKIP_FORMAT` - skips running `npm run format`
- `SKIP_DEPLOYMENT` - skips deployment setup

So, if you enabled all of these it would be:

```sh
SKIP_SETUP=true SKIP_FORMAT=true SKIP_DEPLOYMENT=true npx create-epic-app@latest
```

Or, on windows:

```
set SKIP_SETUP=true && set SKIP_FORMAT=true && set SKIP_DEPLOYMENT=true && npx create-epic-app@latest
```

## Development

- Initial setup:

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get
started:

- Username: `kody`
- Password: `kodylovesyou`


# Epic Stack Documentation

The goal of The Epic Stack is to provide solid opinions for teams to hit the
ground running on their web applications.

We recommend you watch Kent's introduction to the Epic Stack to get an
understanding of the "why" behind the Stack:

[![Epic Stack Talk slide showing Flynn Rider with knives, the text "I've been around and I've got opinions" and Kent speaking in the corner](https://github-production-user-asset-6210df.s3.amazonaws.com/1500684/277818553-47158e68-4efc-43ae-a477-9d1670d4217d.png)](https://www.epicweb.dev/talks/the-epic-stack)

More of a reader? Read [the announcement post](https://epicweb.dev/epic-stack)
or
[an AI generated summary of the video](https://www.summarize.tech/www.youtube.com/watch?v=yMK5SVRASxM).

This stack is still under active development. Documentation will rapidly improve
in the coming weeks. Stay tuned!

# Top Pages

- [Getting Started](./getting-started.md) - Instructions for how to get started
  with the Epic Stack.
- [Features](./features.md) - List of features the Epic Stack provides out of
  the box.
- [Deployment](./deployment.md) - If you skip the deployment step when starting
  your app, these are the manual steps you can follow to get things up and
  running.
- [Decisions](./decisions/README.md) - The reasoning behind various decisions
  made for the Epic Stack. A good historical record.
- [Guiding Principles](./guiding-principles.md) - The guiding principles behind
  the Epic Stack.
- [Examples](./examples.md) - Examples of the Epic Stack with various tools.
  Most new feature requests people have for the Epic Stack start as examples
  before being integrated into the framework.
- [Managing Updates](./managing-updates.md) - How to manage updates to the Epic
  Stack for both the generated stack code as well as npm dependencies.
