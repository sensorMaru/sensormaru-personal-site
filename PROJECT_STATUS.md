# 项目交接状态

更新时间：2026-08-18
当前分支：`main`
当前状态：本地已新增 `多语言自动翻译脚本`、`食物库搜索失败自动补全skills` 和 `坐姿肩颈肌电信号&疲劳度分析skills` Agent Skill/SOP 卡片；首页首屏方向文案已改为 `产品经理 / AI产品经理` 并下移一个自身字体高度；About 分点字号已放大到与首屏方向文案一致；Hero 左侧文字组已与 `EXPERIENCE` 标题左对齐，About 分点内容已缩进到与 `硕士 · 工业设计` 左对齐；`Global Design Award Museum` 的访问地址已更新为 `https://awards.sensormaru.com/` 并重新生产部署；桌面端鼠标已新增延迟白色光晕、卡片轻微位移、项目封面 hover 放大，且已移除卡片 hover 白色描边；鼠标光晕已缩小并再次降低亮度，项目详情和 SOP 详情弹窗已新增类似 macOS 窗口的缩放淡入/淡出开合动画；顶部导航目录 hover/focus 时会在文案下方出现横线；技能板块中文标题和顶部中文 tab 已从 `掌握技能` / `Skills` 改为 `技能`；原 `Agent Skills` 板块标题已改为 `Skills & SOP沉淀`；本地源码变更尚未推送到 GitHub。

## 当前目标

维护沈智宇个人网站，继续围绕首页视觉、个人经历、个人项目、Skills & SOP沉淀、技能和弹窗详情体验做迭代，并保证每次修改都能通过内容校验、静态构建和生产发布。

## 已完成内容

