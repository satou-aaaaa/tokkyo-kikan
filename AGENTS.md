# AGENTS.md

特許は何年？：特許・実用新案・意匠・商標の場面を見て、期間（30日・2か月・3か月・6か月・1年・1年6か月・3年・10年・20年・25年の10）を当てる1日5問の学習ゲーム。正解したら、どの法律の決まりか（特許法・商標法・実用新案法と意匠法）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（19種類×3000問：選び肢・答えは1つ・答えと2段目と条が別に書いた表どおり）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は e-Gov 法令検索の特許法・実用新案法・意匠法・商標法に書いてある期間だけ（2026-11-18 に読んだ）。種類を足すときも条文を読み、`qa/run.mjs` の `TB`（別に書いた表：種類 → 答えの期間・2段目・条）にも足す。法改正で期間が変わったら条文を読み直す。
- 出願の書き方・料金の額・審査の中身・期間の延長や救済の細目は出さない。弁理士試験の対策の代わりにしない。著作権のきほん（chosakuken）とは重ねない。期間は種類ごとに1つなので、まちがいの選び肢から外す組（`NEVER`）は今は無い。
- 公式の情報の代わりにしない：遊び方と「このゲームについて」と README に、条文を言いかえた文であること・実際は特許庁の案内や弁理士に確かめることを置く（QA が見る）。
- 問題は、やさしいが選び肢3つ（まぎらわしい期間 `near` を入れない）、ふつうが4つ、むずかしいが4つ（`near` を1つ必ず入れる。20年と25年、1年と1年6か月、2か月と3か月など）。2回目のヒントはまちがいを消して2つにしぼり、条文の言葉（`key`）も見せる。2段目は「どの法律の決まり？」（3つ）で、条文の法律で決まる（種類ごとの `grp`）。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「どの法律の決まり？」・復習（1→3→7日後）。記録 `tkk-v1`・文字 `tkk-fs`・復習 `tkk-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は 免許は何歳から？（menkyo-nenrei。その元は 駐車禁止は何m？・届け出いつまで？・危険物の類あて・用途地域あて・岩石なかま分け・SDGsの目標あて・震度よみ）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
