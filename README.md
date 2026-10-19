# Plumbline website

The Plumbline landing page: one static page (`index.html`), a link-preview image (`og.png`) and nothing to build.
It is hosted free on GitHub Pages.

| Section | Claims | In the product |
|---|---|---|
| Hero, What it catches | Likely cause on alerts, false completions, the watcher, the CI eval gate | alerts, `run.*` metrics, `plumbline eval run` |
| Human in the loop | Policies decide when an agent hands over; people told at once; service levels; the agent gets the decision | `docs/escalations.md` |
| Accountability | Post-mortems written from the records; a hash-chained, signed audit trail; the opt-in benchmark (five-organisation minimum); MCP | `docs/postmortems.md`, `docs/audit.md`, `docs/benchmark.md`, `docs/mcp.md` |
| How it works | SDKs, OpenTelemetry or MCP; the dashboard's Connect page; more than 50 measures (57 built in) | `plumbline metrics` |
| Voice agents | Call quality out of 100 with flagged moments; reply waits and dead air; early hang-ups, transfers, frustrated callers | `docs/voice.md` |
| Pricing | Which plan includes escalation, post-mortems, audit export and call quality | a business decision, not the product: edit freely |
