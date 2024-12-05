---
title: Memory Management
summary: "Configuration and management of memory allocation in Epic Stack applications"
featured: false
date: 2024-03-20
image: /blog-images/headers/memory-management.png
ogImage: /blog-images/headers/memory-management.png
imageAlt: Memory Management
imageDisableOverlay: true
authors:
  - Dony Alior
---

# Memory

Epic Stack apps start with a single instance with 256MB of memory. This is a
pretty small amount of memory, but it's enough to get started with. To help
avoid memory pressure even at that scale, we allocate a 512MB swap file. Learn
more about this decision in
[the memory swap decision document](decisions/010-memory-swap.md).

To modify or increase the swap file, check `.swap_size_mb` in `fly.toml`. This
file is executed before running our app within the `litefs.yml` config.

> **NOTE**: PRs welcome to document how to determine the effectiveness of the
> swap file for your app.

To increase the memory allocated to your vm, use the
[`fly scale`](https://fly.io/docs/flyctl/scale-memory/) command. You can
[learn more about memory sizing in the Fly docs](https://fly.io/docs/machines/guides-examples/machine-sizing).