- 首页首屏已重排：右侧为个人照片，照片完成裁剪、四周倒角和底部渐变蒙层；左侧移除姓名下方介绍文案，保留 `Zhiyu Shen`、姓名和方向信息。
- 首页首屏方向文案已改为 `产品经理 / AI产品经理`，并按该文案自身字体高度向下移动一个单位。
- About 区 4 个分点正文的字号已放大到与首屏方向文案一致。
- Hero 左侧文字组的额外左缩进已移除，使 `Zhiyu Shen`、姓名、方向信息和 About 标题与 `EXPERIENCE` 左对齐。
- About 分点列表已整体缩进，使分点文字起始线与经历条目标题 `硕士 · 工业设计` 左对齐。
- About 区已改为 4 个精简分点，文字左对齐并与个人经历区正文对齐；字体颜色和粗细已对齐经历区分点样式。
- 首屏与个人经历之间的两条分割线已合并为一条，下方个人经历内容同步上移。
- “个人经历”板块已改为左侧教育经历、右侧实习经历的双列排版；已加入中国美术学院、浙江工业大学、火石创造、小影科技 logo，并按不同 logo 特性处理背景、透明图和视觉尺寸。
- 实习经历已扩展为每段最多 5 个分点、每个分点不超过 2 句话；教育经历已加入课程、奖学金和竞赛分点。
- 顶部导航已调整为“关于 / 经历 / 项目 / Workflow / 技能 / 联系”；`Workflow` 跳转到 Skills & SOP沉淀，`技能` 跳转到技能板块。
- 技能板块中文标题已从 `掌握技能` 改为 `技能`，顶部导航中文态的 `Skills` tab 已改为 `技能`；英文态仍显示 `Skills`。
- 中英切换已从只切换导航扩展为切换页面内主要内容和动态弹窗内容；中文状态下原本应保持英文的脚本名、文件名和专有名词继续保留英文。
- 项目详情弹窗和 SOP 详情弹窗不再显示中英切换按钮；打开弹窗时外部页面滚动条隐藏，外部页面保持打开前滚动位置不跳顶。
- 原 `Agent Skills` 板块标题已改为 `Skills & SOP沉淀`，并位于“个人项目”和“技能”之间。
- 已新增并完善五个 Agent Skill 卡片：`App Store评论采集与分析Skills`、`食谱数据清洗skills`、`多语言自动翻译脚本`、`食物库搜索失败自动补全skills`、`坐姿肩颈肌电信号&疲劳度分析skills`。
- SOP 详情弹窗已实现左侧流程图、右侧 README 的双栏阅读体验；右侧 README 滚动时左侧对应流程节点高亮，点击左侧流程节点会跳转到右侧对应章节。
- SOP 流程图已改为内联 SVG 渲染，并隐藏多余背景、装饰色块，只保留节点、文案、箭头等核心流程图元素。
- SOP 详情页右侧标题统一为 `README`，后续新增 SOP 卡片也复用该通用标题。
- `可视化埋点事件地图` 项目访问路径已修复为 `/projects/wm-tracking-demo/index.html`，避免点击项目卡片后进入 `/projects/wm-tracking-demo/` 造成 404。
- `Global Design Award Museum` 项目访问地址已更新为 `https://awards.sensormaru.com/`。
- 已清理项目设计文档中残留的 `Global Design Award Museum` 旧访问地址，避免后续迭代误读。
- 桌面端鼠标交互已增强：指针位置新增延迟跟随的白色光晕，光晕层级高于页面元素并会在原生 `<dialog>` 打开时同步进入顶层弹窗。
- 鼠标光晕尺寸已从 `220px` 收敛为 `147px`，白色渐变透明度已先后降低到 `0.09/0.04`，避免视觉过亮。
- 项目卡片、Agent Skill/SOP 卡片和技能卡片 hover 时会随鼠标产生轻微位移；项目经历卡片的封面图片 hover 时放大到 `1.2` 倍。
- 已移除项目卡片和 SOP 卡片鼠标 hover 时的白色描边变化，仅保留访问按钮、对话框链接和键盘 focus 的可见反馈。
- 项目详情弹窗和 SOP 详情弹窗已新增缩放、位移、淡入淡出和轻微模糊的开合动画；关闭按钮、点击遮罩和按 Esc 均会先播放关闭动画再关闭弹窗。
- 顶部导航目录项 hover/focus 时通过伪元素在文字下方显示 1px 横线，并带有轻微展开动画，不改变导航整体高度。
- 已新增第三个 Agent Skill 卡片：`多语言自动翻译脚本`。该卡片使用 `/Users/xy/Documents/BP_translator/skills/README.md` 作为中文 README 参考，使用 `/Users/xy/Documents/BP_translator/artifacts/bp_translator_project_flow_4x3.svg` 作为流程图参考；站点内已落位为 `src/data/sop-readmes/bp-translator.md`、`src/data/sop-readmes/bp-translator.en.md` 和 `public/sop-assets/bp-translator-project-flow-4x3.svg`。
- 已修复 `多语言自动翻译脚本` 流程图中“异常处理”和“诊断输出”辅助说明文本溢出圆角矩形的问题；长句已拆为两行，并更新对应流程节点映射。
- 已新增第四个 Agent Skill 卡片：`食物库搜索失败自动补全skills`。该卡片使用 `/Users/xy/Documents/食物库搜索结果优化/skills/README.md` 作为中文 README 参考，使用 `/Users/xy/Documents/食物库搜索结果优化/artifacts/vcm_food_project_flow_4x3.svg` 作为流程图参考；站点内已落位为 `src/data/sop-readmes/vcm-food-search-completion.md`、`src/data/sop-readmes/vcm-food-search-completion.en.md` 和 `public/sop-assets/vcm-food-project-flow-4x3.svg`。
- 已修复 `食物库搜索失败自动补全skills` 流程图中“联网兜底”和“质量收口”辅助说明文本溢出圆角矩形的风险；长句已拆为两行，并更新对应流程节点映射。
- 已新增第五个 Agent Skill 卡片：`坐姿肩颈肌电信号&疲劳度分析skills`。该卡片使用 `/Users/xy/Documents/EMG/skills/README.md` 作为中文 README 参考，使用 `/Users/xy/Documents/EMG/artifacts/emg_analysis_project_flow_4x3.svg` 作为流程图参考；站点内已落位为 `src/data/sop-readmes/emg-analysis.md`、`src/data/sop-readmes/emg-analysis.en.md` 和 `public/sop-assets/emg-analysis-project-flow-4x3.svg`。
- 已修复 `坐姿肩颈肌电信号&疲劳度分析skills` 流程图中“异常处理”和“终端诊断”辅助说明文本溢出圆角矩形的风险；长句已拆为两行，并更新对应流程节点映射。

