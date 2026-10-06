# Two Boobs and a Baby — archive site

Static site (no build step), deployed GitHub → Cloudflare Pages. Hosts: Heather & Dave Delaney. Podcast ran Oct 2005 – Oct 2008.

## Files
- `index.html` — home: About, Episodes, Where Are They Now, press sidebar
- `extras.html` + `extras.js` — Extras page; edit the `EXTRAS` array
- `script.js` — episodes load live from archive.org item `2-bb-50`, played with Plyr. `YEARS` map holds release years.
- `styles.css` — shared styles for both pages
- `press/` — clippings (USA Today, Globe and Mail, Jackson Sun PDFs, Yahoo! Podcasts screenshot)
- `images/` — then.jpg, now.jpg, clip-*.jpg

## Style rules
- Old-school mid-2000s look, red is the main color: #c8161d / #b5121a / #6e0d12, yellow highlight #ffe14d / #fff6c9.
- Verdana body, Georgia headings, Courier New for codes/times.
- Don't change existing content, links or images unless asked.
- Keep the same header/nav/footer markup on every page; the nav includes an Extras tab.

## Open tasks
1. **Episode dates + show notes.** Pull the old WordPress feeds from the Wayback Machine (use the `id_` raw form):
   - https://web.archive.org/web/20060901113005id_/http://www.davemadethis.com/twoboobs/wp-rss2.php
   - Find later captures: https://web.archive.org/web/*/davemadethis.com/twoboobs/wp-rss2.php and https://web.archive.org/web/*/twoboobsandababy.com/twoboobs/wp-rss2.php
   - Merge items, match to episodes by number in the title, then add a `DATES` (full date) and `NOTES` map in `script.js`. Show the date in the Year column (e.g. "Oct 12, 2005") and show notes under the title.
2. **Yahoo! Podcasts series page** — https://web.archive.org/web/20060816013314/http://podcasts.yahoo.com/series?s=1435097545b5d67b73e298b8126b44f5 — grab any listener reviews/rating; add 1–3 short quotes to the sidebar.
3. **Old blog** — https://web.archive.org/web/20060811115641/http://www.twoboobsandababy.com/twoboobs/index.php — optional "Blog" page with dated non-episode posts, styled like the Extras page.
4. Unknown years for episodes 46, 47, 48, 50 — fill from feeds if found.
