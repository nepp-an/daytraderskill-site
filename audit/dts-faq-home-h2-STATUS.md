# STATUS — 五页 Short FAQ 近重复清理 + 首页四周 H2 改为短入口

- 时间（UTC）：2026-11-10T12:16:18Z
- 仓库：`/workspace/cf-migrate/daytraderskill-site`
- 分支：`main`
- 基线：`b202fa979c85c192740ab9c5a36a34e94c3fd8e3`（`b202fa9`，工作树干净；`git fetch` 后本地 `main` 与 `origin/main` 相差 0/0）
- 运行时源码改动：仅 `app/page.tsx`、`lib/skills.ts`（`git diff --numstat`：`1/1` 与 `14/42`）。
- 未执行：Cloudflare 直传（原因见第 8 节）、GSC、IndexNow、扩词、付费、清缓存、实连券商、模拟器重跑、E7 改动。

## 1. 机制与改法

`app/skills/[slug]/page.tsx` 仍是：

```ts
const allFaq = [...skill.faq, ...guide.faq];
```

本轮采用最小改法：**从 `lib/skills.ts` 删除已迁到 `lib/skillGuides.ts` 的重复短项**，保留指南版更完整的答案。没有改 `allFaq` 拼接机制，没有改步骤、示例数字、失败边界、Related、Title/H1，也没有重写指南版 FAQ 文案。删除后 `skills.ts` 中对应页为 `faq: []`，渲染 FAQ 全部来自指南版；五页最终各 3 条，均可对到已核上游或本页已通过正文。

## 2. 五页 FAQ 前后

“清理前”取自指定生产快照 `/workspace/verify-1110/dts-skills-independent-1908/html/{news,exit,risk,analyst,pelosi}.html`（2026-11-10 19:10:40–42 Asia/Shanghai），并与基线源码一致；“清理后”取自本轮本地构建 `out/skills/{slug}/index.html`。顺序为页面实际渲染顺序。

### news（`/skills/news/`）

- 清理前（4）：① Is this insider information?（短版）② Why were the SEC filings skipped? ③ Is this insider information?（指南版）④ Can it run every 15 minutes?
- 删除：短版 ①（“public headlines and public filings only.”）。
- 清理后（3）：① Why were the SEC filings skipped? ② Is this insider information? ③ Can it run every 15 minutes?
- 保留的实质内容：SEC_USER_AGENT / `trader/config.json` 缺失时跳过申报并显示提示；`/loop 15m /trader-news`、30 天去重；公开标题与公开 SEC 申报，标题可能错误/过期/付费墙。

### exit（`/skills/exit/`）

- 清理前（4）：① Does exit guarantee my max loss?（短版）② Can I move my stop further away once the trade is on? ③ Why is the default target 2R but the reel uses 1R? ④ Does the plan guarantee my maximum loss?（指南版）
- 删除：短版 ①。
- 清理后（3）：① Can I move my stop further away once the trade is on? ② Why is the default target 2R but the reel uses 1R? ③ Does the plan guarantee my maximum loss?
- 保留的实质内容：永不把止损向远离入场方向移动；默认 2R，1R / 1.5R / price:X 是不同计划；计划止损处的亏损不等于保证最大亏损（滑点、跳空、快速市场）。

### risk（`/skills/risk/`）

- 清理前（4）：① Can I override a BLOCK in chat?（短版）② Can I override a BLOCK in chat?（指南版）③ Why did a market order get blocked after the price moved? ④ Does a PASS mean the trade is safe?
- 删除：短版 ①。
- 清理后（3）：① Can I override a BLOCK in chat? ② Why did a market order get blocked after the price moved? ③ Does a PASS mean the trade is safe?
- 保留的实质内容：改自己的限额是风险决定；技能不会为通过而改单或放宽限额；市价单按“计划入场与 15 分钟内新鲜价格的较高者”计量；PASS 只是符合已配置限额，不是安全或盈利保证。

### analyst（`/skills/analyst/`）

- 清理前（4）：① Does analyst predict the post-earnings move?（短版）② Does the analyst predict the post-earnings move?（指南版）③ Why is gross margin blank for a bank? ④ Where does the next earnings date come from?
- 删除：短版 ①。
- 清理后（3）：① Does the analyst predict the post-earnings move? ② Why is gross margin blank for a bank? ③ Where does the next earnings date come from?
- 保留的实质内容：只汇总营收/利润率/净利/EPS 同比与 TTM，不预测盘后走势，止损不保护隔夜跳空；银行/保险没有通常意义的毛利率，留空而非填零；下一个财报日不来自 SEC 数据。

