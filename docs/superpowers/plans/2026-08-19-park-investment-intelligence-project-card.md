# 园区招商前沿动态推送平台项目卡片 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在个人网站中新增“园区招商前沿动态推送平台”项目卡片、三张详情轮播图和完整双语内容，并放在 `Global Design Award Museum` 下方。

**Architecture:** 继续使用 `src/content/projects.ts` 作为项目卡片与详情弹窗的唯一数据源，复用现有 `ProjectCard`、项目详情弹窗和轮播逻辑。附件原图复制到现有静态资源目录，通过内容校验锁定顺序、文案、链接、图片和翻译完整性。

**Tech Stack:** Astro 5、TypeScript、Node.js/tsx 内容校验、Playwright 浏览器回归

## Global Constraints

- 新项目必须紧跟 `global-design-award-museum`，位于 `wm-tracking-demo` 之前。
- 项目标识固定为 `park-investment-intelligence`。
- 项目链接固定为 `https://park.sensormaru.com/`。
- 图 1 作为卡片封面；图 2、图 3、图 4 按此顺序作为详情轮播图。
- 完全复用现有项目卡片与详情弹窗样式，不新增专属 CSS 或组件分支。
- 不修改姓名英文、GitHub 文案、`sensorMaru` 品牌大小写或其他项目内容。
- 不提交密码、密钥、令牌或本机认证信息。

---

### Task 1: 项目数据、图片与内容校验

**Files:**
- Modify: `scripts/validate-content.ts`
- Modify: `src/content/projects.ts`
- Create: `public/project-images/park-investment-intelligence.png`
- Create: `public/project-detail-images/park-investment-intelligence-dispatch.png`
- Create: `public/project-detail-images/park-investment-intelligence-dataset.png`
- Create: `public/project-detail-images/park-investment-intelligence-source.png`

**Interfaces:**
- Consumes: 现有 `ProjectItem` 类型、`projects` 数组、`ProjectCard` 和详情弹窗的数据绑定。
- Produces: `slug === 'park-investment-intelligence'` 的完整 `ProjectItem`，供首页卡片和详情弹窗直接渲染。

- [ ] **Step 1: 写入会失败的内容校验**

在 `requiredProjectSlugs` 中把 `park-investment-intelligence` 放在 `global-design-award-museum` 后面，并加入以下校验：

```ts
const parkInvestmentProject = projects.find(
  (project) => project.slug === 'park-investment-intelligence'
);
const globalDesignIndex = projects.findIndex(
  (project) => project.slug === 'global-design-award-museum'
);
const parkInvestmentIndex = projects.findIndex(
  (project) => project.slug === 'park-investment-intelligence'
);

if (
  globalDesignIndex === -1 ||
  parkInvestmentIndex !== globalDesignIndex + 1
) {
  throw new Error('Park investment intelligence project must follow Global Design Award Museum');
}

if (
  parkInvestmentProject?.title !== '园区招商前沿动态推送平台' ||
  parkInvestmentProject.summary !==
    '一个自动追踪重点园区招商动态、提炼招商打法与举措的园区情报工作台。' ||
  parkInvestmentProject.details !==
    '解决人工逐个搜索园区微信公众号、阅读文章、整理招商信息效率低且难持续更新的问题。' ||
  parkInvestmentProject.url !== 'https://park.sensormaru.com/' ||
  parkInvestmentProject.highlights.length !== 5
) {
  throw new Error('Park investment intelligence project content must match the requested copy');
}

if (
  parkInvestmentProject.image?.src !==
    '/project-images/park-investment-intelligence.png' ||
  parkInvestmentProject.detailImages?.map((image) => image.src).join('|') !==
    [
      '/project-detail-images/park-investment-intelligence-dispatch.png',
      '/project-detail-images/park-investment-intelligence-dataset.png',
      '/project-detail-images/park-investment-intelligence-source.png'
    ].join('|') ||
  parkInvestmentProject.translations?.en?.highlights?.length !== 5 ||
  parkInvestmentProject.translations.en.detailImageAlts?.length !== 3
) {
  throw new Error('Park investment intelligence project media and translations must be complete');
}
```

- [ ] **Step 2: 运行校验并确认按预期失败**

Run: `npm run validate:content`

Expected: FAIL with `Missing project: park-investment-intelligence`.

- [ ] **Step 3: 复制四张用户附件到静态资源目录**

Run:

```bash
cp '/var/folders/_d/4ddh67750fz8kvcbvn4g_ffc0000gn/T/codex-clipboard-6a105ca3-9d18-4faa-97d4-d319d7542a5d.png' public/project-images/park-investment-intelligence.png
cp '/var/folders/_d/4ddh67750fz8kvcbvn4g_ffc0000gn/T/codex-clipboard-6d416cf4-6d28-4591-b275-e7b39a791fef.png' public/project-detail-images/park-investment-intelligence-dispatch.png
cp '/var/folders/_d/4ddh67750fz8kvcbvn4g_ffc0000gn/T/codex-clipboard-d3e849f1-4c9e-4b51-aed6-400306ac173f.png' public/project-detail-images/park-investment-intelligence-dataset.png
cp '/var/folders/_d/4ddh67750fz8kvcbvn4g_ffc0000gn/T/codex-clipboard-ec02906e-499b-43bd-a0be-bb216f227a95.png' public/project-detail-images/park-investment-intelligence-source.png
```

- [ ] **Step 4: 在指定顺序写入项目数据**

在 `global-design-award-museum` 项目对象后加入：

