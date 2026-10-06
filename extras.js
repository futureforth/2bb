// Add one entry per file in /extras.
// type: "audio" | "video" | "image" | "pdf" | "link"
const EXTRAS = [
  { file: "extras/2BB-theme%20song.mp3", type: "audio", title: "The Theme Song", summary: "The tune that kicked off every episode. Hum along — you know you remember it." },
  { file: "extras/2BB-brief.mp3", type: "audio", title: "Stay Tuned for BIG News", date: "Dec 1, 2006 · 4 min", summary: "A quick hello to tease big news coming next episode, plus a shout-out to the Scarborough Dude's Dicks n' Janes podcast. Dave has a shepherd's pie in the oven, and it will not beat his mum's." },
  { file: "extras/2BB-not38.mp3", type: "audio", title: "Not Episode 38", date: "Mar 15, 2007 · 2 min", summary: "Technical difficulties delay Episode 38 and the reveal of the Urban Baby Runway Contest winner. This is the apology, and the last call for entries." },
  { file: "extras/2BB-motel.mp3", type: "audio", title: "From a Motel in Mason, Ohio…", date: "2007 · 6 min", summary: "A road-trip dispatch recorded far from the kitchen table, in a motel room in Mason, Ohio." },
  { file: "extras/2BB-sick.mp3", type: "audio", title: "The Sick Show", date: "3 min", summary: "A short one recorded from the trenches of a household cold. Tissues not included." },
  { file: "extras/2BB-update.mp3", type: "audio", title: "A Quick Update", date: "1 min", summary: "A super-short check-in to let listeners know what's going on." },
  { file: "extras/2BB_GCPD.mp3", type: "audio", title: "GCPD", date: "4 min", summary: "A musical oddity from the 2BB vault." },
  { file: "extras/2BB-two-years-later.mp3", type: "audio", title: "Two Years Later", summary: "The boobs come back two years on to reflect on what changed, and what definitely didn't." },
  { file: "extras/2BB-conclusion.mp3", type: "audio", title: "The Conclusion", date: "7 min", summary: "The official farewell. Heather and Dave wrap up 2BB and thank everyone who listened along the way." },
  { file: "https://drive.google.com/file/d/1xzZgd6puTel2Kw_8gBUBDd9VjJBs1Q-v/view", drive: "1xzZgd6puTel2Kw_8gBUBDd9VjJBs1Q-v", type: "video", title: "Episode 49 (Video)", summary: "2BB on camera! The video edition of Episode 49." }
];

const list = document.getElementById("extras-list");
const count = document.getElementById("extras-count");
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const LABEL = { audio: "AUDIO", video: "VIDEO", image: "PHOTO", pdf: "PDF", link: "LINK" };

function media(x) {
  const src = esc(x.file);
  switch (x.type) {
    case "audio": return `<audio controls preload="none" src="${src}"></audio>`;
    case "video": if (x.drive) return `<div class="extra-video"><iframe src="https://drive.google.com/file/d/${esc(x.drive)}/preview" title="${esc(x.title)}" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe></div>`;
      return `<video controls preload="metadata" src="${src}"></video>`;
    case "image": return `<a href="${src}" target="_blank" rel="noopener" class="extra-thumb"><img src="${src}" alt="${esc(x.title)}" loading="lazy"></a>`;
    default: return "";
  }
}

if (!EXTRAS.length) {
  list.innerHTML = `<div class="ep-loading">Extras are on their way — check back soon!</div>`;
} else {
  count.textContent = EXTRAS.length + " goodies";
  list.innerHTML = EXTRAS.map(x => `
    <article class="extra">
      <div class="extra-head">
        <span class="extra-type">${LABEL[x.type] || "FILE"}</span>
        <h2 class="extra-title">${esc(x.title)}</h2>
        ${x.date ? `<span class="extra-date">${esc(x.date)}</span>` : ""}
      </div>
      <p>${esc(x.summary)}</p>
      ${media(x)}
      <a class="dl" href="${esc(x.file)}" target="_blank" rel="noopener">${x.drive ? "Open in Google Drive ↗" : x.type === "link" ? "Visit link ↗" : "Open / download ↗"}</a>
    </article>`).join("");
}
