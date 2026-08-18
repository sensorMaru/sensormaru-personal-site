# 项目交接状态

更新时间：2026-08-18
当前分支：`main`
当前状态：当前批次 UI、内容、交互与验证工作已完成；生产部署已完成；GitHub `main` 已推送本次变更。

## 当前目标

维护沈智宇个人网站，继续围绕首页视觉、个人经历、个人项目、Agent Skills、掌握技能和弹窗详情体验做迭代，并保证每次修改都能通过内容校验、静态构建和生产发布。

## 已完成内容

- 首页首屏已重排：右侧为个人照片，照片完成裁剪、四周倒角和底部渐变蒙层；左侧移除姓名下方介绍文案，保留 `Zhiyu Shen`、姓名和方向信息。
- About 区已改为 4 个精简分点，文字左对齐并与个人经历区正文对齐；字体颜色和粗细已对齐经历区分点样式。
- 首屏与个人经历之间的两条分割线已合并为一条，下方个人经历内容同步上移。
- “个人经历”板块已改为左侧教育经历、右侧实习经历的双列排版；已加入中国美术学院、浙江工业大学、火石创造、小影科技 logo，并按不同 logo 特性处理背景、透明图和视觉尺寸。
- 实习经历已扩展为每段最多 5 个分点、每个分点不超过 2 句话；教育经历已加入课程、奖学金和竞赛分点。
- 顶部导航已调整为“关于 / 经历 / 项目 / Workflow / Skills / 联系”；`Workflow` 跳转到 Agent Skills，`Skills` 跳转到掌握技能。
- 中英切换已从只切换导航扩展为切换页面内主要内容和动态弹窗内容；中文状态下原本应保持英文的脚本名、文件名和专有名词继续保留英文。
- 项目详情弹窗和 SOP 详情弹窗不再显示中英切换按钮；打开弹窗时外部页面滚动条隐藏，外部页面保持打开前滚动位置不跳顶。
- “Skills & SOP”板块已更名为 `Agent Skills`，并移动到“个人项目”和“掌握技能”之间。
- 已新增并完善两个 Agent Skill 卡片：`App Store评论采集与分析Skills`、`食谱数据清洗skills`。
- SOP 详情弹窗已实现左侧流程图、右侧 README 的双栏阅读体验；右侧 README 滚动时左侧对应流程节点高亮，点击左侧流程节点会跳转到右侧对应章节。
- SOP 流程图已改为内联 SVG 渲染，并隐藏多余背景、装饰色块，只保留节点、文案、箭头等核心流程图元素。
- SOP 详情页右侧标题统一为 `README`，后续新增 SOP 卡片也复用该通用标题。
- `可视化埋点事件地图` 项目访问路径已修复为 `/projects/wm-tracking-demo/index.html`，避免点击项目卡片后进入 `/projects/wm-tracking-demo/` 造成 404。

## 关键技术决策

- 站点继续使用 Astro 静态构建，生产产物输出到 `dist/`。
- 页面结构仍以 `src/pages/index.astro` 为主，内容数据集中维护在 `src/content/*.ts`。
- SOP README 原文以 Markdown 文件维护在 `src/data/sop-readmes/`，SOP 配置和流程图章节映射维护在 `src/content/sops.ts`。
- 图片、SVG、项目静态页等发布资源统一放在 `public/`，由 Astro build 直接复制到生产产物。
- SOP 流程图使用 `fetch` 拉取 SVG 后内联到弹窗中，便于给节点和文字绑定高亮、点击跳转、语言替换和透明背景样式。
- 弹窗继续使用原生 `<dialog>`；外部滚动锁定通过给 `html`、`body` 添加 `is-dialog-open`，并记录/恢复打开前 `scrollY` 实现。
- 中英切换通过 `site-language-change` 事件驱动静态 DOM、项目弹窗、SOP 弹窗和 SVG 文案同步刷新。
- `.tmp_lark_refs/` 是本地浏览器 profile/cache 目录，已加入 `.gitignore`，不参与 Git 提交和生产发布。

## 修改过的核心文件

