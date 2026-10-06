// Episodes load live from the Internet Archive item below and play with Plyr.
const ARCHIVE_ITEM = "2-bb-50";

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
            <span class="title" title="${esc(title)}">${esc(title)}</span>
            <span class="dur">${formatTime(file.length)}</span>
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