```ts
{
  slug: 'park-investment-intelligence',
  title: '园区招商前沿动态推送平台',
  summary: '一个自动追踪重点园区招商动态、提炼招商打法与举措的园区情报工作台。',
  details:
    '解决人工逐个搜索园区微信公众号、阅读文章、整理招商信息效率低且难持续更新的问题。',
  role: '项目作品',
  period: '已上线',
  url: 'https://park.sensormaru.com/',
  cardBadge: 'PARK',
  cardEyebrow: 'PARK INVESTMENT INTELLIGENCE',
  cardTag: 'DISPATCH',
  image: {
    src: '/project-images/park-investment-intelligence.png',
    alt: '园区招商前沿动态推送平台最新推送页面预览'
  },
  detailImages: [
    {
      src: '/project-detail-images/park-investment-intelligence-dispatch.png',
      alt: '园区招商前沿动态推送平台最新推送视图'
    },
    {
      src: '/project-detail-images/park-investment-intelligence-dataset.png',
      alt: '园区招商前沿动态推送平台全量数据视图'
    },
    {
      src: '/project-detail-images/park-investment-intelligence-source.png',
      alt: '园区招商前沿动态推送平台原始公众号文章视图'
    }
  ],
  highlights: [
    '自动汇总重点园区的招商动态、公众号文章与参考链接。',
    '提炼“2026年招商工作如何卷”和“2026年招商工作举措”等关键信息。',
    '支持按省、市、状态和关键词筛选检索全量园区数据。',
    '提供最新推送的周、月、季视图，按文章发布时间展示近期动态。',
    '支持收藏重点园区动态，并在“已收藏”中集中查看。'
  ],
  translations: {
    en: {
      title: 'Industrial Park Investment Intelligence Platform',
      summary:
        'An industrial park intelligence workspace that automatically tracks key investment attraction updates and distills practical strategies and initiatives.',
      details:
        'It addresses the inefficiency and poor continuity of manually searching industrial park WeChat accounts, reading articles, and organizing investment attraction information one source at a time.',
      role: 'Project',
      period: 'Live',
      imageAlt: 'Industrial Park Investment Intelligence Platform latest dispatch preview',
      detailImageAlts: [
        'Industrial Park Investment Intelligence Platform latest dispatch view',
        'Industrial Park Investment Intelligence Platform complete dataset view',
        'Industrial Park Investment Intelligence Platform source WeChat article view'
      ],
      highlights: [
        'Automatically aggregates investment attraction updates, WeChat articles, and reference links from priority industrial parks.',
        'Distills key intelligence such as how investment attraction teams compete in 2026 and the initiatives they are taking.',
        'Supports full-dataset filtering and search by province, city, status, and keyword.',
        'Provides weekly, monthly, and quarterly views of recent dispatches ordered by article publication time.',
        'Lets users save priority updates and review them in a centralized Favorites view.'
      ]
    }
  }
}
```

- [ ] **Step 5: 运行内容校验并确认通过**

Run: `npm run validate:content`

Expected: PASS with exit code 0.

- [ ] **Step 6: 检查素材路径和尺寸**

Run:

```bash
sips -g pixelWidth -g pixelHeight \
  public/project-images/park-investment-intelligence.png \
  public/project-detail-images/park-investment-intelligence-dispatch.png \
  public/project-detail-images/park-investment-intelligence-dataset.png \
  public/project-detail-images/park-investment-intelligence-source.png
```

Expected: 封面为 `1058 x 864`，三张详情图均为 `2560 x 1352`。

### Task 2: 构建、视觉回归与项目交接

**Files:**
- Modify: `PROJECT_STATUS.md`

**Interfaces:**
- Consumes: Task 1 中新增的项目数据和静态图片。
- Produces: 可继续执行的验证记录和当前项目状态。

- [ ] **Step 1: 运行生产构建和差异检查**

Run:

```bash
npm run build
git diff --check
```

Expected: Astro 构建成功，`git diff --check` 无输出。

- [ ] **Step 2: 启动本地开发服务器**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite 输出可访问的本地 URL；如默认端口被占用则使用下一个可用端口。

- [ ] **Step 3: 在桌面视口验证**

使用 Playwright 打开本地首页，设置 `1280 x 720`，确认：

- 项目顺序为 `Global Design Award Museum`、`园区招商前沿动态推送平台`、`可视化埋点事件地图`、`360 Screenshot`。
- 新项目卡片的边框、间距、图片比例、悬停和“访问项目”按钮与其他卡片一致。
- 打开详情后标题、背景、五项核心功能和三张轮播图完整显示。
- 轮播前后切换可到达三张图片。
- “访问项目”的 `href` 为 `https://park.sensormaru.com/`。
- 英文模式下项目标题、简介、背景、功能与图片替代文本可切换。

- [ ] **Step 4: 在移动视口验证**

设置 `393 x 852`，确认：

- 新项目卡片没有文字溢出、遮挡或横向滚动。
- 项目详情弹窗可打开、滚动和关闭。
- 三张轮播图可显示和切换。
- “访问项目”与关闭按钮不重叠。

- [ ] **Step 5: 更新交接文档**

在 `PROJECT_STATUS.md` 中记录：

- 当前目标变更为新增园区招商项目卡片。
- 已完成的数据、图片、双语内容、顺序和链接。
- 未修改组件/CSS的技术决策。
- 实际执行的内容校验、构建和浏览器验证结果。
- 仍存在的真实已知问题，不保留已解决且与后续开发无关的讨论。

- [ ] **Step 6: 最终复验**

Run:

```bash
npm run validate:content
npm run build
git diff --check
git status --short
```

Expected: 校验与构建通过，无空白错误；Git 状态只包含本次项目卡片、图片、计划和交接文档变更。
