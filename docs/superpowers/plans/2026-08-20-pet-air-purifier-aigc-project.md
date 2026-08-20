# Pet Air Purifier AIGC Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual pet mobile air purifier AIGC promo project with the supplied cover and video, positioned in the second desktop row and without visit-project links.

**Architecture:** Keep projects content-driven through `src/content/projects.ts`, reuse the existing single-video detail renderer, and represent projects without external destinations by making `ProjectItem.url` optional. Both card and dialog visit controls derive their visibility from the same optional URL instead of project-specific conditions.

**Tech Stack:** Astro 5, TypeScript, native HTML video, repository content validation script, CSS Grid.

## Global Constraints

- The project slug is `pet-mobile-air-purifier-aigc-film`.
- The complete project order is `global-design-award-museum -> wm-tracking-demo -> 360-screenshot -> park-investment-intelligence -> pet-mobile-air-purifier-aigc-film`.
- Desktop placement is second row, second column; mobile placement follows the same data order in one column.
- The supplied PNG and MP4 must be copied without cropping, transcoding, or recompression.
- The new project has no `url`; both card and dialog visit controls must be absent or hidden for it.
- Existing project copy, media, links, card styling, personal names, and the `sensorMaru` GitHub branding must remain unchanged.

---

### Task 1: Add the Project Content and Media

**Files:**
- Modify: `scripts/validate-content.ts`
- Modify: `src/content/projects.ts`
- Create: `public/project-images/pet-mobile-air-purifier-aigc-film.png`
- Create: `public/project-videos/pet-mobile-air-purifier-aigc-film.mp4`

**Interfaces:**
- Consumes: `ProjectItem` and exported `projects: ProjectItem[]` from `src/content/projects.ts`.
- Produces: a fifth project object with `image` and `detailVideo` data consumed by the existing project card and detail renderer.

- [ ] **Step 1: Write the failing project-content validation**

Add the new slug to `requiredProjectSlugs`, append it to `expectedProjectOrder`, and add these assertions after the existing park project validation:

```ts
const petAirPurifierProject = projects.find(
  (project) => project.slug === 'pet-mobile-air-purifier-aigc-film'
);

if (
  petAirPurifierProject?.title !== '宠物移动净化器AIGC宣传片' ||
  petAirPurifierProject.summary !== '邦泽创科-宠物净化器AIGC宣传' ||
  petAirPurifierProject.details !==
    '对接邦泽创科企业需求，为其新产品发布制作AIGC宣传片，突出产品使用场景和核心功能' ||
  petAirPurifierProject.url !== undefined ||
  petAirPurifierProject.highlights.join('|') !==
    ['精准避障，温柔穿行', '深层吸附，不留死角', '底吸侧吸，双重净化', '集毛系统，轻松清理'].join('|')
) {
  throw new Error('Pet air purifier AIGC project content must match the requested copy');
}

if (
  petAirPurifierProject.image?.src !==
    '/project-images/pet-mobile-air-purifier-aigc-film.png' ||
  petAirPurifierProject.detailVideo?.src !==
    '/project-videos/pet-mobile-air-purifier-aigc-film.mp4' ||
  petAirPurifierProject.detailVideo.type !== 'video/mp4' ||
  petAirPurifierProject.detailVideo.poster !==
    '/project-images/pet-mobile-air-purifier-aigc-film.png' ||
  petAirPurifierProject.translations?.en?.title !==
    'Pet Mobile Air Purifier AIGC Promo Film' ||
  petAirPurifierProject.translations.en.highlights?.length !== 4
) {
  throw new Error('Pet air purifier AIGC project media and translations must be complete');
}
```

- [ ] **Step 2: Run the validator and confirm RED**

Run:

```bash
npm run validate:content
```

Expected: FAIL with `Missing project: pet-mobile-air-purifier-aigc-film`.

- [ ] **Step 3: Copy the supplied media without modification**

Run:

