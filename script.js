// Episodes load live from the Internet Archive item below and play with Plyr.
const ARCHIVE_ITEM = "2-bb-50";

// Release years from each MP3's original ID3 tag. 23 and 42–44 are inferred from neighbouring episodes.
const YEARS = {
  "2BB1":2005,"2BB2":2005,"2BB3":2005,"2BB4":2005,
  "2BB5":2006,"2BB6":2006,"2BB7":2006,"2BB8":2006,"2BB9":2006,"2BB10":2006,"2BB11":2006,"2BB12":2006,"2BB13":2006,
  "2BB14":2006,"2BB15":2006,"2BB16":2006,"2BB17":2006,"2BB18":2006,"2BB19":2006,"2BB20":2006,"2BB21":2006,"2BB22":2006,
  "2BB23":2006,"2BB24":2006,"2BB25":2006,"2BB26":2006,"2BB27":2006,"2BB28":2006,"2BB29":2006,"2BB30":2006,"2BB31":2006,"2BB32":2006,
  "2BB33":2007,"2BB34":2007,"2BB35":2007,"2BB36":2007,"2BB37":2007,"2BB38a":2007,"2BB38b":2007,"2BB39":2007,"2BB40":2007,
  "2BB41":2007,"2BB42":2007,"2BB43":2007,"2BB44":2007,"2BB45":2007,
  "2BB50":2008
};

// Full release dates and show notes for episodes 1–21, from the podcast.net directory listing
// (Wayback Machine capture, Jul 16, 2006). Episode 5's listed date was a placeholder, so it keeps its year only.
const DATES = {
  "2BB1":"Oct 16, 2005","2BB2":"Oct 25, 2005","2BB3":"Dec 1, 2005","2BB4":"Dec 24, 2005",
  "2BB6":"Feb 5, 2006","2BB7":"Feb 20, 2006","2BB8":"Feb 28, 2006","2BB9":"Mar 9, 2006","2BB10":"Mar 21, 2006",
  "2BB11":"Mar 27, 2006","2BB12":"Apr 10, 2006","2BB13":"Apr 24, 2006","2BB14":"May 2, 2006","2BB15":"May 9, 2006",
  "2BB16":"May 18, 2006","2BB17":"Jun 1, 2006","2BB18":"Jun 9, 2006","2BB19":"Jun 29, 2006","2BB20":"Jul 2, 2006","2BB21":"Jul 11, 2006"
};
const NOTES = {
  "2BB1":"Welcome to Two Boobs and a Baby.",
  "2BB2":"Here it is… Episode 2! Today is our due date… will Sam join us?",
  "2BB3":"Introducing Sam Delaney!",
  "2BB4":"The “Holiday” Show.",
  "2BB5":"Number five is alive!",
  "2BB6":"Well, we did it. We managed to produce another podcast in the course of one week! Can you believe it? We can’t!",
  "2BB7":"Last week Heather and Sam were basking in the sun in Arizona. I was basking in the snow in New York. We’re back and Episode 7 is ready to rock!",
  "2BB8":"Sam gets his photos made, shots and his first fever – all this and more in Episode 8!",
  "2BB9":"Tonight’s episode of Two Boobs and a Baby is brought to you by the letter “T”.",
  "2BB10":"Tearing up at Pigeon Break.",
  "2BB11":"Sam’s 5th month of fun!",
  "2BB12":"Our big surprise is revealed!",
  "2BB14":"Hear all about Sam’s six month check-up, being pregnant again, and Dave & Heather’s hot date!",
  "2BB15":"Surrounded by chaos and sleepiness… we’re back!",
  "2BB16":"Mother’s Day, Running Late, Nasty card, Designer Mums vs. Frazzled Mums, Dave’s bad back, New Toys, Pregnancy Update, French Fries, and The Sex of Baby #2!",
  "2BB17":"The A-Team, and other things…",
  "2BB18":"Find out what our new show name is.",
  "2BB19":"We’re in the June issue of Here’s How magazine! Plus: Our 5th anniversary, Dave’s getaway, Sam’s insomnia, and massages.",
  "2BB20":"Happy Canada Day! It’s Podcasters Across Borders, and more.",
  "2BB21":"Sam attempts an escape from his bed, rainy day advice, fast cars and HOT women! All this and more!"
};

const epList = document.getElementById("ep-list");
const epCount = document.getElementById("ep-count");
const players = [];

const formatTime = s => {
  s = parseFloat(s);
  if (!s || isNaN(s)) return "--:--";
  return Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
};
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

fetch(`https://archive.org/metadata/${ARCHIVE_ITEM}`)
  .then(r => r.json())
  .then(data => {
    const mp3s = data.files.filter(f => f.name.toLowerCase().endsWith(".mp3"));
    mp3s.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));

    epCount.textContent = `${mp3s.length} episodes in the vault`;

    epList.innerHTML = mp3s.map(file => {
      const raw = file.name.replace(/\.[^/.]+$/, "");
      const isBonus = /bonus/i.test(raw);
      const num = isBonus ? "Bonus" : raw.replace(/^2BB/i, "");
      const title = file.title || raw;
      const url = `https://archive.org/download/${ARCHIVE_ITEM}/${encodeURIComponent(file.name)}`;
      return `
        <div class="ep">
          <div class="ep-grid">
            <span class="ep-play"><audio class="plyr-player" preload="none" controls><source src="${url}" type="audio/mpeg"></audio></span>
            <span class="code">${isBonus ? "BONUS" : "2BB-" + esc(num)}</span>
            <span class="year">${DATES[raw] || YEARS[raw] || "—"}</span>
            <span class="title" title="${esc(title)}">${esc(title)}</span>
            <span class="dur">${formatTime(file.length)}</span>
            ${NOTES[raw] ? `<span class="ep-notes">${esc(NOTES[raw])}</span>` : ""}
          </div>
        </div>`;
    }).join("");

    epList.querySelectorAll(".plyr-player").forEach(el => {
      const row = el.closest(".ep");
      if (typeof Plyr === "undefined") { players.push(el); return; } // native <audio> fallback
      const p = new Plyr(el, {
        controls: ["play", "progress", "current-time"],
        iconUrl: "https://cdn.plyr.io/3.7.8/plyr.svg",
        invertTime: false
      });
      p.on("play", () => {
        players.forEach(o => o !== p && o.pause());
        epList.querySelectorAll(".ep.current").forEach(r => r.classList.remove("current"));
        row.classList.add("current");
      });
      players.push(p);
    });
  })
  .catch(err => {
    console.error("Failed to load archive metadata:", err);
    epCount.textContent = "Archive unavailable";
    epList.innerHTML = `<div class="ep-loading">Couldn't reach the Internet Archive. Try again in a bit — or <a href="https://archive.org/details/${ARCHIVE_ITEM}" target="_blank" rel="noopener">listen on archive.org</a>.</div>`;
  });
