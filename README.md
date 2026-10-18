# Plumbline website

The Plumbline landing page: one static page (`index.html`), a link-preview image (`og.png`) and nothing to build.
It is hosted free on GitHub Pages.

## Put it online (about 5 minutes)

1. On GitHub, create a new **public** repository, for example `plumbline-site`. Keep it separate from the Plumbline
   code: GitHub Pages is free only for public repositories, and the product code can stay private.
2. Upload the files in this folder (`index.html`, `og.png`, `.nojekyll`, `README.md`) to the repository, or push them.
   `.nojekyll` is an empty file that tells GitHub Pages to serve the files as they are:

   ```bash
   cd plumbline-site
   git init && git add . && git commit -m "Plumbline website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/plumbline-site.git
   git push -u origin main
   ```

3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**,
   branch `main`, folder `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/plumbline-site/`.

## Two things to set before you share the link

**Link previews.** In `index.html`, replace both `SITE_URL` with the address from step 4, without a trailing slash
(for example `https://shama.github.io/plumbline-site`). LinkedIn, Slack and X then show the title, description and
`og.png` when the link is shared. LinkedIn's Post Inspector (linkedin.com/post-inspector) refreshes its cached preview.

**Early access form.** The "Request early access" buttons need somewhere to send people. Create a free form (Tally,
Google Forms or Typeform) asking for name, work email, company and what the agent does. Then, near the bottom of
`index.html`, set:

```js
const SIGNUP_URL = "https://tally.so/r/your-form-id";
```

Until it is set, the buttons say "Early access opens soon" rather than leading nowhere.

## When you buy a domain

1. Add a file named `CNAME` containing just the domain, for example `plumbline.dev`.
2. At your domain registrar, add the DNS records GitHub lists under **Settings → Pages → Custom domain**: a `CNAME`
   record to `<your-username>.github.io` for a subdomain such as `www`, or four `A` records for the bare domain.
3. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS** once the certificate is issued.
4. Update `SITE_URL` in `index.html` to the new domain.

## Pricing

The pricing section lists the four plans, the rates beyond each plan, the 14-day trial of Startup and Growth, and the
founding-customer offer (50% off for 12 months for the first 10 paying teams). Design partners' longer free period is
mentioned without a length: agree it with each partner. To change a price, edit the
`id="pricing"` section in `index.html`; nothing else depends on it.

## What the page says, and where it comes from

Every claim on the page is something Plumbline 0.6 does. When the product changes, change the page with it:

| Section | Claims | In the product |
|---|---|---|
| Hero, What it catches | Likely cause on alerts, false completions, the watcher, the CI eval gate | alerts, `run.*` metrics, `plumbline eval run` |
| Human in the loop | Policies decide when an agent hands over; people told at once; service levels; the agent gets the decision | `docs/escalations.md` |
| Accountability | Post-mortems written from the records; a hash-chained, signed audit trail; the opt-in benchmark (five-organisation minimum); MCP | `docs/postmortems.md`, `docs/audit.md`, `docs/benchmark.md`, `docs/mcp.md` |
| How it works | SDKs, OpenTelemetry or MCP; the dashboard's Connect page; more than 50 measures (57 built in) | `plumbline metrics` |
| Voice agents | Call quality out of 100 with flagged moments; reply waits and dead air; early hang-ups, transfers, frustrated callers | `docs/voice.md` |
| Pricing | Which plan includes escalation, post-mortems, audit export and call quality | a business decision, not the product: edit freely |

The example escalation, alert and watcher note are labelled as examples. Keep any figures you add true to what
Plumbline actually does.

## Editing

Everything is in `index.html`: copy, colors (the tokens at the top of the `<style>` block) and sections. The page
follows the visitor's light or dark setting and has no build step. The product code stays in its own private
repository; this site repository is public only because GitHub Pages is free for public repositories.
