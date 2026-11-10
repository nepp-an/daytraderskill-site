# STATUS — beginner-path.svg 无源亏损统计句修正

- 时间（UTC）：2026-11-10T11:27:02Z
- 仓库：`/workspace/cf-migrate/daytraderskill-site`
- 分支：`main`
- 基线：`7238105f71bb21bdf7a4cbb4e56d1fa77d38bf49`（`7238105`，工作树干净）
- 改动范围：仅 `public/illustrations/beginner-path.svg` 第 51 行；`audit/` 为本批证据文件。

## 1. 改了哪一行

第 51 行是可见页脚文字（非注释、非 hidden；`fill="#6f8398"`，`y=294`）。仅替换无源统计断言，保留 `Illustration only · no market data` 前缀，不新增数字或亏损率：

before:

```text
  <text x="32" y="294" fill="#6f8398" font-size="11">Illustration only · no market data · most people who day trade lose money</text>
```

after:

```text
  <text x="32" y="294" fill="#6f8398" font-size="11">Illustration only · no market data · a study sequence, not a performance promise</text>
```

未改 `viewBox`、四阶段图形/阶段文字、标题「Learn the loop before adding money」、颜色、`<title>`/`<desc>`、引用页 tsx、alt、figcaption。

## 2. SHA 前后

| 项 | SHA-256 | 字节 |
| --- | --- | --- |
| before `public/illustrations/beginner-path.svg` | `a713ab8c7eba98acd9ba97c27e1f96d0dd72d6127736172b5ccb0edfe367c6e2` | 3061 |
| after `public/illustrations/beginner-path.svg` | `57f39150d6bb66a9a6d278cbe5d76f02a2d2589b50816bd5bc2961f4e118d0d1` | 3068 |

- 原 SVG 副本：`audit/beginner-path-original.svg`，与基线 HEAD 字节一致。
- 新 SVG 副本：`audit/beginner-path-fixed.svg`，与修正后工作树字节一致。
- 一行 before/after 与逐项 SHA 另存于 `audit/dts-beginner-path-svg-EVIDENCE.txt`。

## 3. build / test:paper

- `npm run build`：**PASS**。Next.js 14.2.35，Compiled successfully，35/35 static pages generated。
- `npm run test:paper`：**8/8 PASS**。`tests 8`、`pass 8`、`fail 0`、`cancelled 0`。

## 4. 保护回归

提交前 `git diff --numstat` 只有 `1 1 public/illustrations/beginner-path.svg`；`git status` 无其他已跟踪文件改动。以下均无 diff：

- `components/PaperSimulator.tsx`、`lib/paper-simulator/`、`components/PaperJournal.tsx`、`app/paper-trading/`
- T9 警示句、账本、按钮、默认值（随上述文件整体未动）
- `next.config.mjs`、`public/ads.txt`、`app/privacy/`、`app/layout.tsx`、`lib/site.ts`
- 11 个 skill / install / safety / vs 页面源码
- `app/learn/day-trading-for-beginners/page.tsx` 及其 alt / figcaption

`audit/` 仅新增本批证据文件，不进入运行时代码。

## 5. out 证据

- `out/illustrations/beginner-path.svg`：3068 B，SHA-256 `57f39150d6bb66a9a6d278cbe5d76f02a2d2589b50816bd5bc2961f4e118d0d1`，与 `public` 版本 `cmp` 完全一致。
- `out/learn/day-trading-for-beginners/index.html`：仍引用 `/illustrations/beginner-path.svg`（2 处）；`<img>` 的 alt 与 figcaption 未变；可见正文及内联 RSC 数据均不含 `most people who day trade lose money`。
- 对 `public/illustrations/beginner-path.svg`、`out/illustrations/beginner-path.svg`、`out/learn/day-trading-for-beginners/index.html` 做大小写不敏感 grep，目标句均 **ABSENT**。
- 未做 Cloudflare 直传；按要求由外层处理 `out/`。

## 6. 提交与推送

- 单一新 commit，建议并采用：`fix(content): remove unsourced loss-rate claim from beginner-path illustration`
- `git push origin main`：交付时尝试。若本机无凭据，则保留干净的本地 commit；不使用 force，不 amend/reset/rebase 已推送历史。

## 7. 验收边界

- 本 STATUS 只记录本机执行的 build、test:paper、文件哈希与 grep 检查。
- `/workspace/verify-1110/dts-skills-independent-1908/REPORT.md` 与其中独立下载的 SVG 是任务输入/既有独立核验，不作为我的测试结果。
- 未运行浏览器验收；不声称浏览器或他人独立验收结果。
