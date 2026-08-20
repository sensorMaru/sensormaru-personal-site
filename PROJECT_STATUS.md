# 项目交接状态

更新时间：2026-08-20

当前分支：`main`

当前状态：`Treadmill Workstation AI宣传片` 已完成本地实现、构建和浏览器回归；宠物净化器项目文案已同步更新。当前改动尚未推送到 GitHub 或发布到生产环境。

Git 基线：

- 远端基线：`6e3afce Fix personal project card order`
- 本轮提交：
  - `87a6ca8 docs: specify pet purifier AIGC project`
  - `23b7f88 docs: plan pet purifier AIGC project`
  - `1fe5015 Add pet purifier AIGC project`
  - `a014795 Fix hidden project dialog link`
  - `09bac4d Localize project image alt text`
  - `5d92100 docs: update pet purifier project status`

## 当前目标

在个人项目区域新增 `Treadmill Workstation AI宣传片`：

- 桌面端位于第二行第三列，紧跟宠物移动净化器项目。
- 使用指定电动升降桌产品图作为卡片封面，详情页展示指定 MP4 视频。
- 卡片与详情弹窗均不显示“访问项目”入口。
- 保持现有项目样式、双语切换、桌面三列和移动端单列行为。
- 将宠物项目名称改为 `宠物移动净化器AI宣传片`，介绍改为 `邦泽创科-一款自动巡航&回仓的宠物空气净化器`。

## 已完成内容

- 新增项目 slug：`treadmill-workstation-ai-film`。
- 写入已确认的中英文项目名称、介绍、背景和三项核心功能。
- 接入封面：
  `public/project-images/treadmill-workstation-ai-film.png`。
- 接入视频：
  `public/project-videos/treadmill-workstation-ai-film.mp4`。
- 项目详情复用宠物净化器项目的视频展示方式，包含原生播放控制、封面图和自动播放。
- 新项目不设置 URL，因此卡片和详情弹窗均不显示“访问项目”。
- 更新宠物项目中英文名称与介绍，不改动其背景、核心功能和媒体资源。
- 当前项目顺序：
  `Global Design Award Museum -> 可视化埋点事件地图 -> 360 Screenshot -> 园区招商前沿动态推送平台 -> 宠物移动净化器AI宣传片 -> Treadmill Workstation AI宣传片`。

## 关键技术决策

- 继续使用 `src/content/projects.ts` 的数组顺序驱动 CSS Grid，不为单张卡片设置专用行列坐标。
- `ProjectItem.url` 使用可选字段，避免用空链接或占位链接表达“不可访问”。
- 卡片层使用条件渲染移除无效外链；共享详情弹窗使用 `hidden` 加移除 `href`，避免复用弹窗时残留前一个项目的链接。
- 视频沿用现有 `detailVideo` 数据结构和弹窗渲染逻辑，不新增独立页面或专用组件。
- 图片替代文本复用站点现有语言状态，通过 `data-i18n-alt-zh` / `data-i18n-alt-en` 切换，不建立第二套语言逻辑。
- 新项目继续使用已有 `detailVideo` 数据结构和无 URL 展示逻辑，不新增组件或专用页面。
- 内容校验锁定新项目数据、完整英文文案、媒体路径、第二行第三列对应的数组顺序，以及宠物项目的新文案。

## 修改过的核心文件