- `src/pages/index.astro`：首页结构、项目弹窗、SOP 弹窗、Markdown 渲染、SVG 交互、语言切换和滚动锁定逻辑。
- `src/styles/global.css`：首屏、照片、About、经历区、导航、项目卡片、Agent Skills、SOP 弹窗和响应式样式。
- `src/components/SiteNav.astro`：顶部导航顺序、`Workflow` 和 `Skills` 锚点、中英切换事件。
- `src/components/Hero.astro`：首屏个人信息、照片和 About 数据绑定。
- `src/components/Timeline.astro`：个人经历双列排版、logo 渲染、教育和实习分点。
- `src/components/ProjectCard.astro`：项目卡片访问按钮和中英文属性。
- `src/components/SectionHeading.astro`、`src/components/SkillGroup.astro`：板块标题和技能组展示细节。
- `src/content/site.ts`：个人信息、照片、About 分点和中英文文案。
- `src/content/experience.ts`：教育经历、实习经历、logo、分点和英文翻译。
- `src/content/projects.ts`：项目数据、项目链接和中英文文案。
- `src/content/skills.ts`：掌握技能数据和展示信息。
- `src/content/sops.ts`：Agent Skill 数据、流程图路径、README 引用、章节映射和英文翻译。
- `src/data/sop-readmes/`：两个 Agent Skill 的中英文 README。
- `public/sop-assets/`：两个去背景后的 SOP 流程图 SVG。
- `public/experience-logos/`：个人经历区机构/公司 logo。
- `public/profile/shen-zhiyu.jpg`：首页个人照片。
- `scripts/validate-content.ts`：内容、导航、SOP、弹窗、语言切换和经历约束校验。
- `.gitignore`：新增忽略 `.tmp_lark_refs/`。

## 测试与验证结果

- `npm run validate:content`：通过。覆盖实习分点数量和句数、项目 slug、`wm-tracking-demo` 访问路径、Agent Skills 位置、导航顺序、SOP README/流程图内容、语言切换、弹窗结构、SOP 流程图去背景等规则。
- `npm run build`：通过。Astro 成功生成静态站点到 `dist/`。
- `git diff --check`：通过。
- 浏览器视觉检查记录：首屏标题矩形已移除；个人照片倒角和底部渐变蒙层已生效；About 与经历正文左对齐；首屏与个人经历之间只保留一条分割线；弹窗打开后外部页面不再跳到顶部。
- 生产发布结果：已使用 `npm exec -- wrangler deploy --assets=dist --name=sensormaru-personal-site --compatibility-date=2026-08-18` 发布成功。
- Wrangler 发布地址：`https://sensormaru-personal-site.solitude1900szy.workers.dev`；`curl -I` 返回 HTTP 200。
- 自定义域名抽查：`https://sensormaru.com` 的 `curl -I` 返回 HTTP 200。
- 线上内容抽查：生产首页可检索到 `Zhiyu Shen`、`Agent Skills`、`Workflow`、`App Store评论采集与分析Skills` 和 `食谱数据清洗skills`。
- Git 同步结果：本次源码、静态资源和交接文档变更已推送到 `origin/main`。

## 已知问题

- 当前没有完整自动化 E2E 测试，弹窗滚动锁定、SOP 节点联动和响应式布局主要依赖内容校验、构建和浏览器抽查。
- Wrangler 生产部署依赖本机已有 Cloudflare 登录态或外部环境变量；仓库内没有也不应写入任何 Cloudflare Token。
- 当前 Wrangler 4.123.0 部署 Worker 时必须显式传入 `--compatibility-date`，否则会拒绝上传。
- `.tmp_lark_refs/` 仍可能留在本机工作目录中，但已被 Git 忽略，不应提交。

## 尝试过但失败的方案

- 早期直接使用整张 SOP SVG 图片展示时，视觉上更像图片卡片，不像可阅读流程图；后来改为隐藏背景和装饰色块，并以内联 SVG 方式保留节点、文案和箭头。
- 早期弹窗滚动锁定只隐藏外部滚动，打开弹窗时页面会跳到顶部；后来改为记录打开前 `scrollY` 并用 fixed body 锁定位置。
- 历史部署记录显示，未完成 Cloudflare 授权时直接执行 Wrangler 部署会停在登录/授权流程；生产发布前需要确认本机授权仍有效。
- 本次首次执行 `npm exec -- wrangler deploy --assets=dist --name=sensormaru-personal-site` 失败，Wrangler 提示缺少 `compatibility_date`；补充 `--compatibility-date=2026-08-18` 后部署成功。

## 下一步开发顺序

1. 在生产站点抽查桌面端和移动端：首页首屏、个人经历、项目卡片、Agent Skills、掌握技能、联系区。
2. 重点回归弹窗体验：项目详情、SOP 详情、中英切换、外部滚动锁定、SOP 流程节点高亮和点击跳转。
3. 继续补齐更多项目和 Agent Skill 的结构化数据、封面、详情媒体、README 和流程图。
4. 如后续频繁手动发布，补充明确的 Cloudflare 部署说明或配置文件，但不要提交任何密钥。
