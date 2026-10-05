# Two Boobs and a Baby — podcast archive

Plain static site. No build step.

```
index.html
styles.css
script.js        ← episode list + Google Drive file IDs live here
assets/album-art.png
press/*.pdf      ← media clippings
images/          ← add: then.jpg, now.jpg, clip-usatoday.jpg, clip-globe.jpg, clip-jacksonsun.jpg
```

## Deploy (GitHub → Cloudflare Pages)
1. Create a GitHub repo and push the contents of this folder to it.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset: **None**. Build command: *(leave empty)*. Output directory: **/** 
4. Deploy, then add your custom domain (e.g. twoboobsandababy.com) under Custom domains.

## Audio
Episodes play from Google Drive. Every MP3 must be shared as **Anyone with the link → Viewer**,
or the embedded player shows a sign-in / access error. To add or fix an episode, edit the
`EPISODES` list at the top of `script.js` (`[code, driveFileId, title, duration]`).
