# 项目交接状态

更新时间：2026-08-17  
当前分支：`main`  
当前仓库状态：工作区干净，`main...origin/main`

## 当前目标
把个人网站稳定部署到 `sensormaru.com`，并保留后续继续修改页面样式、经历展示、项目展示和联系信息的能力。

## 已完成内容
- 本地个人站已搭建完成，包含首页、关于、经历、项目、技能、联系等板块。
- 顶部已做成固定胶囊导航，左侧显示 `SZY / PM`，中间是 `关于 / 经历 / 项目 / 联系`，右侧是中英文切换和联系按钮。
- 项目区已支持卡片 + 弹窗详情的展示方式。
- 教育经历与实习经历已拆成两列并行时间线。
- 站点已推送到 GitHub 仓库 `sensorMaru/sensormaru-personal-site`，并在 Cloudflare 上完成 Worker 部署。
- 已补充 `public/.assetsignore`，解决了 Cloudflare `wrangler deploy` 阶段的缺失文件报错。

## 关键技术决策
- 站点使用 Astro 构建，当前本地配置保持静态站点输出。
- 页面视觉采用深色、暖中性色调，内容区宽屏展开，减少左右留白。
- 个人经历采用数据驱动渲染，内容集中在 `src/content/*.ts`，便于后续继续改文案而不改结构。
- Cloudflare 当前走 GitHub 仓库 + Worker 部署链路，域名由 Cloudflare 托管 DNS。
- 项目作品页用原生 `<dialog>` 做详情弹窗，避免引入额外依赖。

## 修改过的核心文件
- `src/pages/index.astro`：页面结构、弹窗逻辑、各板块拼装。
- `src/components/SiteNav.astro`：固定顶部胶囊导航和中英文切换。
- `src/components/Hero.astro`：首页首屏内容。
- `src/components/Timeline.astro`：教育 / 实习双栏时间线。
- `src/styles/global.css`：整体布局、配色、导航、时间线、弹窗等样式。
- `src/content/site.ts`：个人简介、联系方式、当前关注项。
- `src/content/experience.ts`：教育与实习经历数据。
- `src/content/projects.ts`：项目作品数据，当前包含 `design-award-meta-search`。
- `public/.assetsignore`：Cloudflare 部署所需占位文件。

## 测试与验证结果
- `npm run build` 已通过。
- `git push` 已成功将当前 `main` 推送到 GitHub。
- Cloudflare `wrangler deploy` 已成功完成部署，临时 Workers 地址可用。
- 远端仓库已确认存在 `main` 分支和首个提交。

## 已知问题
- `sensormaru.com` 目前仍未在公网完成 DNS 切换。
- 最近检查 `dig sensormaru.com NS +short` 仍返回 Spaceship 的 nameserver：
  - `launch1.spaceship.net.`
  - `launch2.spaceship.net.`
- 这表示 Cloudflare 侧配置已改，但 nameserver 传播还没完成，所以根域名当前还打不开。

## 尝试过但失败的方案
- 直接部署时曾报 `error occurred while fetching repository`，后来通过先把本地代码 `git push` 到 GitHub 解决。
- 重新部署时曾报 `Missing file or directory: public/.assetsignore`，后来补上该文件后解决。
- 在 nameserver 还没切换完成时尝试访问 `https://sensormaru.com`，结果超时，说明 DNS 还未生效。

## 下一步开发顺序
1. 继续等待 Cloudflare nameserver 传播完成。
2. 反复检查 `dig sensormaru.com NS +short`，直到输出 Cloudflare 的 nameserver。
3. 一旦解析切换完成，访问 `https://sensormaru.com` 验证站点是否正常。
4. 如果需要，再补 `www.sensormaru.com` 的重定向或附加记录。
5. 域名生效后继续做页面细化，例如顶部导航、经历区排版、项目区视觉和联系区样式。
