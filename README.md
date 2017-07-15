# uncontext-poet

a little webapp that takes a source text and random data fed via websocket (formerly from [uncontext](https://github.com/ThisIsJohnBrown/uncontext), which now appears to be defunct 😿) and composes a new text, based on a user-defined "algorithm"

## TODO

- [ ] get a new data source (uncontext is no more)
- [ ] make line break logic configurable
- [x] error handling / display current algorithm and its result
- [x] scrub malicious HTML
- [ ] ability to pause/resume on `/display/*` view
- [ ] ability to save (and view) generated texts (should have parity with "source texts")
- [x] styling: flexbox
- [ ] styling: account for smaller viewports
- [ ] allow arbitrary websocket data sources
