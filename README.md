# Plumbline

Quality monitoring for AI agents in production.

Plumbline catches the failures that never throw an error: an agent reporting "done" when the job wasn't done, quality
drifting for weeks, and risky actions nobody approved. When quality slips, it tells your team in Slack or email and
names the likely cause. When an agent shouldn't act alone, it asks a person and hands the agent their decision. And it
blocks regressions in CI before they ship.

**Website and 2-minute demo:** https://shamavox.github.io/plumbline-site/

**Source:** https://github.com/shamavox/plumbline (self-host it free; see its LICENSING.md)

**Design partners:** I'm working with 2–3 teams running agents in production: a longer free pilot, help with setup,
and a real say in the roadmap. [Apply here](https://forms.gle/v61cAjbzKYTn7Ci59).

Built by [Shama Keskar](https://www.linkedin.com/in/shamakeskar/).

---

This repository holds the website only. Plumbline itself is developed in a separate repository.
