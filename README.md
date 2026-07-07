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

- `axios` – HTTP requests
- `expo-document-picker` – file picker for the "Choose file" field
- `react-native-safe-area-context` – safe-area insets
- `@expo/vector-icons` – icons
- `jest-expo` + `@testing-library/react-native` – tests
