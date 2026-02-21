---
title: Hello World
description: A sample blog post to test the blog collection and verify all rendered elements.
pubDate: 2026-02-21
draft: true
---

This is a sample blog post to test how all markdown elements render. It won't appear in production builds because `draft` is set to `true`.

## Headings

### Third level

#### Fourth level

## Text formatting

This is a paragraph with **bold text**, *italic text*, and `inline code`. You can also combine them: ***bold and italic***.

Here's a [link to GitHub](https://github.com/jetersen) to check link styling.

## Code blocks

A Zig snippet:

```zig
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, {s}!\n", .{"world"});
}
```

Some YAML for a Kubernetes deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world
  labels:
    app: hello-world
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello-world
  template:
    spec:
      containers:
        - name: app
          image: ghcr.io/jetersen/hello-world:latest
          ports:
            - containerPort: 8080
```

And a shell session:

```bash
kubectl apply -f deployment.yaml
kubectl get pods -w
```

## Lists

Unordered:

- .NET and C# for backend services
- Zig for systems programming
- Rust when safety matters
- Niri as a Wayland compositor

Ordered:

1. Write the code
2. Push to main
3. Let CI/CD handle the rest
4. Sleep peacefully

## Blockquotes

> Infrastructure as code isn't just a practice — it's a mindset. If you can't reproduce it from a commit, it doesn't exist.

## Tables

| Tool | Purpose | Status |
|------|---------|--------|
| Kubernetes | Orchestration | Daily driver |
| Home Assistant | Home automation | Tinkering |
| Niri | Window manager | Exploring |
| Zig | Systems language | Learning |

## Horizontal rule

---

## Images

No images in this sample, but they would render here with standard markdown syntax.

## Nested lists

- DevOps practices
  - CI/CD pipelines
  - Infrastructure as Code
  - Monitoring and observability
- Languages
  - Compiled
    - Rust
    - Zig
    - C#
  - Scripting
    - Fish shell
    - Python

That covers most markdown elements. If something looks off, the prose styles in `global.css` need adjusting.