### pelosi（`/skills/pelosi/`）

- 清理前（4）：① Why is it named Pelosi?（短版）② Is this insider information? ③ Why is the skill named Pelosi?（指南版）④ Can it read Senate reports automatically?
- 删除：短版 ①。
- 清理后（3）：① Is this insider information? ② Why is the skill named Pelosi? ③ Can it read Senate reports automatically?
- 保留的实质内容：读 STOCK Act 公开 PTR，申报可晚于成交最多 45 天；名字不是背书、不暗示非公开信息；Senate efdsearch 需用户本人接受协议，技能不自动点击。

### 上游对点（只读已核文件）

- `trader-news_SKILL_md` 第 41、42、76 行：SEC_USER_AGENT 缺失则跳过申报；30 天去重；`/loop 15m /trader-news`。
- `trader-exit_SKILL_md` 第 23、64、111 行：止损是计划不是保证；默认 2R，1R/1.5R/price:X；永不移远止损。
- `trader-risk_SKILL_md` 第 84–85、152、159 行：市价单取计划入场与 15 分钟内新鲜价格的较高者；PASS 不是 yes；不改单不放宽限额。
- `trader-analyst_SKILL_md` 第 8、50、69 行：同比 + TTM；下一个财报日来自新闻/IR 而非 SEC；银行毛利率留空。
- `trader-pelosi_SKILL_md` 第 25、120–126、142 行：最多 45 天；Senate 协议由本人接受；不自动化协议或登录。

## 3. 另外两页的同页拼接重复（只去重，未重写）

在检查全部 11 个构建产物时，发现 `entry`、`alerts` 也因同一拼接机制出现同页近重复。按授权“若有，只去同页重复并在 STATUS 写明”，仅删除 `skills.ts` 的短版，未改指南、步骤、数字或 Related。

### entry（`/skills/entry/`）

- 清理前（4）：① Can entry auto-submit orders?（短版）② Does “TRIGGERED” mean I should buy? ③ Why does a wick above the range not count? ④ Can the watcher place the order when it triggers?（指南版）
- 删除：短版 ①。
- 清理后（3）：① Does “TRIGGERED” mean I should buy? ② Why does a wick above the range not count? ③ Can the watcher place the order when it triggers?
- 上游对点：`trader-entry_SKILL_md` 第 10–11、130–132 行：只写 `entry.json`、从不下单，也不从后台运行 broker。

### alerts（`/skills/alerts/`）

- 清理前（4）：① Can alerts place the exit for me?（短版）② Will the alert sell my position when the stop is hit?（指南版）③ Why did the price cross my level but no alert ring? ④ Does “flat by close” move on an early-close day?
- 删除：短版 ①。
- 清理后（3）：① Will the alert sell my position when the stop is hit? ② Why did the price cross my level but no alert ring? ③ Does “flat by close” move on an early-close day?
- 上游对点：`trader-alerts_SKILL_md` 第 134、148 行：平仓走 broker/risk/yes；alerts 从不下单、撤单或改单。

其余 4 个 skill（scanner / timemachine / budget / broker）的 FAQ 源码未动，构建产物中也未发现同页重复题。

## 4. 首页同名四周 H2

只改 `app/page.tsx` 的一个 H2：

- before：`<h2 id="plan-heading">Your first four weeks on paper</h2>`
- after：`<h2 id="plan-heading">Start with the four-week paper plan</h2>`

- 保留 `id="plan-heading"` 与 `aria-labelledby="plan-heading"`。
- 保留指向 `/learn/how-to-start-day-trading/` 的明确链接（“Open the four-week plan on the how-to-start roadmap”）。
- 保留 beginners / paper-trading / tools / safety 入口卡；未新增路由、未改 slug、未改首页枢纽定位。
- 首页未迁回 Week 1–4 完整表；只在导语保留 “The full Week 1–4 schedule now lives on the how-to-start roadmap…” 的指针说明。
- `app/learn/how-to-start-day-trading/page.tsx` 未动；该页 H2 仍是 `Your first four weeks on paper`，完整四周表（Week 1–4 四行）仍在。

## 5. 构建与本地构建产物验证

