# 项目交接状态

更新时间：2026-08-19

当前分支：`main`

当前状态：个人项目卡片顺序已完成修正并通过内容校验、生产构建及桌面/移动端浏览器回归。当前分支包含本轮本地提交与实现结果，尚未推送或发布。

Git 基线：

- `c7ef8ed Add park investment intelligence project card` 已存在于 `origin/main`。
- 本轮设计与计划提交为 `c1ea428`、`34f0670`，当前尚未推送。

## 当前目标

调整个人项目卡片顺序，使桌面三列布局为：

1. 第一行第一列：`Global Design Award Museum`
2. 第一行第二列：`可视化埋点事件地图`
3. 第一行第三列：`360 Screenshot`
4. 第二行第一列：`园区招商前沿动态推送平台`

移动端继续使用现有单列布局，并按相同数据顺序展示。

## 已完成内容

- 将 `park-investment-intelligence` 项目从数组第二项移动到数组末尾。
- 当前项目 slug 顺序为：
  `global-design-award-museum -> wm-tracking-demo -> 360-screenshot -> park-investment-intelligence`。
- 更新内容校验，锁定上述完整顺序。
- 项目名称、简介、背景、核心功能、图片、详情轮播和外链均未修改。
- 卡片组件、首页模板和 CSS 均未修改。
- 已新增并提交本轮设计与实施计划：
  - `c1ea428 docs: specify project card order`
  - `34f0670 docs: plan project card order fix`

## 关键技术决策

- 继续由 `src/content/projects.ts` 的数组顺序驱动卡片位置，复用 CSS Grid 默认自动排布。
- 不使用单卡片 `order`、`grid-column` 或 `grid-row` 覆盖，避免桌面与移动端出现两套顺序逻辑。
- 校验完整 slug 顺序，而不是只校验两张卡片的相邻关系，防止后续新增或移动卡片时破坏首行布局。

## 修改过的核心文件

- `src/content/projects.ts`：重排项目对象，不修改对象内容。
- `scripts/validate-content.ts`：将旧的相邻关系校验替换为完整项目顺序校验。
- `PROJECT_STATUS.md`：更新本轮交接状态。
- `docs/superpowers/specs/2026-08-19-project-card-order-design.md`：顺序调整设计。
- `docs/superpowers/plans/2026-08-19-project-card-order.md`：测试先行实施计划。

## 测试与验证结果

2026-08-19：

- RED：只更新顺序校验后，`npm run validate:content` 按预期失败：
  `Project cards must match the requested desktop grid order`。
- GREEN：重排项目数组后，`npm run validate:content` 通过。
- 数据顺序检查输出：
  `global-design-award-museum -> wm-tracking-demo -> 360-screenshot -> park-investment-intelligence`。
- `git diff --check` 通过。
- `npm run build` 通过；Astro 5.18.2 成功生成 1 个静态页面。
- 桌面端 `1440 x 1000` 浏览器回归通过：
  - 前三张卡片位于同一行，横坐标依次为 `6`、`482`、`957`。
  - 园区项目位于第二行第一列，横坐标为 `6`。
  - 页面横向溢出为 `0`。
- 移动端 `393 x 852` 浏览器回归通过：
  - 四张卡片按目标数据顺序单列展示。
  - 卡片左右边界一致，单卡片及页面横向溢出均为 `0`。
- 浏览器错误日志为空。

## 已知问题

- 当前分支尚未推送到 GitHub。
- 本轮顺序修正尚未发布到 `https://sensormaru.com/`。
- 仓库没有自动化 E2E；本轮通过浏览器手动测量卡片位置和溢出完成回归。

## 尝试过但失败的方案

- 无。本轮按已确认的数据重排方案执行，未尝试 CSS 强制定位。

## 下一步开发顺序

1. 将本地提交推送到 GitHub。
2. 发布到 `https://sensormaru.com/`。
3. 发布后复核生产环境桌面三列顺序、移动端单列顺序和项目详情入口。
