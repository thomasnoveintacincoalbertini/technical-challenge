# Documents

A small React Native (Expo) app that lists documents, shows real-time
notifications when other users create documents, and lets you add new ones.

## Features

- List and grid views of the documents
- Real-time notifications over a WebSocket (bell badge + in-app banner + list)
- Add a new document (name, version, file)
- Sort, pull-to-refresh, relative dates ("1 day ago"), share on long-press

## Run it

You need the testing server running first (from the challenge's sample repo, needs Go):

```bash
go run server.go            # http://localhost:8080
```

Then the app:

```bash
yarn install
yarn ios                    # or: yarn android
```

The API URL defaults to `http://localhost:8080`. To point elsewhere (e.g. a
physical device), set an env var — nothing is hard-coded:

```bash
EXPO_PUBLIC_API_BASE_URL=http://<IP>:8080 yarn ios
```

## Tests

```bash
yarn test
```

## Notes

- Documents come from `GET /documents`; notifications from the
  `ws://localhost:8080/notifications` socket (auto-reconnects if dropped).
- The mock server doesn't persist writes, so a new document is POSTed and then
  added locally so it shows up right away (also works offline).
- No database or ORM — data comes straight from the API.

## Libraries

Each third-party library and why it's here (with the alternative I weighed):

- **`axios`** – HTTP requests. Considered the built-in `fetch`, which would also
  work, but axios lets me configure one instance (base URL, timeout, JSON
  handling) in a single place and is trivial to mock in tests. Small and worth it.
- **`expo-document-picker`** – native file picker for the "Choose file" field.
  Considered `expo-image-picker` (images only) — too narrow, since the field
  should accept any file. This is the managed, cross-platform option with no
  native setup.
- **`react-native-safe-area-context`** – safe-area insets (notch, home bar).
  Considered React Native's built-in `SafeAreaView`, but it's deprecated and
  iOS-only; this is the Expo-recommended standard, works on both platforms and
  gives per-edge control (used to keep the status-bar area white).
- **`@expo/vector-icons`** – icons matching the mockups. Considered hand-rolled
  SVGs via `react-native-svg` — more code for no benefit. This ships with Expo,
  needs no bundler config, and covers every glyph used (bell, list/grid, sort,
  file, users, link).
- **`jest-expo` + `@testing-library/react-native`** – tests. Considered plain
  Jest with `react-test-renderer` directly, but `jest-expo` wires up the RN/Expo
  transform for me, and Testing Library encourages asserting on what the user
  sees rather than component internals.

For relative dates ("1 day ago") I deliberately avoided a date library
(`dayjs`/`date-fns`/`moment`) — it's a tiny hand-written helper, so no dependency.