- `src/content/projects.ts`：新增 Treadmill Workstation 项目，并更新宠物项目中英文名称与介绍。
- `src/components/ProjectCard.astro`：仅在存在 URL 时渲染卡片外链，并输出双语图片替代文本。
- `src/components/SiteNav.astro`：语言切换时同步更新带双语数据属性的图片 `alt`。
- `src/pages/index.astro`：详情弹窗无 URL 时隐藏入口并移除 `href`。
- `src/styles/global.css`：确保带 `hidden` 的详情外链不显示。
- `scripts/validate-content.ts`：新增 Treadmill Workstation 项目、顺序、媒体、无链接行为及宠物项目新文案的回归校验。
- `public/project-images/pet-mobile-air-purifier-aigc-film.png`：项目封面。
- `public/project-videos/pet-mobile-air-purifier-aigc-film.mp4`：项目详情视频。
- `public/project-images/treadmill-workstation-ai-film.png`：新项目封面。
- `public/project-videos/treadmill-workstation-ai-film.mp4`：新项目详情视频。
- `docs/superpowers/specs/2026-08-20-pet-air-purifier-aigc-project-design.md`：确认后的设计说明。
- `docs/superpowers/plans/2026-08-20-pet-air-purifier-aigc-project.md`：实施与验证计划。

## 测试与验证结果

2026-08-20：

- RED：新增 Treadmill Workstation 项目校验后，`npm run validate:content` 因缺少该项目按预期失败。
- RED：新增可选链接校验后，校验因卡片仍固定渲染外链按预期失败。
- RED：新增隐藏样式校验后，校验因缺少 `.project-dialog-visit[hidden]` 按预期失败。
- RED：新增双语图片替代文本校验后，校验因封面 `alt` 未接入语言切换按预期失败。
- GREEN：`npm run validate:content` 通过。
- `npm run build` 通过；Astro 成功生成静态首页。
- `git diff --check` 通过。
- 源文件与目标媒体文件 SHA-256 一致，复制过程未改变图片和视频内容。
- 桌面端 `1280 x 720`：
  - 第一行依次为 Global、埋点地图、360 Screenshot。
  - 第二行依次为园区项目、宠物净化器项目、Treadmill Workstation 项目。
  - 两个 AI 宣传片卡片外链数量均为 `0`，页面横向溢出为 `0`。
- 移动端 `393 x 852`：
  - 六张卡片按数据顺序单列展示，无横向溢出。
  - 新项目详情外链具有 `hidden`，计算样式为 `display: none`，且 `href` 已清除。
- 新视频验证：
  - 类型为 `video/mp4`，实际尺寸 `1280 x 720`，时长 `68.8` 秒。
  - 视频加载状态正常并可播放；关闭弹窗后暂停并归零。
- 双语内容验证通过，新项目中英文名称、介绍、背景和三项功能均可正确切换。
- 封面替代文本验证通过，英文模式为 `Integrated electric height-adjustable desk and walking pad in use`。
- 宠物项目英文名称、介绍和图片替代文本切换正常。
- 回归验证：`360 Screenshot` 的卡片和详情外链仍指向原 GitHub 地址并正常显示。
- 浏览器日志仅包含 Vite 开发连接信息，无错误。

## 已知问题

- 当前本地 `main` 尚未推送到 `origin/main`。
- 新项目尚未发布到 `https://sensormaru.com/`。
- 仓库没有自动化浏览器 E2E；当前视觉与交互结果依赖本次桌面端、移动端浏览器回归。
- 两个宣传片 MP4 均没有独立 WebVTT 字幕或经确认的双语逐字稿；后续如做无障碍增强，应先确认逐字稿和时间轴，避免猜测视频内容。

## 尝试过但失败的方案

- 只给详情弹窗外链设置 HTML `hidden` 属性不足以保证视觉隐藏。现有 `.project-dialog-visit { display: inline-flex; }` 会覆盖浏览器默认 `[hidden]` 样式，移动端仍能看到按钮。最终增加更高特异性的 `.project-dialog-visit[hidden] { display: none; }` 并加入内容校验。

## 下一步开发顺序

1. 将当前 `main` 推送到 GitHub 的 `origin/main`。
2. 按现有部署流程发布到 `https://sensormaru.com/`。
3. 在生产环境复核六张项目卡片顺序、两个 AI 宣传片项目无外链、视频播放、双语切换和移动端无横向溢出。
4. 获得确认后的中英文视频逐字稿与时间轴后，再为两个宣传片补充 WebVTT 字幕并加入浏览器自动化回归。
