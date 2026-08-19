# 个人项目卡片顺序调整设计

日期：2026-08-19

## 目标

调整个人项目的数据顺序，使三列桌面布局呈现为：

1. 第一行第一列：`Global Design Award Museum`
2. 第一行第二列：`可视化埋点事件地图`
3. 第一行第三列：`360 Screenshot`
4. 第二行第一列：`园区招商前沿动态推送平台`

移动端继续使用现有单列布局，并按同一数据顺序展示。

## 实现方案

- 在 `src/content/projects.ts` 中将 `park-investment-intelligence` 项目移动到项目数组末尾。
- 不修改 `ProjectCard.astro`、首页项目网格结构或 CSS。
- 更新 `scripts/validate-content.ts` 的顺序校验，要求项目顺序为：
  `global-design-award-museum -> wm-tracking-demo -> 360-screenshot -> park-investment-intelligence`。
- 项目内容、图片、详情轮播和外链均保持不变。

## 验证

- 先修改顺序校验并运行 `npm run validate:content`，确认旧顺序触发预期失败。
- 重排项目数组后再次运行内容校验和生产构建。
- 在桌面三列视口确认前三张卡片位于第一行，园区项目位于第二行第一列。
- 在移动端确认四张卡片保持单列、无横向溢出。
