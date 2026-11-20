# Updating the upstream version

The `go-quai` image is built from `Dockerfile`, which clones [dominant-strategies/go-quai](https://github.com/dominant-strategies/go-quai) at a pinned tag, checks that the tag resolves to the pinned commit, and compiles it.

## Determining the upstream version

- Latest release tag:
  ```sh
  gh release view -R dominant-strategies/go-quai --json tagName -q .tagName
  ```
- Current pin: `goQuaiVersion` in `startos/utils.ts`, passed to the build as `GO_QUAI_VERSION` from `startos/manifest/index.ts`.

## Applying the bump

1. Set `goQuaiVersion` in `startos/utils.ts` to the new tag, keeping the leading `v`.
2. Set `GO_QUAI_COMMIT` in `Dockerfile` to the commit the tag points to (the build fails if they differ):

   ```sh
   git ls-remote https://github.com/dominant-strategies/go-quai.git 'refs/tags/<tag>' 'refs/tags/<tag>^{}'
   ```

   Take the `^{}` line's hash when there is one (an annotated tag), otherwise the tag's own.

3. Set `version` in `startos/versions/current.ts` to `<tag without v>:0` and rewrite the release notes.
4. Diff the flags and endpoints this package relies on between the old and new tag:

   ```sh
   git diff <old-tag> <new-tag> -- cmd/utils/flags.go stratum/ node/health.go
   ```

   Check the stratum `*-addr` flags, the `--rpc.health` response shape, and the Go version in `go.mod` — move the builder image in `Dockerfile` with it.
