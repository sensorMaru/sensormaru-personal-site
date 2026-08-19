# 项目交接状态

更新时间：2026-08-19

当前分支：`main`

当前状态：飞书文档 revision 211 与 revision 286 中已确认的页面修改均已在本地完成并通过验证，等待提交、推送和生产发布。

## 当前目标

维护 `sensormaru.com` 个人网站，继续以 Astro 静态首页呈现个人经历、个人项目、`Skills & SOP沉淀`、技能与联系方式，并保证中英文内容、移动端弹窗和生产站点一致。

本轮已确认需求：

1. 将 `Global Design Award Museum` 简介改为“一个面向全球设计奖项的检索聚合网站”。
2. 将首个技能组标题改为“产品工作流”。
3. 在 GitHub 上方增加邮箱 `sensorMaru@163.com`，使用 `mailto:` 打开邮件客户端。
4. 将联系区 GitHub 项显示账号从 `SensorMaru` 改为 `sensorMaru`。
5. 修复 iPhone Chrome 中项目详情关闭按钮被页面固定导航遮挡、无法退出的问题。

## 已完成内容

- `Global Design Award Museum` 简介已更新为：
  - 中文：`一个面向全球设计奖项的检索聚合网站`
  - 英文：`A search aggregation website for global design awards.`
- 首个技能组标题已更新为 `产品工作流` / `Product Workflow`。
- 联系区已在 Phone / WeChat 与 GitHub 之间增加 `邮箱` / `Email` 项。
- 邮箱链接由 `site.email` 生成，目标为 `mailto:sensorMaru@163.com`。
- GitHub 展示账号已改为 `sensorMaru`，GitHub 链接地址保持不变。
- 中文姓名保持 `沈智宇`，英文姓名保持 `Shen Zhiyu`，首屏与联系区姓名绑定未改变。
- 手机端邮箱使用独立字号，`375px` 宽度下可单行显示且无横向溢出。
- 项目或 SOP 弹窗打开时，页面固定导航会隐藏并停止响应点击。
- `max-width: 640px` 下，项目详情关闭按钮改为弹窗滚动容器内的 `sticky` 控件，并使用 `safe-area-inset-top` 适配安全区。
- 手机端“访问项目”按钮移到左侧，避免与右侧关闭按钮重叠。
- 内容校验已覆盖上述文案、姓名保护、联系项顺序、邮箱、导航隐藏和移动端关闭按钮规则。

## 关键技术决策

- 用户可见内容继续集中在 `src/content/*.ts`，卡片和弹窗共用同一数据源。
- `site.name` 与 `site.translations.en.name` 继续作为个人姓名唯一来源；GitHub 账号只修改 `site.githubHandle`。
- 联系邮箱以 `site.email` 为唯一来源，页面模板不重复写死地址。
- 弹窗继续使用原生 `<dialog>`，不引入新的弹窗组件或依赖。
- 弹窗打开时复用现有 `html.is-dialog-open` 状态隐藏 `.site-nav`，避免固定导航参与移动浏览器的顶层合成。
- 手机端关闭按钮使用 `sticky` 而不是 `fixed`，使其相对弹窗滚动容器定位，降低 iOS Chrome 动态地址栏和视觉视口差异造成遮挡的风险。
- `.tmp_lark_refs/` 仅保存本地飞书标注图，已被 Git 忽略，不得提交。

## 修改过的核心文件

- `src/content/projects.ts`：更新 Global Design Award Museum 中英文简介。
- `src/content/skills.ts`：更新首个技能组中英文标题。
- `src/content/site.ts`：更新邮箱与 GitHub 展示账号，保留中英文姓名。
- `src/pages/index.astro`：增加双语邮箱联系项与 `mailto:` 链接。
- `src/styles/global.css`：邮箱交互与移动字号、弹窗打开时隐藏导航、手机端关闭按钮安全区与布局。
- `scripts/validate-content.ts`：新增本轮内容、姓名保护、结构顺序和响应式规则校验。
- `docs/superpowers/specs/2026-08-19-feishu-content-update-design.md`：revision 211 内容变更设计记录。
- `docs/superpowers/plans/2026-08-19-feishu-content-update.md`：revision 211 测试先行实施计划。

## 测试与验证结果

2026-08-19 本地验证：

- `npm run validate:content`：通过。
- `npm run build`：通过，Astro 生成 1 个静态页面到 `dist/`。
- `git diff --check`：通过。
- 桌面视口 `1280 x 720`：
  - 中文姓名为 `沈智宇`，英文切换后为 `Shen Zhiyu`。
  - GitHub 展示账号在中英文状态下均为 `sensorMaru`。
  - 项目弹窗打开时导航隐藏，关闭按钮可点击，关闭后滚动锁定正常解除。
- 手机视口 `375 x 812`、`393 x 852`、`402 x 874`：
  - 项目弹窗关闭按钮位于可视范围内且命中测试通过。
  - 弹窗滚动后关闭按钮仍保持可点击。
  - 固定导航处于隐藏状态。
  - 关闭按钮与“访问项目”按钮不重叠。
  - 页面横向溢出为 0。
- 浏览器日志只有本地 Vite 连接调试信息，无 error 日志。

## 已知问题

- 尚未在真实 iPhone 17 标准版的 Google Chrome 上回归；当前结果来自 Chromium 移动设备视口模拟。修复策略不依赖特定 UA，但生产发布后仍应使用真机复查。
- 当前没有仓库级自动化 E2E 测试；语言切换、弹窗滚动和响应式布局仍依赖内容校验与浏览器回归。
- 本轮尚未推送和部署，线上站点仍是上一版本。
- Wrangler 发布依赖本机已有 Cloudflare 登录态，仓库中不得保存 Token、密码或其他凭据。
- Wrangler 发布需要显式传入 `--compatibility-date`。

## 尝试过但失败的方案

- 飞书 `docs +media-preview` 因当前身份缺少 `docs:document.media:download` 权限失败；改用文档返回的临时图片地址下载标注图。
- 最初根据标注图误将 `sensorMaru` 理解为首屏大标题；用户确认实际是 GitHub 项显示账号后，已撤回首屏字段修改，并增加姓名保护校验。
- 初版移动端邮箱只使用 `overflow-wrap: anywhere`，在 `375px` 视口下出现尾字符孤立换行；改为移动端独立字号后解决。
- 原项目详情关闭按钮使用 `position: fixed`，在 iOS Chrome 动态浏览器栏和页面固定导航组合下存在被遮挡风险；已改为弹窗容器内 `sticky` 定位。

## 下一步开发顺序

1. 提交当前实现与交接文档并推送到 `origin/main`。
2. 使用已验证的 Wrangler 命令发布 `dist/`。
3. 抽查 `https://sensormaru.com/` 的中英文姓名、GitHub 账号、项目简介、技能标题、邮箱和移动端项目弹窗。
4. 使用真实 iPhone 17 Chrome 复查项目详情关闭流程。
5. 后续补充正式 E2E 测试，覆盖语言切换、联系区顺序、项目弹窗和手机端无横向溢出。
