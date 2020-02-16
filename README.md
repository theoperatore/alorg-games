# Alorg Games

A [nextjs](https://nextjs.org) app connected to a [Firebase]() database to maintain a list of games I'm currently playing, excited to play, have stoped playing or have beaten.

Just a small way to make something for myself!

[View the site](https://games.alorg.net).

### Running locally

Since there are some [Zeit Now]() secrets involved, it's easiest to use the [now cli](https://zeit.co/download) to run the local dev server.

Requires node `v12.16.0` so just use [nvm](https://github.com/nvm-sh/nvm) to `nvm install` and then `nvm use`.

```bash
$ nvm install # skip this if you already have 12.16.0 installed
$ nvm use
$ yarn # or npm install
$ now dev # use now to run the nextjs server to get read from the .env file
```

☝️will start the dev server on port `3000`.

### Secrets

Since this app needs to connect to firebase and giantbomb (for admin stuff), you need to have api keys. Add your giantbomb apikey to a `.env` file under the name `GB_TOKEN`, and add your firebase info to `lib/clientCredentials.ts`

If you want to deploy with `now`, then you'll need to add `gb-token` as a [now secret](https://zeit.co/docs/v2/build-step#adding-secrets). See [now.json](./now.json) in the root to see how the variables are being mapped.

# License

MIT
