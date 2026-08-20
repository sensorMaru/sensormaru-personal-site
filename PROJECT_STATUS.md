# 项目交接状态

更新时间：2026-08-20

当前分支：`main`

发布状态：本阶段改动已推送到 GitHub，并由现有 Cloudflare Pages 流程发布到 `https://sensormaru.com/`。本阶段功能提交基线为 `1be5e9b Add treadmill workstation AI project`。

## 当前目标

保持个人网站生产版本稳定，确保六个个人项目按确认顺序展示，其中两个 AI 宣传片项目仅展示详情视频，不提供“访问项目”入口。

当前项目顺序：

`Global Design Award Museum -> 可视化埋点事件地图 -> 360 Screenshot -> 园区招商前沿动态推送平台 -> 宠物移动净化器AI宣传片 -> Treadmill Workstation AI宣传片`

桌面端前三个项目位于第一行，后三个项目依次位于第二行第一至第三列；移动端按相同数据顺序单列展示。

## 已完成内容

- 新增 `园区招商前沿动态推送平台`，包含指定封面、三张详情轮播图及 `https://park.sensormaru.com/` 访问入口。
- 新增 `宠物移动净化器AI宣传片`，包含指定封面和详情 MP4；名称与介绍已更新为最终文案。
- 新增 `Treadmill Workstation AI宣传片`，包含指定封面和详情 MP4，位于桌面端第二行第三列。
- 两个 AI 宣传片项目均未配置 URL，卡片和详情弹窗不显示“访问项目”。
- 补齐新增项目的中英文名称、介绍、背景、核心功能和图片替代文本。
- 修正共享详情弹窗在无 URL 项目中残留访问链接的问题。
- 扩展内容校验，锁定项目顺序、最终文案、媒体路径、双语内容和无链接行为。
- 已将 `main` 推送到 `https://github.com/sensorMaru/sensormaru-personal-site.git`，并确认生产站已更新。

## 关键技术决策

- 项目卡片顺序继续由 `src/content/projects.ts` 的数组顺序驱动 CSS Grid，不为单张卡片写专用行列坐标。
- `ProjectItem.url` 为可选字段；无 URL 项目不使用空链接或占位链接。
- 卡片层条件渲染外链；共享详情弹窗在无 URL 时同时设置 `hidden` 并移除 `href`，防止复用弹窗残留上一个项目的地址。
- 宣传片复用现有 `detailVideo` 数据结构、原生视频控件和弹窗生命周期，不新增专用页面或组件。
- 图片替代文本通过现有语言状态和 `data-i18n-alt-zh` / `data-i18n-alt-en` 切换。
- 关键项目内容和展示约束集中写入 `scripts/validate-content.ts`，避免后续调整数组或模板时静默回归。

## 修改过的核心文件

- `src/content/projects.ts`：新增园区、宠物净化器和 Treadmill Workstation 项目数据，维护最终顺序和双语文案。
- `src/components/ProjectCard.astro`：根据 URL 条件渲染卡片外链，并输出双语图片替代文本。
- `src/components/SiteNav.astro`：语言切换时同步更新图片 `alt`。
- `src/pages/index.astro`：渲染项目详情轮播/视频，并处理无 URL 项目的详情入口。
- `src/styles/global.css`：维持三列项目网格，并确保带 `hidden` 的详情入口不可见。
- `scripts/validate-content.ts`：校验项目顺序、文案、媒体、双语字段和链接行为。
- `public/project-images/park-investment-intelligence.png`、`public/project-detail-images/park-investment-intelligence-*.png`：园区项目媒体。
- `public/project-images/pet-mobile-air-purifier-aigc-film.png`、`public/project-videos/pet-mobile-air-purifier-aigc-film.mp4`：宠物净化器项目媒体。
- `public/project-images/treadmill-workstation-ai-film.png`、`public/project-videos/treadmill-workstation-ai-film.mp4`：Treadmill Workstation 项目媒体。
- `PROJECT_STATUS.md`：本交接文档。

## 测试与验证结果

2026-08-20 最终验证：

- `npm run validate:content` 通过。
- `npm run build` 通过，Astro 成功生成静态首页。
- `git diff --check` 通过。
- GitHub `origin/main` 已包含功能提交 `1be5e9b`。
- `https://sensormaru.com/` 返回 HTTP 200，响应头确认由 Cloudflare 提供服务。
- 生产 HTML 已包含最终宠物项目文案和 `Treadmill Workstation AI宣传片`。
- 生产 HTML 中六个项目 slug 顺序与确认顺序一致。
- 两个 AI 宣传片卡片均使用详情触发按钮而非外链。
- 两个 AI 宣传片的封面和 MP4 生产地址均返回 HTTP 200，类型分别为 `image/png` 和 `video/mp4`。
- 本地浏览器回归已覆盖桌面端 `1280 x 720`、移动端 `393 x 852`、双语切换、详情视频播放与关闭复位、无链接项目入口隐藏，以及 `360 Screenshot` 外链回归。

## 已知问题

- 仓库尚无自动化浏览器 E2E；当前布局、交互和视频验证依赖内容校验、构建及人工浏览器回归。
- 两个宣传片 MP4 暂无独立 WebVTT 字幕或经确认的双语逐字稿。
- Treadmill Workstation 封面约 8.3 MB，两个宣传片视频各约 13 MB；生产可访问，但后续应评估移动网络下的加载体验后再决定压缩规格。

## 尝试过但失败的方案

- 仅给详情弹窗外链设置 HTML `hidden` 属性无法保证隐藏，因为 `.project-dialog-visit { display: inline-flex; }` 会覆盖浏览器默认样式。最终增加 `.project-dialog-visit[hidden] { display: none; }`，并将该约束加入内容校验。

## 下一步开发顺序

1. 为项目卡片顺序、详情弹窗、无 URL 行为、语言切换和视频关闭复位补充自动化浏览器 E2E。
2. 测量生产环境移动端首屏与详情视频加载性能，再按实际结果压缩 Treadmill Workstation 封面及宣传片视频。
3. 获得确认后的中英文逐字稿和时间轴后，为两个宣传片补充 WebVTT 字幕。
4. 后续新增项目时，继续通过 `src/content/projects.ts` 维护顺序，并同步扩展 `scripts/validate-content.ts`。
