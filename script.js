// Edit this list to add/rename episodes. Audio files go in /audio named 2BB-<id>.mp3
const EPISODES = [
  ["01","In the beginning…","26:46"],["02","Son Coming Soon!","17:14"],["03","Introducing Sam Delaney!","21:29"],
  ["04","The “Holiday” Show","25:27"],["05","Three Months Old","28:17"],["06","One a week, one a week, one a week","25:45"],
  ["07","Back from Arizona and New York","22:14"],["08","Sam Gets His Pictures","23:27"],["09","Brought To You By The Letter T","27:52"],
  ["10","Tearing up at Pigeon Break","23:32"],["11","Sam’s 5th month of fun","28:25"],["12","Our Big Surprise is Revealed","26:08"],
  ["13","Lucky 13","28:12"],["14","Sam’s New Phase","26:00"],["15","The Week of Mishaps and Exhaustion","28:21"],
  ["16","Discover the gender of our new cast member!","29:43"],["17","The A-Team Episode","34:25"],["18","Our New Name is…","32:20"],
  ["19","Brinkster Blogging Blues","25:13"],["20","Canada Day & Podcasters Across Borders","22:34"],["21","Sleepless Sam Screams","28:18"],
  ["22","Tootbrain","26:56"],["23","Tennessee or Bust","21:26"],["26","Virus and Colds - 13 minutes of pure gold!","13:05"],
  ["28","The Ella Show","15:50"],["32","Twas the night before Christmas…","13:22"],["33","Troubles at the border","21:12"],
  ["34","Oh Oh","26:47"],["35","Alternadad Contest","22:32"],["37","Urban Baby Runway Contest","23:32"],
  ["brief","Not Episode 38","2:09"],["39","Happy Belated St. Patrick’s Day","28:11"],["45","Jam packed with poo","27:53"],
  ["47","Warning: This Episode...","4:38"],["48","Easter Eggs","4:50"],["50","From the Deck on Father's Day","24:01"]
].map(([id, title, duration]) => ({ id, title, duration, code: "2BB-" + id, audio: "audio/2BB-" + id + ".mp3" }));

const AUTO_ADVANCE = true;
const list = document.getElementById("ep-list");
const audio = new Audio();
audio.preload = "none";
let current = null;

const fmt = s => { if (!isFinite(s)) return "0:00"; s = Math.floor(s); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

document.getElementById("ep-count").textContent = EPISODES.length + " episodes in the vault";

list.innerHTML = EPISODES.map((e, i) => `
  <div class="ep" data-i="${i}">
    <div class="ep-grid">
      <button class="play" aria-label="Play ${esc(e.code)}">
        <svg class="i-play" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="margin-left:2px"><path d="M6 3v18l15-9z"/></svg>
        <svg class="i-pause" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16"/><rect x="14" y="4" width="5" height="16"/></svg>
      </button>
      <span class="code">${esc(e.code)}</span>
      <span class="title">${esc(e.title)}</span>
      <span class="dur">${e.duration}</span>
    </div>
    <div class="progress-row"><span></span><div class="bar"><div class="fill"></div></div><span class="time">0:00 / ${e.duration}</span></div>
    <div class="missing">Audio coming soon.</div>
  </div>`).join("");

const rowEl = i => list.children[i];

function select(i) {
  if (current !== null) rowEl(current).classList.remove("current", "playing", "no-audio");
  current = i;
  const row = rowEl(i);
  row.classList.add("current");
  row.querySelector(".fill").style.width = "0";
  audio.src = EPISODES[i].audio;
  audio.play().catch(() => {});
}

list.addEventListener("click", ev => {
  const row = ev.target.closest(".ep");
  if (!row) return;
  const i = +row.dataset.i;
  if (ev.target.closest(".play")) {
    if (i === current && !row.classList.contains("no-audio")) audio.paused ? audio.play() : audio.pause();
    else select(i);
  } else if (ev.target.closest(".bar") && i === current && audio.duration) {
    const r = ev.target.closest(".bar").getBoundingClientRect();
    audio.currentTime = (ev.clientX - r.left) / r.width * audio.duration;
  }
});

audio.addEventListener("play", () => current !== null && rowEl(current).classList.add("playing"));
audio.addEventListener("pause", () => current !== null && rowEl(current).classList.remove("playing"));
audio.addEventListener("timeupdate", () => {
  if (current === null) return;
  const row = rowEl(current), d = audio.duration;
  row.querySelector(".fill").style.width = d ? (audio.currentTime / d * 100) + "%" : "0";
  row.querySelector(".time").textContent = fmt(audio.currentTime) + " / " + (d ? fmt(d) : EPISODES[current].duration);
});
audio.addEventListener("error", () => {
  if (current === null || !audio.getAttribute("src")) return;
  rowEl(current).classList.remove("playing");
  rowEl(current).classList.add("no-audio");
});
audio.addEventListener("ended", () => { if (AUTO_ADVANCE && current < EPISODES.length - 1) select(current + 1); });