```bash
cp '/var/folders/_d/4ddh67750fz8kvcbvn4g_ffc0000gn/T/codex-clipboard-5891eefd-0bbf-4d98-90ff-c22089ee4d15.png' \
  'public/project-images/pet-mobile-air-purifier-aigc-film.png'
cp '/Users/xy/Downloads/宠物空净AI视频.mp4' \
  'public/project-videos/pet-mobile-air-purifier-aigc-film.mp4'
shasum -a 256 \
  '/var/folders/_d/4ddh67750fz8kvcbvn4g_ffc0000gn/T/codex-clipboard-5891eefd-0bbf-4d98-90ff-c22089ee4d15.png' \
  'public/project-images/pet-mobile-air-purifier-aigc-film.png'
shasum -a 256 \
  '/Users/xy/Downloads/宠物空净AI视频.mp4' \
  'public/project-videos/pet-mobile-air-purifier-aigc-film.mp4'
```

Expected: each source/destination pair has identical SHA-256 hashes.

- [ ] **Step 4: Add the project object**

Append this object after `park-investment-intelligence`:

```ts
{
  slug: 'pet-mobile-air-purifier-aigc-film',
  title: '宠物移动净化器AIGC宣传片',
  summary: '邦泽创科-宠物净化器AIGC宣传',
  details:
    '对接邦泽创科企业需求，为其新产品发布制作AIGC宣传片，突出产品使用场景和核心功能',
  role: 'AIGC 宣传片',
  period: '已完成',
  cardBadge: 'AI',
  cardEyebrow: 'AIGC PRODUCT FILM',
  cardTag: 'PET PURIFIER',
  image: {
    src: '/project-images/pet-mobile-air-purifier-aigc-film.png',
    alt: '宠物移动净化器在家居场景中的产品画面'
  },
  detailVideo: {
    src: '/project-videos/pet-mobile-air-purifier-aigc-film.mp4',
    type: 'video/mp4',
    poster: '/project-images/pet-mobile-air-purifier-aigc-film.png'
  },
  highlights: [
    '精准避障，温柔穿行',
    '深层吸附，不留死角',
    '底吸侧吸，双重净化',
    '集毛系统，轻松清理'
  ],
  translations: {
    en: {
      title: 'Pet Mobile Air Purifier AIGC Promo Film',
      summary: "An AIGC promotional film for BONSEN's pet air purifier.",
      details:
        "Created for BONSEN's new product launch to present the pet air purifier's real-life use scenarios and core functions.",
      role: 'AIGC Promo Film',
      period: 'Completed',
      imageAlt: 'Pet mobile air purifier in a home setting',
      highlights: [
        'Precision obstacle avoidance for smooth, gentle movement.',
        'Deep adsorption that reaches overlooked areas.',
        'Bottom and side intake for dual purification.',
        'Integrated fur collection for easy cleanup.'
      ]
    }
  }
}
```

- [ ] **Step 5: Run the validator and confirm the content is GREEN**

Run:

```bash
npm run validate:content
```

Expected: the content validator exits successfully. Do not run the production build until Task 2 makes `ProjectItem.url` optional and updates both visit-link consumers.

---

### Task 2: Support Projects Without Visit Links

**Files:**
- Modify: `scripts/validate-content.ts`
- Modify: `src/content/projects.ts`
- Modify: `src/components/ProjectCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `ProjectItem.url?: string`.
- Produces: conditional card link rendering and dialog-link state synchronized by `fillProject(project)`.

- [ ] **Step 1: Write the failing source validation**

Add source assertions that require data-driven conditional behavior:

```ts
if (
  !projectCardSource.includes('{project.url ? (') ||
  !projectCardSource.includes('class="project-card-visit"')
) {
  throw new Error('Project cards must render visit links only when a URL exists');
}

