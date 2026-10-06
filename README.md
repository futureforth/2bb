# Two Boobs and a Baby — podcast archive

Plain static site. No build step.

```
index.html
styles.css
script.js        ← loads episodes from archive.org
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
Episodes load live from the Internet Archive item `2-bb-50` (set at the top of `script.js`) and play
with the open-source Plyr player. Add or rename MP3s on archive.org and the list updates automatically.
