Render deployment steps

1. Push this repository to GitHub (or Git provider supported by Render).

2. In Render dashboard, create a new "Web Service" with these settings:
   - Environment: Node
   - Branch: main (or your chosen branch)
   - Build Command: `npm ci && npx prisma generate && npm run build`
   - Start Command: `npm run start`

3. Add the required environment variables in the Render service settings (do NOT commit these to git):
   - `DATABASE_URL` - connection string for your Postgres DB
   - `MERCADO_PAGO_ACCESS_TOKEN` - Mercado Pago access token (sandbox or production)
   - `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY` - Mercado Pago public key (optional but useful for client-side widgets)
   - `NEXT_PUBLIC_SITE_URL` - the public URL provided by Render (e.g. `https://your-service.onrender.com`)

4. If you use a managed Postgres on Render, set `DATABASE_URL` accordingly in the service's env vars.

5. Commit `render.yaml` to the repo (it contains placeholders). Update the `repo` field in `render.yaml` if you want Render to pick it up automatically.

6. After deployment, test the flow:
   - Open `/checkout` on the deployed URL.
   - Complete the form and click "Ir para o Pagamento". The app will create a Mercado Pago preference and redirect to the Mercado Pago checkout.
   - Mercado Pago will redirect back to `/checkout/success` or `/checkout/failure` or `/checkout/pending`.

Notes
- Keep production credentials secret; use Render's environment variable UI or the secret store.
- Ensure your `MERCADO_PAGO_ACCESS_TOKEN` is the correct environment (sandbox token for tests, production token for live payments).
- If you need webhooks to automatically update orders when payments change, configure Mercado Pago IPN/webhooks and create an API route to receive notifications.

Checklist final e boas práticas

- Do NOT commit `.env` with secrets. Use `.env.example` as a template (this repo contains `.env.example`).
- On Render, add the following environment variables (set them via the service UI or secrets):
   - `DATABASE_URL` (Postgres connection string)
   - `MERCADO_PAGO_ACCESS_TOKEN` (server-side secret)
   - `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY` (public key)
   - `NEXT_PUBLIC_SITE_URL` (deployed domain, e.g. https://my-app.onrender.com)
   - `NODE_ENV=production` (optional)

- Do NOT set `PORT` manually on Render — Render provides the port automatically and `start` uses `$PORT`.

- Migrations: Render will run `npx prisma migrate deploy` before start (configured in `render.yaml`). Verify your Postgres user can run migrations.

- Webhooks: After deploy, register the webhook URL in Mercado Pago pointing to:
   `https://<your-domain>/api/mercado-pago/webhook`

- Health check: optionally add a health-check path `/` or `/api/health` in the service settings.

Local test steps before pushing

```bash
# install deps and generate prisma client
npm ci
npx prisma generate

# apply migrations (against your local DB)
npx prisma migrate deploy

# build and run locally (example)
npm run build
PORT=3001 npm run start
```

If you want, I can remove secrets from `.env` and keep only non-sensitive local defaults, and add instructions to `.gitignore` to ensure `.env` is not committed.
