# 园区招商前沿动态推送平台项目卡片设计

## 目标

在个人网站的“个人项目”区域新增“园区招商前沿动态推送平台”项目卡片，并让项目详情弹窗展示三张产品截图和用户提供的项目背景、核心功能。项目访问链接固定为 `https://park.sensormaru.com/`。

## 内容与顺序

- 新项目放在 `Global Design Award Museum` 后、`可视化埋点事件地图` 前。
- 中文项目名称、介绍、背景和五项核心功能严格采用用户提供的内容，仅做现有数据结构需要的标点整理。
- 英文模式提供对应的自然英文翻译，姓名、品牌名和其他既有项目内容不做修改。
- 项目标识使用 `park-investment-intelligence`。
- 卡片元信息使用：
  - `cardBadge`: `PARK`
  - `cardEyebrow`: `PARK INVESTMENT INTELLIGENCE`
  - `cardTag`: `DISPATCH`
  - `role`: `项目作品`
  - `period`: `已上线`

## 图片

- 图 1 复制为 `/project-images/park-investment-intelligence.png`，用于项目卡片封面。
- 图 2 复制为 `/project-detail-images/park-investment-intelligence-dispatch.png`，作为详情轮播第一张。
- 图 3 复制为 `/project-detail-images/park-investment-intelligence-dataset.png`，作为详情轮播第二张。
- 图 4 复制为 `/project-detail-images/park-investment-intelligence-source.png`，作为详情轮播第三张。
- 保留附件原始 PNG 内容和尺寸，不裁剪、不重绘。
- 每张图片均提供与画面内容相符的中英文替代文本。

## 页面行为

- 项目卡片完全复用现有 `ProjectCard` 组件及样式，不新增专属布局或视觉规则。
- 点击卡片主体打开现有项目详情弹窗。
- 详情弹窗继续复用现有轮播、前后切换、自动轮播和关闭行为。
- 卡片与详情弹窗中的“访问项目”均在新标签页打开 `https://park.sensormaru.com/`。
- 中英文切换继续使用现有项目翻译数据和页面脚本。

## 数据与代码边界

- 项目内容只写入 `src/content/projects.ts`。
- 图片只新增到现有 `public/project-images` 和 `public/project-detail-images` 目录。
- 不修改 `ProjectCard.astro`、详情弹窗结构或全局样式，除非验证发现新内容暴露出现有通用布局缺陷；此类问题需单独确认后处理。

## 验证

- 先扩展 `scripts/validate-content.ts`，让校验因项目尚未加入而按预期失败。
- 加入项目数据和图片后，内容校验必须确认：
  - 项目标识存在且顺序正确。
  - 中文名称、介绍、背景、五项核心功能和访问链接正确。
  - 封面图、三张详情图及英文翻译完整。
- 运行项目现有测试、内容校验和生产构建。
- 在桌面端和移动端检查：
  - 新卡片位于指定位置且样式与其他卡片一致。
  - 中英文卡片文字无溢出或遮挡。
  - 详情弹窗三张轮播图可显示和切换。
  - “访问项目”链接目标正确。

## 非目标

- 不修改用户姓名英文、GitHub 文案或 `sensorMaru` 品牌大小写。
- 不调整其他项目的顺序、内容、图片或链接。
- 不改造项目卡片和详情弹窗的通用设计。
- 本次任务不包含提交、推送或线上发布，除非用户另行要求。
