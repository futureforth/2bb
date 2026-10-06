# Two Boobs and a Baby — archive site

Static site (no build step), deployed GitHub → Cloudflare Pages. Hosts: Heather & Dave Delaney. Podcast ran Oct 2005 – Oct 2008.

## Files
- `index.html` — home: About, Episodes, Where Are They Now, press sidebar
- `extras.html` + `extras.js` — Extras page; edit the `EXTRAS` array
- `blog.html` + `blog.js` — Blog page; `POSTS` (old blog posts, newest first) and `THREADS` (forum threads). Posts without a `body` show as headline + date only.
- `script.js` — episodes load live from archive.org item `2-bb-50`, played with Plyr. `YEARS` map holds release years.
- `styles.css` — shared styles for both pages
- `press/` — clippings (USA Today, Globe and Mail, Jackson Sun PDFs, Yahoo! Podcasts screenshot)
- `images/` — then.jpg, now.jpg, clip-*.jpg

## Style rules
- Old-school mid-2000s look, red is the main color: #c8161d / #b5121a / #6e0d12, yellow highlight #ffe14d / #fff6c9.
- Verdana body, Georgia headings, Courier New for codes/times.
- Don't change existing content, links or images unless asked.
- Keep the same header/nav/footer markup on every page; the nav includes Blog and Extras tabs.

## Open tasks
1. **Episode dates + show notes.** Pull the old WordPress feeds from the Wayback Machine (use the `id_` raw form):
   - https://web.archive.org/web/20060901113005id_/http://www.davemadethis.com/twoboobs/wp-rss2.php
   - Find later captures: https://web.archive.org/web/*/davemadethis.com/twoboobs/wp-rss2.php and https://web.archive.org/web/*/twoboobsandababy.com/twoboobs/wp-rss2.php
   - Merge items, match to episodes by number in the title, then add a `DATES` (full date) and `NOTES` map in `script.js`. Show the date in the Year column (e.g. "Oct 12, 2005") and show notes under the title.
2. **Yahoo! Podcasts series page** — https://web.archive.org/web/20060816013314/http://podcasts.yahoo.com/series?s=1435097545b5d67b73e298b8126b44f5 — grab any listener reviews/rating; add 1–3 short quotes to the sidebar.
3. **Old blog** — https://web.archive.org/web/20060811115641/http://www.twoboobsandababy.com/twoboobs/index.php — optional "Blog" page with dated non-episode posts, styled like the Extras page.
4. Unknown years for episodes 46, 47, 48, 50 — fill from feeds if found.

## Done (Oct 2026)
- `DATES` + `NOTES` in `script.js` now cover episodes 1–48 (podcast.net listing for 1–21, old WordPress feed for 5 and 22–48). Long notes render in a collapsed "Show notes" toggle.
- Still unknown: dates/notes for 49 and 50 (not in the feed, which ends Jun 16, 2008); which of 38a/38b is the "V.2.0" post (date is on both, notes on 38b).
- Sidebar: listener shoutouts from the Frappr map; press adds Here's How! (June 2006) and paved.ca (Nov 2, 2005). Extras: forum and Podcast Pickle screenshots.
- Blog page built: 98 posts, 30 with full text transcribed from Wayback screenshots (Mar–Aug 2006, Sep 2006, Jan 2007, Jun–Jul 2007), the rest headline + date from the feed. To add a post's text, give it a `body` array in `blog.js`.
- Episode notes for 9, 10, 11, 20, 21, 22 include the "What we yammered on about" timecode lists.
- Dates are accurate to within a day or so: the old blog, the feed and podcast.net each used a different clock.