- `npm run build`：**PASS**（Next.js 14.2.35；静态导出完成，含 11 个 skill 详情页）。
- `npm run test:paper`：**8/8 PASS**（`tests 8`、`pass 8`、`fail 0`、`cancelled 0`）。
- `git diff --check`：**PASS**（exit 0，无空白错误）。
- 构建产物 `out/skills/*/index.html` 抽检：11 页的可见 FAQ 题均无同页重复；FAQ JSON-LD 条目数与可见条目一致。计数：scanner 5；broker / budget / timemachine 4；news / exit / risk / analyst / pelosi / entry / alerts 各 3。
- 五页清理后可见题（与第 2 节一致）：
  - news：SEC filings skipped；insider information；every 15 minutes。
  - exit：move stop further away；2R vs reel 1R；plan guarantee max loss。
  - risk：override BLOCK；market order after price moved；PASS safety。
  - analyst：predict post-earnings move；gross margin bank；next earnings date。
  - pelosi：insider information；named Pelosi；read Senate automatically。
- 首页构建产物：`id="plan-heading"` 的 H2 为 `Start with the four-week paper plan`；how-to 构建产物同名 H2 仍为 `Your first four weeks on paper`。
- **边界：** 以上均为本地 `out/` 文本层检查，不是生产浏览器验收，也不是 T9 UI 验收。

## 6. 未改保护项

运行时源码 diff 只有 `app/page.tsx`（1 行 H2）和 `lib/skills.ts`（删 7 个短 FAQ 项，含 5 个主项 + 2 个同机制附带项）。以下均无源码改动：

- 模拟器引擎、`lib/paper-simulator/**`、T9 文案、`#platform-limits` 平台表、Lori 职衔。
- 广告 GA `G-CFQ8JV652G`、AdSense `ca-pub-3175943774981621`、`public/ads.txt`。
- `app/privacy/`、`next.config.mjs`、全部 slug、paper 页 Title/H1 主词定位、作者资料、联盟方案、排名观察。
- 11 个 skill 的步骤/示例数字/失败边界/Related/Title/H1；scanner / timemachine / budget / broker 的 FAQ。
- `app/learn/how-to-start-day-trading/page.tsx` 的完整四周 H2 与日程。
- E7 未触碰。

构建产物保护抽检（本地 `out/` 文本层）：

- `/paper-trading/`：Title 仍含 `day trading simulator`；H1 为 `A day trading simulator for practice, not live trading`；`#platform-limits` 仍在；指定 T9 句静态出现 2 次；Lori `Assistance` 在、`Advocacy` 0 次；GA/AdSense 标记仍在。
- `out/ads.txt` 仍为 `google.com, pub-3175943774981621, DIRECT, f08c47fec0942fa0`。
- `/learn/how-to-start-day-trading/`：完整四周表仍在，Week 1–4 四行齐全。
- `/safety/`、`/vs/`、`/install/`、`/install/troubleshoot/`：GA/AdSense 标记仍在；源码无 diff。

## 7. 提交与推送

- 单一新 commit（不 amend），采用建议消息：`fix(content): dedupe five skill FAQs and retitle home four-week doorway`。
- `git push origin main`：提交后尝试；若本环境无 GitHub 凭据，则保留干净 commit 给外层 push，不使用 force，不改写已推送历史。
- 本 STATUS 与代码在同一新 commit 中，因此不写入自身 commit SHA。

## 8. Cloudflare Pages 直传状态

- 本机存在 `wrangler 4.156.2`，但 `wrangler whoami` 返回 **not authenticated**；无 `CLOUDFLARE_API_TOKEN` 等环境变量，无 Pages 项目配置/项目名。未执行 `wrangler pages deploy`，也没有用临时账号或猜项目名的方式 invent 部署。
- 因此本轮**没有**做 Cloudflare 直传，也没有第二次部署；`out/` 与干净 commit 留给外层执行一次 Pages 直传/发布。

## 9. 验收边界

- 未重新访问生产、未跑生产 curl/浏览器、未做 GSC/IndexNow、未实连券商、未重跑模拟器 UI。
- “清理前”问题列表来自指定生产快照；“清理后”来自本地构建产物。未把本地构建验证写成生产已上线。
- 未编造实连结果、胜率、上游未出现的命令或数字；保留的答案均为清理前已存在、且能对到已核上游或本页已通过正文的文案。
