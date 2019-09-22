# Alorg Games

A [nextjs](https://nextjs.org) app connected to a [Firebase]() database to maintain a list of games I'm currently playing, excited to play, have stoped playing or have beaten.

Just a small way to make something for myself!

[View the site](https://games.alorg.net).

### Running locally

Requires node `v10.14.2` so just use [nvm](https://github.com/nvm-sh/nvm) to `nvm install` and then `nvm use`.

```bash
$ nvm use
$ yarn # or npm install
$ yarn dev # or npm run dev
```

☝️will start the dev server on port `3000`.

### Secrets

Since this app needs to connect to firebase and giantbomb (for admin stuff), you need to have api keys. Create a `secrets.json` file at the root of the project with the structure:

```json
{
  "firebase": {
    "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": ""
  },
  "giantbomb": {
    "apiKey": ""
  }
}
```

Obviously with the fields filled in.
