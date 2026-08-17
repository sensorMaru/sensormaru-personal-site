# 项目交接状态

更新时间：2026-08-17  
当前分支：`main`  
当前状态：本地改动已整理提交，并推送到 GitHub；`https://sensormaru.com` 已可访问最新页面。

## 当前目标
持续迭代个人网站的页面布局、项目作品展示、技能区视觉和弹窗详情体验，并保证每次修改可以稳定发布到 `sensormaru.com`。

## 已完成内容
- 顶部固定胶囊导航已调整为半透明玻璃拟态材质，导航内文案字号已收紧。
- “掌握技能”板块已改为深色卡片组样式，并为 Coze、Dify、Figma、Notion、Excel、MySQL 等技能补充了对应 logo。
- “项目作品”和“掌握技能”大标题已统一为同一套左对齐标题样式，字号已按反馈缩小。
- 项目卡片已调整为参考图样式，包含图片底部渐变蒙层、卡片倒角、边框和深色信息区。
- 项目详情弹窗已改为玻璃拟态布局：左侧预览区、右侧项目介绍区、右上角“访问项目”跑道圆按钮。
- `Global Design Award Museum` 已替换原项目名称和封面，并补充详情页轮播图与项目文案。
- 已新增 `可视化埋点事件地图` 项目，并把静态站点目录放入 `public/projects/wm-tracking-demo/`。
- 已新增 `360 Screenshot` 项目，卡片使用指定封面，详情页左侧改为自动播放视频并支持进度条拖动。

## 关键技术决策
- 站点使用 Astro 构建，保持静态站点输出。
- 主要内容继续集中在 `src/content/*.ts`，便于后续改文案和新增项目。
- 项目详情弹窗继续使用原生 `<dialog>`，配合少量原生脚本处理图片轮播、视频播放和关闭重置。
- 静态项目、项目封面、详情图、视频和技能 logo 均放入 `public/`，通过 Astro build 直接发布。
- `scripts/validate-content.ts` 已更新为校验当前三个重点项目 slug。

## 修改过的核心文件
- `src/pages/index.astro`：项目弹窗结构、轮播逻辑、视频播放逻辑。
- `src/components/ProjectCard.astro`：项目卡片结构与可点击区域。
- `src/components/SkillGroup.astro`：技能标签 logo 渲染。
- `src/content/projects.ts`：项目作品数据，当前包含 `global-design-award-museum`、`wm-tracking-demo`、`360-screenshot`。
- `src/content/skills.ts`：技能分类与 logo 路径。
- `src/styles/global.css`：导航、项目卡片、弹窗、标题、技能区和响应式样式。
- `scripts/validate-content.ts`：内容校验脚本。
- `public/project-images/`：项目卡片封面。
- `public/project-detail-images/`：项目详情轮播图。
- `public/project-videos/`：项目详情视频。
- `public/projects/wm-tracking-demo/`：可视化埋点事件地图静态页面。
- `public/skill-logos/`：技能 logo。

## 测试与验证结果
- `npm run validate:content` 已通过。
- `npm run build` 已通过。
- `git diff --check` 已通过。
- GitHub `main` 已推送最新提交。
- `https://sensormaru.com` 已能返回包含 `Global Design Award Museum`、`可视化埋点事件地图`、`360 Screenshot` 的新页面内容。
- `https://sensormaru.com/project-videos/360-screenshot.mp4` 已验证返回 `200`。

## 已知问题
- 当前终端环境没有可直接复用的 Cloudflare API Token。直接执行 `wrangler deploy` 会要求浏览器 OAuth 授权；本次线上更新已通过 GitHub 推送后的 Cloudflare 发布链路生效。
- 之后如果需要在终端里强制手动部署，建议配置 `CLOUDFLARE_API_TOKEN`，或在浏览器完成 Wrangler OAuth 登录。

## 下一步开发顺序
1. 继续围绕项目卡片、弹窗尺寸、视频展示和移动端适配做视觉微调。
2. 给更多项目补充封面、详情图、访问链接和结构化文案。
3. 如需更稳定的手动发布体验，补充 Cloudflare Wrangler 配置与 API Token 流程。
