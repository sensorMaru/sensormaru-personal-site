# SensorMaru Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a Chinese-first personal portfolio site for Shen Zhiyu on `sensormaru.com`, with concise internship copy, a featured project section, and a migration path for `design-award-meta-search`.

**Architecture:** Use Astro for a static-first homepage composed from structured content data and small reusable components. Keep content, layout, and deployment concerns separate so the site can evolve by editing data files instead of rewriting page markup.

**Tech Stack:** Astro, TypeScript, vanilla CSS, Cloudflare Pages, Cloudflare DNS, Node.js, tsx

## Global Constraints

- Primary language is Chinese.
- Internship entries must stay concise.
- Each company may use at most 4 bullet points.
- Each bullet point may contain at most 2 sentences.
- `design-award-meta-search` must appear in the project section first.
- The personal site must deploy to `sensormaru.com` on Cloudflare Pages.
- The design should stay clean, editorial, and sectioned.
- Additional project URLs will be added later without redesigning the page structure.

---

### Task 1: Scaffold the Astro site

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/pages/index.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/styles/global.css`

**Interfaces:**
- Consumes: Astro runtime, a single-page homepage entry.
- Produces: a working `npm run build` target and a minimal site shell for later content work.

- [ ] **Step 1: Create the project skeleton**

```bash
npm init -y
npm install astro
npm install -D typescript @types/node tsx
```

- [ ] **Step 2: Wire the base layout and homepage**

```astro
<!-- src/layouts/BaseLayout.astro -->
---
const { title = 'SensorMaru' } = Astro.props;
---
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Add a build check**

Run: `npm run build`
Expected: the starter site builds successfully.

### Task 2: Model the resume and project data

**Files:**
- Create: `src/content/site.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/internships.ts`
- Create: `src/content/education.ts`
- Create: `src/content/skills.ts`

**Interfaces:**
- Consumes: the resume PDF content and the current live project URL.
- Produces: typed arrays and objects the homepage can render directly.

- [ ] **Step 1: Define the exported data shapes**

```ts
export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  bullets: string[];
};
```

- [ ] **Step 2: Encode the current content**

Populate the data with:
- education entries for Zhejiang University and China Academy of Art
- internship entries for the companies currently shown in the resume
- one featured project for `design-award-meta-search`
- a skills list grouped into clear buckets

- [ ] **Step 3: Add a content validation script**

```ts
// scripts/validate-content.ts
import { internships } from '../src/content/internships';
import { projects } from '../src/content/projects';

for (const item of internships) {
  if (item.bullets.length > 4) throw new Error(`${item.org} has too many bullets`);
  for (const bullet of item.bullets) {
    const sentences = bullet.split(/[。.!?]/).filter(Boolean);
    if (sentences.length > 2) throw new Error(`${item.org} bullet is too long`);
  }
}

if (!projects.some((p) => p.slug === 'design-award-meta-search')) {
  throw new Error('Missing featured project');
}
```

- [ ] **Step 4: Run the validation**

Run: `npx tsx scripts/validate-content.ts`
Expected: no error output.

### Task 3: Build the homepage sections

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/SectionHeading.astro`
- Create: `src/components/Timeline.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/SkillGroup.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: the content arrays from `src/content/*`.
- Produces: a single scrolling homepage with anchored sections.

- [ ] **Step 1: Write the failing render test**

Use Astro build output as the gate for now:
Run: `npm run build`
Expected: fail until the components and imports exist.

- [ ] **Step 2: Implement the section components**

```astro
---
const { title, eyebrow } = Astro.props;
---
<section class="section">
  <header>
    <p>{eyebrow}</p>
    <h2>{title}</h2>
  </header>
  <slot />
</section>
```

- [ ] **Step 3: Assemble the homepage**

The page must render, in order:
- Hero
- About
- Education
- Internship Experience
- Project Work
- Skills
- Contact

- [ ] **Step 4: Re-run the build**

Run: `npm run build`
Expected: success with all sections rendered.

### Task 4: Add the visual system and responsive polish

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/*`

**Interfaces:**
- Consumes: the rendered homepage structure.
- Produces: the editorial visual language matching the reference site.

- [ ] **Step 1: Apply the typography and spacing system**

Use a restrained palette, strong hierarchy, compact section spacing, and readable card/list layouts.

- [ ] **Step 2: Constrain internship copy**

Ensure each company block stays visually compact so the page never turns into a wall of text.

- [ ] **Step 3: Verify mobile layout**

Run: `npm run build`
Then inspect the rendered page in a browser at narrow and wide widths.

### Task 5: Prepare deployment and domain wiring

**Files:**
- Create: `wrangler.toml` if needed for future portability
- Create: `README.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: the built Astro site.
- Produces: a documented Cloudflare Pages deployment path and domain setup checklist.

- [ ] **Step 1: Add deployment notes**

Document:
- buy `sensormaru.com`
- point DNS to Cloudflare
- connect Cloudflare Pages to the repository
- assign the custom domain to the Pages project

- [ ] **Step 2: Add scripts**

Include at least:
- `dev`
- `build`
- `preview`
- `validate:content`

- [ ] **Step 3: Confirm the deployment flow**

Run: `npm run build`
Expected: a static output ready for Cloudflare Pages.

### Task 6: Leave room for future project migration

**Files:**
- Modify: `src/content/projects.ts`
- Modify: `src/components/ProjectCard.astro`

**Interfaces:**
- Consumes: later project URLs from the user.
- Produces: a project list that can grow without layout changes.

- [ ] **Step 1: Support external links and future custom-domain links**

Project cards should treat the URL as data, not as a layout assumption.

- [ ] **Step 2: Keep the first project featured**

`design-award-meta-search` stays first until the user supplies a different ordering rule.

- [ ] **Step 3: Re-run the build**

Run: `npm run build`
Expected: success with the project list still rendering correctly.