## 关键技术决策

- 站点继续使用 Astro 静态构建，生产产物输出到 `dist/`。
- 页面结构仍以 `src/pages/index.astro` 为主，内容数据集中维护在 `src/content/*.ts`。
- SOP README 原文以 Markdown 文件维护在 `src/data/sop-readmes/`，SOP 配置和流程图章节映射维护在 `src/content/sops.ts`。
- 图片、SVG、项目静态页等发布资源统一放在 `public/`，由 Astro build 直接复制到生产产物。
- SOP 流程图使用 `fetch` 拉取 SVG 后内联到弹窗中，便于给节点和文字绑定高亮、点击跳转、语言替换和透明背景样式。
- 弹窗继续使用原生 `<dialog>`；外部滚动锁定通过给 `html`、`body` 添加 `is-dialog-open`，并记录/恢复打开前 `scrollY` 实现。
- 鼠标光晕使用运行时创建的 `.cursor-glow` 固定层，桌面细指针设备启用；移动端、粗指针设备和 `prefers-reduced-motion` 场景会禁用光晕、卡片位移和封面放大。
- 弹窗动画通过原生 `<dialog>` 叠加 `.is-closing` 状态实现；关闭时延迟约 `240ms` 后再调用 `close()`，并在关闭完成后清理状态类和计时器。
- 中英切换通过 `site-language-change` 事件驱动静态 DOM、项目弹窗、SOP 弹窗和 SVG 文案同步刷新。
- `.tmp_lark_refs/` 是本地浏览器 profile/cache 目录，已加入 `.gitignore`，不参与 Git 提交和生产发布。

## 修改过的核心文件

- `src/pages/index.astro`：首页结构、项目弹窗、SOP 弹窗、Markdown 渲染、SVG 交互、语言切换和滚动锁定逻辑。
- `src/styles/global.css`：首屏、照片、About、经历区、导航、项目卡片、Skills & SOP沉淀、SOP 弹窗和响应式样式。
- `src/components/SiteNav.astro`：顶部导航顺序、`Workflow` 和 `Skills` 锚点、中英切换事件。
- `src/components/Hero.astro`：首屏个人信息、照片和 About 数据绑定。
- `src/components/Timeline.astro`：个人经历双列排版、logo 渲染、教育和实习分点。
- `src/components/ProjectCard.astro`：项目卡片访问按钮和中英文属性。
- `src/components/SectionHeading.astro`、`src/components/SkillGroup.astro`：板块标题和技能组展示细节。
- `src/content/site.ts`：个人信息、照片、About 分点和中英文文案。
- `src/content/experience.ts`：教育经历、实习经历、logo、分点和英文翻译。
- `src/content/projects.ts`：项目数据、项目链接和中英文文案。
- `src/content/skills.ts`：技能数据和展示信息。
- `src/content/sops.ts`：Agent Skill 数据、流程图路径、README 引用、章节映射和英文翻译。
- `src/data/sop-readmes/`：五个 Agent Skill 的中英文 README。
- `public/sop-assets/`：去背景后的 SOP 流程图 SVG。
- `public/experience-logos/`：个人经历区机构/公司 logo。
- `public/profile/shen-zhiyu.jpg`：首页个人照片。
- `scripts/validate-content.ts`：内容、导航、SOP、弹窗、语言切换和经历约束校验。
- `.gitignore`：新增忽略 `.tmp_lark_refs/`。

## 测试与验证结果

