// Episodes stream from Google Drive. Each file must be shared as "Anyone with the link can view".
// Format: [code, Drive file ID, title, duration]
const EPISODES = [
  ["Bonus","1-ANg_DdSF92zkHWzS_NSYLRZ8l_nYDwj","Bonus episode",""],
  ["01","1DXDpGesuVNdJ_nrpmvxxznnfLtMuH1Ju","In the beginning…","26:46"],
  ["02","1ZGWkk0m28aYZ72SpR33Vq9H9S61jbKGA","Son Coming Soon!","17:14"],
  ["03","16dl-60eAfj8XiGAWnKVcpDGh8E8uVb4O","Introducing Sam Delaney!","21:29"],
  ["04","1imToe91pGVmibMKbUFG5lttKxMjaqHu_","The “Holiday” Show","25:27"],
  ["05","1b4VHl1tnsRubp4ICAL_IW2sOINAeZkPQ","Three Months Old","28:17"],
  ["06","1C-_kX7BSaTec57FqKYoqGUp959TpOv08","One a week, one a week, one a week","25:45"],
  ["07","1WADn2hOa8bT8jPF0Od_NCOeQJg6Dr_Q_","Back from Arizona and New York","22:14"],
  ["08","1lfVHBrVB3MwuXC20HIIojiJNgGldHdyL","Sam Gets His Pictures","23:27"],
  ["09","1fjFu3NjdpN75iYI35p12Zl-qxZbtAXSW","Brought To You By The Letter T","27:52"],
  ["10","1aF1rNWJzlqMg9JZgifO2NOtztCSyIivE","Tearing up at Pigeon Break","23:32"],
  ["11","1b43zJsCmvmOV8eb5PlWqqu58nQ0ty-vJ","Sam’s 5th month of fun","28:25"],
  ["12","1-OSGgG7IhYOuNrsrJlP9i5SIPqs8LMip","Our Big Surprise is Revealed","26:08"],
  ["13","1QhXrpIBpi0t20t9sgY30N4CiBS5OFR9g","Lucky 13","28:12"],
  ["14","1KDyUPdQQFCagsuXZDE68VnMbxt7LaUQr","Sam’s New Phase","26:00"],
  ["15","1Nnq6ao7rgb6QAez1sXivb9bz01F1nzuW","The Week of Mishaps and Exhaustion","28:21"],
  ["16","1SN0DtajgdPhb9eOaPDl4MFMQpHa6728X","Discover the gender of our new cast member!","29:43"],
  ["17","1960-F-IVIMD7kbn4WCQlsT8L2WN0K81B","The A-Team Episode","34:25"],
  ["18","1Dnk34uhYnQUNupZdwwHha02IxjhzQdqH","Our New Name is…","32:20"],
  ["19","1V4Dvtz8nnbpyKKktPoRmQtk6t2WS7pCz","Brinkster Blogging Blues","25:13"],
  ["20","1czyyRfJxHK1Jl9TDNmNGopRn_kfC0K-J","Canada Day & Podcasters Across Borders","22:34"],
  ["21","1mEIsOnSTwb4f67tKEayoMBtqo5OHgevR","Sleepless Sam Screams","28:18"],
  ["22","1NyiZtrgufNapA-svLEQxPjNIv2lJ24AW","Tootbrain","26:56"],
  ["23","122IZZLiD2HlRRWqqf7xhqh6iLpdZ7MPg","Tennessee or Bust","21:26"],
  ["24","15Ws8cZussG9pz94rNgZBrRp20i3b3POb","Episode 24",""],
  ["25","1ANMPe1Ixc0XvpQsCrcHJd_PtZAWqjr40","Episode 25",""],
  ["26","1F9nm4fm3sq2GH4Gw8wH5b39bbgbTwA6a","Virus and Colds - 13 minutes of pure gold!","13:05"],
  ["27","11YcUt2TzG4xTmpRt9VbO0Vga-OMAGnoK","Episode 27",""],
  ["28","1wtNuYRjl2-0iz2m9RM4zMWfSitVWImWE","The Ella Show","15:50"],
  ["29","1_PXa0bE18xTuqFRPMlp33jbh-vZ1lFL2","Episode 29",""],
  ["30","19NQpJG1jL4sXgI7kgvnac-SwUYT7gAz4","Episode 30",""],
  ["31","1Olq2XtC2HiuVeDqGLOCAP2HkWZbqoypK","Episode 31",""],
  ["32","1mLoQn-DBHgP8K97lVQAEziYynSrWcNYJ","Twas the night before Christmas…","13:22"],
  ["33","1Tdu2OvamLEWUR8hTgqu8YY34FOgdnkjK","Troubles at the border","21:12"],
  ["34","1LdicdpqCLFQ4CXD5kK2RwJdsyATbnum7","Oh Oh","26:47"],
  ["35","141PlYwpg70-Q2MUpEsyyTZC2AcRE4knq","Alternadad Contest","22:32"],
  ["36","1_S09zrz3gGCrCQQkqZkzktoATj-R9hj7","Episode 36",""],
  ["37","1_2QuPJKpfYD9q5muzBXRkf7yyc2HK6hY","Urban Baby Runway Contest","23:32"],
  ["38a","1FankOAKTLpkVPBTqNteCk77Z3_aXDGpj","Episode 38, part A",""],
  ["38b","1MJwLRG0PuwOwNBzfatXSg8MwFleGsFGF","Episode 38, part B",""],
  ["39","1FJBtuqFhgd-Lde-VCzRMFPtCrYPc4SwM","Happy Belated St. Patrick’s Day","28:11"],
  ["40","18UyZwvISVsiW145S5WLVzn1w7-xf-Pg8","Episode 40",""],
  ["41","1g9jJ5nz_Fu3QlAjFJQ0iTjRG0cwkf7XY","Episode 41",""],
  ["42","1Vj5tPgXPInX5o_QsjrXWCNJICW370-0I","Episode 42",""],
  ["43","1C47CYS5QPiEzdW16hTQVXkfSAqLxSbW1","Episode 43",""],
  ["44","17ZVkQKf5JJEl4JPRWCb6e6RFZAMfdf5v","Episode 44",""],
  ["45","12G6T_wO8G_R8jkIsNur0y5AuKco1-bYG","Jam packed with poo","27:53"],
  ["46","1DHkrtoHBrjIM3obI05i-aQ0yyX41S8Z_","Episode 46",""],
  ["47","1XOEagZ_gavRIktp4AM6ev26_Wdjdybfo","Warning: This Episode...","4:38"],
  ["48","1AosEnREv93VbDaDiGhOG4KGBiJGtXpAC","Easter Eggs","4:50"]
].map(([n, drive, title, duration]) => ({ drive, title, duration, code: n === "Bonus" ? "BONUS" : "2BB-" + n }));

