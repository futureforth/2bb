# Two Boobs and a Baby — podcast archive

Plain static site. No build step.

```
index.html
styles.css
script.js        ← episode list lives here
assets/album-art.png
press/*.pdf      ← media clippings
images/          ← add: then.jpg, now.jpg, clip-usatoday.jpg, clip-globe.jpg, clip-jacksonsun.jpg
audio/           ← add: 2BB-01.mp3 … 2BB-50.mp3, 2BB-brief.mp3
```

## Deploy (GitHub → Cloudflare Pages)
1. Create a GitHub repo and push the contents of this folder to it.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset: **None**. Build command: *(leave empty)*. Output directory: **/** 
4. Deploy, then add your custom domain (e.g. twoboobsandababy.com) under Custom domains.

## Audio note
Cloudflare Pages caps single files at 25 MB and GitHub warns over 50 MB. Most episodes at 64–128 kbps fit.
If any are larger, put the MP3s in a Cloudflare R2 bucket (or archive.org) and change the
`audio:` path in `script.js` to the full URL, e.g. `"https://media.example.com/2BB-" + id + ".mp3"`.