- `npm run validate:content`：通过。覆盖实习分点数量和句数、项目 slug、`Global Design Award Museum` 访问地址、`wm-tracking-demo` 访问路径、首页方向文案与下移样式、About 分点字号、Hero 与 `EXPERIENCE` 左对齐、About 分点与经历条目标题左对齐、鼠标光晕、卡片位移、项目封面 hover 放大、卡片 hover 去描边、Skills & SOP沉淀位置、导航顺序、SOP README/流程图内容、语言切换、弹窗结构、SOP 流程图去背景等规则；已包含 `多语言自动翻译脚本`、`食物库搜索失败自动补全skills` 和 `坐姿肩颈肌电信号&疲劳度分析skills` 的卡片文案、README、流程图路径、英文 README 和长文本换行校验。
- `npm run build`：通过。Astro 成功生成静态站点到 `dist/`。
- `git diff --check`：通过。
- `多语言自动翻译脚本` 流程图文本边界检查：通过。四行辅助说明文本的估算右边界均落在对应圆角矩形内。
- `食物库搜索失败自动补全skills` 流程图文本边界检查：通过。四行辅助说明文本的估算右边界均落在对应圆角矩形内；本地浏览器抽查确认 SOP 弹窗可打开、内联 SVG 存在，原两条单行长文本已不存在。
- `坐姿肩颈肌电信号&疲劳度分析skills` 流程图文本边界检查：通过。四行辅助说明文本的估算右边界均落在对应圆角矩形内；本地浏览器抽查确认第五张 SOP 卡片可见、SOP 弹窗可打开、内联 SVG 存在，原两条单行长文本已不存在，README 正文可读到 `emg_comparison.html`。
- 浏览器视觉检查记录：首屏标题矩形已移除；个人照片倒角和底部渐变蒙层已生效；About 与经历正文左对齐；首屏与个人经历之间只保留一条分割线；弹窗打开后外部页面不再跳到顶部。
- 上一批生产发布结果：已使用 `npm exec -- wrangler deploy --assets=dist --name=sensormaru-personal-site --compatibility-date=2026-08-18` 发布成功。
- Wrangler 发布地址：`https://sensormaru-personal-site.solitude1900szy.workers.dev`；`curl -I` 返回 HTTP 200。
- 自定义域名抽查：`https://sensormaru.com` 的 `curl -I` 返回 HTTP 200。
- 线上内容抽查：生产首页可检索到 `Zhiyu Shen`、`Skills & SOP沉淀`、`Workflow`、`App Store评论采集与分析Skills` 和 `食谱数据清洗skills`。
- 本次 `Global Design Award Museum` 链接回归：本地浏览器确认项目卡片和项目详情弹窗的 `访问项目` 链接均为 `https://awards.sensormaru.com/`，页面中旧域名出现次数为 0。
- 本次生产发布结果：已使用 `npm exec -- wrangler deploy --assets=dist --name=sensormaru-personal-site --compatibility-date=2026-08-18` 发布成功；Version ID 为 `a3a75430-4466-43c8-aa13-d5007496952b`。
- 本次线上内容抽查：`https://sensormaru.com` 和 workers.dev 首页均可检索到 `https://awards.sensormaru.com/`，未检索到旧地址 `https://design-award-meta-search.vercel.app/`。
- 本次鼠标交互浏览器回归：本地 Playwright 确认项目卡 hover 后卡片 transform 产生轻微位移，封面图片 transform 为 `matrix(1.2, 0, 0, 1.2, 0, 0)`；光晕 opacity 为 `1`、z-index 为 `2147483600`；项目卡片外层和内层边框颜色 hover 前后保持一致；项目详情弹窗打开后光晕父级会切换为 `DIALOG`。
- 本次鼠标交互生产发布结果：已使用 `npm exec -- wrangler deploy --assets=dist --name=sensormaru-personal-site --compatibility-date=2026-08-18` 发布成功；Version ID 为 `4674965b-ca44-4411-88b1-f6e3de62f5ab`。
- 本次鼠标交互线上抽查：`https://sensormaru.com` 返回 HTTP 200；线上 Playwright 确认项目卡 hover 后封面图片 transform 为 `matrix(1.2, 0, 0, 1.2, 0, 0)`、卡片 transform 产生轻微位移、光晕 opacity 为 `1` 且 z-index 为 `2147483600`，项目卡片外层和内层边框颜色 hover 前后保持一致。
- 本次光晕与弹窗动效本地回归：`npm run validate:content`、`npm run build`、`git diff --check` 均通过；Playwright 确认光晕尺寸为 `147px`、渐变透明度为 `0.18/0.08`、z-index 为 `2147483600`，项目详情和 SOP 详情弹窗打开时使用 `dialog-window-in`，关闭时先保持 open 并进入 `dialog-window-out` / `is-closing`，动画结束后 open 为 `false` 且 `is-closing` 已清理。
- 本次光晕与弹窗动效生产发布结果：已使用 `npm exec -- wrangler deploy --assets=dist --name=sensormaru-personal-site --compatibility-date=2026-08-18` 发布成功；Version ID 为 `e0211042-1111-4885-9180-f8883bb03007`。
- 本次光晕与弹窗动效线上抽查：`https://sensormaru.com` 返回 HTTP 200；线上 Playwright 确认光晕尺寸为 `147px`、渐变透明度为 `0.18/0.08`、项目详情弹窗打开为 `dialog-window-in`，关闭阶段为 `dialog-window-out` / `is-closing`，最终 open 为 `false` 且 `is-closing` 已清理。
- 本次导航 hover 与光晕降亮本地回归：`npm run validate:content`、`npm run build`、`git diff --check` 均通过；Playwright 确认顶部 `Workflow` 导航项 hover 后 `::after` 横线 opacity 为 `0.9`、transform 为 `scaleX(1)`、高度为 `1px`，光晕尺寸为 `147px` 且渐变透明度为 `0.09/0.04`。
- 本次导航 hover 与光晕降亮生产发布结果：已使用 `npm exec -- wrangler deploy --assets=dist --name=sensormaru-personal-site --compatibility-date=2026-08-18` 发布成功；Version ID 为 `5e80896b-11ff-41ad-915c-4cdce437f11a`。
- 本次导航 hover 与光晕降亮线上抽查：`https://sensormaru.com` 返回 HTTP 200；线上 Playwright 确认顶部 `Workflow` 导航项 hover 后 `::after` 横线 opacity 为 `0.9`、transform 为 `scaleX(1)`、高度为 `1px`，光晕尺寸为 `147px` 且渐变透明度为 `0.09/0.04`。
- 本次技能文案本地回归：`npm run validate:content`、`npm run build`、`git diff --check` 均通过；Playwright 确认中文态顶部导航和技能板块标题均为 `技能`，英文态仍为 `Skills`。
- 本次技能文案生产发布结果：已使用 `npm exec -- wrangler deploy --assets=dist --name=sensormaru-personal-site --compatibility-date=2026-08-18` 发布成功；Version ID 为 `3516b39b-9ad1-48b0-a42d-c000a426119a`。
- 本次技能文案线上抽查：`https://sensormaru.com` 返回 HTTP 200；线上 Playwright 确认中文态顶部导航和技能板块标题均为 `技能`，英文态仍为 `Skills`。
- 本次 Skills & SOP沉淀标题本地回归：`npm run validate:content`、`npm run build`、`git diff --check` 均通过；Playwright 确认 `#sops` 板块标题渲染为 `Skills & SOP沉淀`。
- 本次 Skills & SOP沉淀标题生产发布结果：已使用 `npm exec -- wrangler deploy --assets=dist --name=sensormaru-personal-site --compatibility-date=2026-08-18` 发布成功；Version ID 为 `5cd8f6b6-7440-49fc-8598-99cbef52ee4d`。
- 本次 Skills & SOP沉淀标题线上抽查：`https://sensormaru.com` 返回 HTTP 200；线上 Playwright 确认 `#sops` 板块标题渲染为 `Skills & SOP沉淀`，页面正文不再出现旧标题 `Agent Skills`。
- Git 同步结果：上一批源码、静态资源和交接文档变更已推送到 `origin/main`；本次新增 SOP、首页样式调整、项目链接修复和交接状态更新已生产部署，但本地变更尚未提交或推送。

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

1. 在生产站点抽查桌面端和移动端：首页首屏、个人经历、项目卡片、Skills & SOP沉淀、技能、联系区。
2. 重点回归弹窗体验：项目详情、SOP 详情、中英切换、外部滚动锁定、SOP 流程节点高亮和点击跳转。
3. 继续补齐更多项目和 Agent Skill 的结构化数据、封面、详情媒体、README 和流程图。
4. 如后续频繁手动发布，补充明确的 Cloudflare 部署说明或配置文件，但不要提交任何密钥。
