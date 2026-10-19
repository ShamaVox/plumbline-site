# Plumbline website

The Plumbline landing page: one static page (`index.html`), a link-preview image (`og.png`) and nothing to build.
It is hosted free on GitHub Pages.

## Put it online (about 5 minutes)

1. On GitHub, create a new **public** repository, for example `plumbline-site`. Keep it separate from the Plumbline
   code: GitHub Pages is free only for public repositories, and the product code can stay private.
2. Upload the files in this folder (`index.html`, `og.png`, `.nojekyll`, `README.md` and the `media` folder) to the repository, or push them.
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

## Before you share the link: where the buttons go

Every "Become a design partner" button needs somewhere to send people. Near the bottom of `index.html`, set at least
one of these (the first one set wins):

```js
const SIGNUP_URL = "https://tally.so/r/your-form-id";      // a form: name, work email, company, what the agent does
const CONTACT_EMAIL = "you@yourdomain.com";               // opens an email with the subject and questions filled in
const CONTACT_URL = "https://www.linkedin.com/in/you/";   // or your X profile, for a direct message
```

Until one is set, the buttons say "Early access opens soon" rather than leading nowhere. With a form and an email or
profile both set, the design-partner box also offers the quicker route ("Rather just write?").

**Link previews** already point at `https://shamavox.github.io/plumbline-site` (the `og:` and `twitter:` tags at the
top). If the address changes, change them too. LinkedIn's Post Inspector (linkedin.com/post-inspector) refreshes a
cached preview; X and Discord pick up changes within a day.

## The demo video

`media/plumbline-demo.mp4` (720p, about 9 MB, captions in the picture) plays in the "See it work" section, with
`media/plumbline-demo-poster.jpg` shown until someone presses play. Nothing loads until then, so the page stays fast.
To replace it, keep the same file names, or change the `<video>` element in `index.html`. GitHub rejects files over
100 MB; keep the video well under that.

## When you buy a domain

1. Add a file named `CNAME` containing just the domain, for example `plumbline.dev`.
2. At your domain registrar, add the DNS records GitHub lists under **Settings → Pages → Custom domain**: a `CNAME`
   record to `<your-username>.github.io` for a subdomain such as `www`, or four `A` records for the bare domain.
3. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS** once the certificate is issued.
4. Update the `og:url`, `og:image`, `twitter:image` and `canonical` addresses in `index.html` to the new domain.

## Pricing

During the beta the page shows no prices: design partners use Plumbline free through the pilot, plans will be priced
by runs rather than seats, with a free tier and self-hosting, and design partners keep a founding discount. Put the
plans back in the `id="pricing"` section once the beta has shown what teams will pay; the earlier price table is in
this repository's git history.

## What the page says, and where it comes from

Every claim on the page is something Plumbline 0.6 does. When the product changes, change the page with it:

| Section | Claims | In the product |
|---|---|---|
| Hero, What it catches | Likely cause on alerts, false completions, the watcher, the CI eval gate | alerts, `run.*` metrics, `plumbline eval run` |
| Human in the loop | Policies decide when an agent hands over; people told at once; service levels; the agent gets the decision | `docs/escalations.md` |
| Accountability | Post-mortems written from the records; a hash-chained, signed audit trail; the opt-in benchmark (five-organisation minimum); MCP | `docs/postmortems.md`, `docs/audit.md`, `docs/benchmark.md`, `docs/mcp.md` |
| How it works | SDKs, OpenTelemetry or MCP; the dashboard's Connect page; more than 50 measures (57 built in) | `plumbline metrics` |
| Voice agents | Call quality out of 100 with flagged moments; reply waits and dead air; early hang-ups, transfers, frustrated callers | `docs/voice.md` |
| Pricing | Free during the beta; priced by runs, not seats, later | a business decision, not the product: edit freely |
| Why I built it, Design partners | The founder's own account and offer | yours: edit freely |

The example escalation, alert and watcher note are labelled as examples. Keep any figures you add true to what
Plumbline actually does.

## Editing

Everything is in `index.html`: copy, colors (the tokens at the top of the `<style>` block) and sections. The page
follows the visitor's light or dark setting and has no build step. The product code stays in its own private
repository; this site repository is public only because GitHub Pages is free for public repositories.