const list = document.getElementById("ep-list");
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
let current = null;

document.getElementById("ep-count").textContent = EPISODES.length + " episodes in the vault";

list.innerHTML = EPISODES.map((e, i) => `
  <div class="ep" data-i="${i}">
    <div class="ep-grid">
      <button class="play" aria-label="Play ${esc(e.code)}" aria-expanded="false">
        <svg class="i-play" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="margin-left:2px"><path d="M6 3v18l15-9z"/></svg>
        <svg class="i-pause" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5h14v14H5z"/></svg>
      </button>
      <span class="code">${esc(e.code)}</span>
      <span class="title">${esc(e.title)}</span>
      <span class="dur">${e.duration}</span>
    </div>
    <div class="player"></div>
  </div>`).join("");

const rowEl = i => list.children[i];

function close(i) {
  const row = rowEl(i);
  row.classList.remove("current", "playing");
  row.querySelector(".play").setAttribute("aria-expanded", "false");
  row.querySelector(".player").innerHTML = ""; // removing the iframe stops playback
}

function open(i) {
  const row = rowEl(i), e = EPISODES[i];
  row.classList.add("current", "playing");
  row.querySelector(".play").setAttribute("aria-expanded", "true");
  row.querySelector(".player").innerHTML =
    `<iframe src="https://drive.google.com/file/d/${e.drive}/preview" title="${esc(e.code)} audio player" allow="autoplay" loading="lazy"></iframe>
     <a class="dl" href="https://drive.google.com/file/d/${e.drive}/view" target="_blank" rel="noopener">Open in Google Drive ↗</a>`;
}

list.addEventListener("click", ev => {
  const btn = ev.target.closest(".play");
  if (!btn) return;
  const i = +btn.closest(".ep").dataset.i;
  if (current !== null) close(current);
  if (current === i) { current = null; return; }
  current = i;
  open(i);
});
