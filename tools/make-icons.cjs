// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、時計の輪と電球（発明の権利の期間）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <circle cx="50" cy="50" r="38" fill="none" stroke="#8fb8de" stroke-width="5"/>
      <path d="M50 12 L50 20 M88 50 L80 50 M50 88 L50 80 M12 50 L20 50" stroke="#8fb8de" stroke-width="4"/>
      <circle cx="50" cy="44" r="16" fill="#f6d77a"/><rect x="42" y="56" width="16" height="12" rx="3" fill="#f2a43a"/><rect x="44" y="70" width="12" height="4" rx="2" fill="#fffdf7"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