if (
  !indexSource.includes("url.toggleAttribute('hidden', !project.url)") ||
  !indexSource.includes("url.removeAttribute('href')")
) {
  throw new Error('Project dialog must hide and clear its visit link when a URL is absent');
}
```

- [ ] **Step 2: Run the validator and confirm RED**

Run:

```bash
npm run validate:content
```

Expected: FAIL with `Project cards must render visit links only when a URL exists`.

- [ ] **Step 3: Make the URL optional and conditionally render the card link**

Change the type:

```ts
url?: string;
```

In `ProjectCard.astro`, make the external-link calculation null-safe:

```ts
const isExternalProject = project.url ? /^https?:\/\//.test(project.url) : false;
```

Wrap the existing `.project-card-visit` anchor:

```astro
{project.url ? (
  <a
    class="project-card-visit"
    href={project.url}
    target={isExternalProject ? '_blank' : undefined}
    rel={isExternalProject ? 'noreferrer' : undefined}
    aria-label={`访问 ${project.title}`}
    data-i18n-aria-zh={`访问 ${project.title}`}
    data-i18n-aria-en={`Visit ${projectEn.title ?? project.title}`}
    data-i18n-zh="访问项目"
    data-i18n-en="Visit Project"
  >
    访问项目
  </a>
) : null}
```

- [ ] **Step 4: Synchronize the detail-dialog link state**

Replace the unconditional assignment in `fillProject(project)`:

```ts
url.toggleAttribute('hidden', !project.url);
if (project.url) {
  url.href = project.url;
} else {
  url.removeAttribute('href');
}
```

This must run every time a project is opened so a hidden no-link project cannot leak state into the next dialog.

- [ ] **Step 5: Confirm GREEN**

Run:

```bash
npm run validate:content
npm run build
git diff --check
```

Expected: all commands exit successfully; Astro builds one static page.

- [ ] **Step 6: Commit the functional implementation**

```bash
git add \
  scripts/validate-content.ts \
  src/content/projects.ts \
  src/components/ProjectCard.astro \
  src/pages/index.astro \
  public/project-images/pet-mobile-air-purifier-aigc-film.png \
  public/project-videos/pet-mobile-air-purifier-aigc-film.mp4
git commit -m "Add pet purifier AIGC project"
```

---

### Task 3: Verify Responsive and Media Behavior

**Files:**
- Modify: `PROJECT_STATUS.md`

**Interfaces:**
- Consumes: the built site and local Astro development server.
- Produces: verified desktop/mobile behavior and an accurate handoff document.

- [ ] **Step 1: Start the local site**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Astro reports a local URL, normally `http://127.0.0.1:4321/`.

- [ ] **Step 2: Verify desktop placement**

At `1440 x 1000`, confirm:

```text
Row 1: Global Design Award Museum | 可视化埋点事件地图 | 360 Screenshot
Row 2: 园区招商前沿动态推送平台 | 宠物移动净化器AIGC宣传片
```

Measure that the park and pet cards share the same `top` coordinate and that the pet card uses the second-column `left` coordinate. Confirm page horizontal overflow is `0`.

- [ ] **Step 3: Verify no-link and video behavior**

Open the pet project and confirm:

- The card contains no `.project-card-visit`.
- The dialog `.project-dialog-visit` is hidden and has no `href`.
- The dialog contains one `<video controls muted playsinline>`.
- The video source is `/project-videos/pet-mobile-air-purifier-aigc-film.mp4`.
- The poster is `/project-images/pet-mobile-air-purifier-aigc-film.png`.
- Closing the dialog pauses and resets the video.

Then open `360 Screenshot` and confirm its card/dialog visit links remain visible and point to `https://github.com/sensorMaru/360-screenshot-extension`.

- [ ] **Step 4: Verify mobile behavior and localization**

At `393 x 852`, confirm:

- All five cards render in the expected single-column order.
- Card and page horizontal overflow are `0`.
- The pet project title, summary, context, and four features switch completely between Chinese and English.
- The video dialog opens and closes without control overlap.

- [ ] **Step 5: Check browser errors**

Read the browser error log.

Expected: no JavaScript errors, failed media loads, or hydration errors.

- [ ] **Step 6: Update the handoff document**

Rewrite `PROJECT_STATUS.md` to include:

- Current goal and exact project order.
- Completed content, media, and no-link behavior.
- The optional-URL technical decision.
- Core files changed.
- RED/GREEN, build, desktop, mobile, video, and browser-log results.
- Confirmed known issues and deployment state only.
- Failed approaches only if they affected implementation.
- Next development order beginning with any remaining commit, push, or production deployment work.

- [ ] **Step 7: Run final verification**

Run:

```bash
npm run validate:content
npm run build
git diff --check
git status --short --branch
```

Expected: validation and build pass, diff check is clean, and only `PROJECT_STATUS.md` remains uncommitted after the functional commit.

- [ ] **Step 8: Commit the handoff update**

```bash
git add PROJECT_STATUS.md
git commit -m "docs: update pet purifier project status"
```
