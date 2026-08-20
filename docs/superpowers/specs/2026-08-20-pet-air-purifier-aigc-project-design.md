# 宠物移动净化器 AIGC 宣传片项目卡片设计

日期：2026-08-20

## 目标

在个人网站项目列表中新增“宠物移动净化器AIGC宣传片”项目，放在“园区招商前沿动态推送平台”之后。桌面三列布局中，新项目位于第二行第二列；移动端按相同数据顺序单列展示。

项目详情复用 `360 Screenshot` 的单视频展示方式，但该项目没有外部项目地址，因此卡片封面和详情弹窗均不显示“访问项目”按钮。

## 内容

### 中文

- 项目名称：`宠物移动净化器AIGC宣传片`
- 项目介绍：`邦泽创科-宠物净化器AIGC宣传`
- 项目背景：`对接邦泽创科企业需求，为其新产品发布制作AIGC宣传片，突出产品使用场景和核心功能`
- 核心功能：
  1. `精准避障，温柔穿行`
  2. `深层吸附，不留死角`
  3. `底吸侧吸，双重净化`
  4. `集毛系统，轻松清理`

### 英文

- 项目名称：`Pet Mobile Air Purifier AIGC Promo Film`
- 项目介绍：`An AIGC promotional film for BONSEN's pet air purifier.`
- 项目背景：`Created for BONSEN's new product launch to present the pet air purifier's real-life use scenarios and core functions.`
- 核心功能：
  1. `Precision obstacle avoidance for smooth, gentle movement.`
  2. `Deep adsorption that reaches overlooked areas.`
  3. `Bottom and side intake for dual purification.`
  4. `Integrated fur collection for easy cleanup.`

## 数据结构

- 新项目 slug：`pet-mobile-air-purifier-aigc-film`
- 项目对象追加到 `src/content/projects.ts` 数组末尾。
- `ProjectItem.url` 从必填字符串调整为可选字符串。
- 新项目不设置 `url`，不用空字符串、占位链接或 slug 特判表达无外链状态。
- 卡片元信息：
  - `role`: `AIGC 宣传片`
  - `period`: `已完成`
  - `cardBadge`: `AI`
  - `cardEyebrow`: `AIGC PRODUCT FILM`
  - `cardTag`: `PET PURIFIER`
- 英文角色和状态：
  - `role`: `AIGC Promo Film`
  - `period`: `Completed`

## 媒体

- 用户提供的封面图原样复制为：
  `public/project-images/pet-mobile-air-purifier-aigc-film.png`
- 用户提供的视频原样复制为：
  `public/project-videos/pet-mobile-air-purifier-aigc-film.mp4`
- `detailVideo` 使用 `video/mp4`，封面图同时作为视频 poster。
- 中文图片替代文本：
  `宠物移动净化器在家居场景中的产品画面`
- 英文图片替代文本：
  `Pet mobile air purifier in a home setting`

本轮不裁剪、不转码、不重新压缩用户提供的图片和视频。

## 组件行为

### 项目卡片

- 整张卡片继续使用现有详情触发按钮，可点击打开详情弹窗。
- 仅当项目存在非空 `url` 时渲染 `.project-card-visit`。
- 新项目不渲染卡片封面上的“访问项目”按钮。
- 其他已有项目的访问链接和打开方式保持不变。

### 详情弹窗

- 复用现有 `detailVideo` 分支，展示一个带原生控制栏的视频。
- 视频默认静音自动播放、支持行内播放，并使用封面图作为 poster。
- 关闭弹窗时暂停视频并将播放位置重置为开头。
- 仅当项目存在非空 `url` 时显示 `.project-dialog-visit` 并设置链接。
- 新项目打开详情时隐藏详情弹窗中的“访问项目”按钮；切换打开其他有链接项目时按钮必须恢复显示。
- 单视频项目继续禁用轮播前后按钮。

## 校验与测试

内容校验应覆盖：

- 新 slug 存在，且完整项目顺序为：
  `global-design-award-museum -> wm-tracking-demo -> 360-screenshot -> park-investment-intelligence -> pet-mobile-air-purifier-aigc-film`
- 中文名称、介绍、背景和四条核心功能与需求一致。
- 封面图、详情视频和 poster 路径正确。
- 新项目未设置 `url`。
- 英文标题、介绍、背景、角色、状态、图片替代文本和四条核心功能完整。
- 卡片组件和详情弹窗都依据 `url` 条件显示访问入口，不使用 slug 特判。

浏览器回归应覆盖：

- 桌面端前三张卡片保持第一行，园区项目位于第二行第一列，新项目位于第二行第二列。
- 移动端五张卡片按数据顺序单列展示，无横向溢出。
- 新卡片点击后能打开详情弹窗。
- 视频能加载、显示原生控制栏，并以封面图作为 poster。
- 新项目卡片和详情弹窗中均不存在“访问项目”按钮。
- 关闭新项目后打开有外链的项目，访问按钮正常恢复且链接未被污染。
- 浏览器控制台无错误。

## 修改范围

预计修改：

- `src/content/projects.ts`
- `src/components/ProjectCard.astro`
- `src/pages/index.astro`
- `scripts/validate-content.ts`
- `public/project-images/pet-mobile-air-purifier-aigc-film.png`
- `public/project-videos/pet-mobile-air-purifier-aigc-film.mp4`
- `PROJECT_STATUS.md`

不修改：

- 现有项目文案、图片、视频和外链
- 个人姓名及英文姓名
- GitHub 品牌文案 `sensorMaru`
- 项目卡片和详情弹窗的整体视觉样式

## 完成标准

- 新项目内容、顺序、封面和视频符合本设计。
- 两处“访问项目”入口均按数据状态正确显示或隐藏。
- 内容校验、生产构建、差异检查通过。
- 桌面端和移动端浏览器回归通过。
- `PROJECT_STATUS.md` 记录最终实现、验证结果和后续发布状态。
