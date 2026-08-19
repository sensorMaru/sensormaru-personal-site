# 项目交接状态

更新时间：2026-08-19

当前分支：`main`

当前状态：`园区招商前沿动态推送平台` 项目卡片已在本地实现并完成内容、构建和浏览器回归；实现改动尚未提交、推送或发布。当前分支相对 `origin/main` 领先 2 个设计/实施文档提交。

生产基线：上一轮实现提交 `1926e6f` 已发布到 `https://sensormaru.com/`；本轮新增项目卡片尚未上线。

## 当前目标

在个人网站项目列表中新增 `园区招商前沿动态推送平台`，紧跟在 `Global Design Award Museum` 下方，并复用现有项目卡片和详情弹窗样式。

交付内容包括：

1. 使用用户提供的中文项目名称、简介、背景和 5 条核心功能。
2. 卡片封面使用用户提供的图 1。
3. 详情页轮播按图 2、图 3、图 4 的顺序展示。
4. “访问项目”链接指向 `https://park.sensormaru.com/`。
5. 保持现有中英文切换、响应式卡片和详情弹窗行为一致。

## 已完成内容

- 在 `Global Design Award Museum` 与 `可视化埋点事件地图` 之间新增项目数据，slug 为 `park-investment-intelligence`。
- 中文项目名称、简介、背景和 5 条核心功能已按用户提供内容录入。
- 已补充完整英文翻译，包括标题、简介、背景、图片替代文本和 5 条核心功能。
- 卡片封面已保存为 `public/project-images/park-investment-intelligence.png`。
- 三张详情图已按指定顺序保存到 `public/project-detail-images/`。
- 项目外链已设置为 `https://park.sensormaru.com/`。
- 未修改现有卡片组件、详情弹窗组件或全局样式；新增项目直接复用现有内容驱动渲染。
- 内容校验脚本已增加项目存在性、排序、中文文案、外链、图片顺序和双语完整性检查。
- 已新增并提交设计说明与实施计划：
  - `c869dcf docs: specify park intelligence project card`
  - `d246323 docs: plan park intelligence project card`

## 关键技术决策

- 项目仍由 `src/content/projects.ts` 单一数据源驱动，首页卡片和详情弹窗不新增分支逻辑。
- 项目顺序通过数组位置控制，并在校验脚本中强制新项目紧跟 `global-design-award-museum`。
- 保留用户提供 PNG 的原始画面和比例，不裁剪、不转码；现有 `object-fit` 和轮播布局负责响应式展示。
- 详情轮播固定使用 `dispatch -> dataset -> source` 顺序，对应用户提供的图 2、图 3、图 4。
- 本轮不修改个人姓名、GitHub 展示账号或 `sensorMaru` 品牌文案。

## 修改过的核心文件

- `src/content/projects.ts`：新增项目中英文数据、封面、轮播图、外链和核心功能。
- `scripts/validate-content.ts`：新增项目排序、文案、媒体和翻译完整性校验。
- `public/project-images/park-investment-intelligence.png`：项目卡片封面。
- `public/project-detail-images/park-investment-intelligence-dispatch.png`：详情轮播第 1 张。
- `public/project-detail-images/park-investment-intelligence-dataset.png`：详情轮播第 2 张。
- `public/project-detail-images/park-investment-intelligence-source.png`：详情轮播第 3 张。
- `docs/superpowers/specs/2026-08-19-park-investment-intelligence-project-card-design.md`：已确认设计说明。
- `docs/superpowers/plans/2026-08-19-park-investment-intelligence-project-card.md`：实施与验证计划。
- `PROJECT_STATUS.md`：本交接文档。

## 测试与验证结果

2026-08-19 本地验证：

- 测试先行 RED：只增加校验后，`npm run validate:content` 按预期报错 `Missing project: park-investment-intelligence`。
- 实现后 GREEN：`npm run validate:content` 通过。
- `npm run build` 通过，Astro 5.18.2 生成 1 个静态页面到 `dist/`。
- `git diff --check` 通过。
- 图片尺寸：
  - 封面：`1058 x 864`。
  - 三张详情图：均为 `2560 x 1352`。
- 桌面视口 `1280 x 720`：
  - 卡片顺序为 `Global Design Award Museum -> 园区招商前沿动态推送平台 -> 可视化埋点事件地图`。
  - 新卡片宽度、圆角和布局与相邻项目一致，无横向溢出。
  - 中文详情文案、5 条核心功能、外链和 3 张轮播图顺序正确。
  - 轮播前进到第 2、3 张时分别应用 `translateX(-100%)`、`translateX(-200%)`。
- 手机视口 `393 x 852`：
  - 中文和英文卡片均无文本或页面横向溢出。
  - 详情弹窗、访问按钮、关闭按钮不重叠。
  - 弹窗内部滚动后关闭按钮仍保持可见并可正常关闭。
  - 三张轮播图加载成功，移动端轮播切换正常。
- 英文状态：
  - 标题、简介、背景、5 条核心功能和 3 个图片替代文本均正确显示。
  - 项目外链保持 `https://park.sensormaru.com/`。
- 浏览器 error 日志为空。

## 已知问题

- 本轮实现改动和图片仍在工作区，尚未创建实现提交，也未推送到 GitHub。
- 本轮新增项目尚未发布到 `https://sensormaru.com/`。
- 尚未在真实手机浏览器上回归；当前手机结果来自 Chromium `393 x 852` 视口测试。
- 仓库当前没有自动化 E2E；轮播交互和响应式布局仍依赖浏览器回归。

## 尝试过但失败的方案

- 浏览器只读脚本环境不支持使用 `window.resizeTo` 调整视口；改用浏览器插件提供的 viewport capability 后完成桌面和手机回归。
- 在详情弹窗保持打开时直接切换桌面与手机视口，曾出现旧弹窗状态残留的横向滚动显示；关闭并在目标视口重新打开后，页面和弹窗横向溢出均为 0，未发现实际布局回归。

## 下一步开发顺序

1. 复核最终 Git diff、图片校验值和完整测试结果。
2. 为本轮实现创建提交并推送到 GitHub。
3. 发布到 `https://sensormaru.com/`，核对生产站点卡片顺序、双语详情、轮播和外链。
4. 使用真实手机浏览器复查项目详情打开、滚动、轮播与关闭流程。
5. 后续补充自动化 E2E，覆盖项目排序、语言切换、详情轮播和移动端无横向溢出。
