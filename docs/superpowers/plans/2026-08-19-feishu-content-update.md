# Feishu Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the project summary, first skill group title, and public email contact requested in Feishu document `Q5MQw0nJ9iSsktknghbcQJ1bn0f`.

**Architecture:** Keep copy in the existing structured content files and render the new email item from `site.email`. Extend the existing content validation script as the regression gate, then verify the generated Astro page in desktop and mobile browsers.

**Tech Stack:** Astro 5, TypeScript, vanilla CSS, tsx

## Global Constraints

- Chinese project summary must be exactly `一个面向全球设计奖项的检索聚合网站`.
- English project summary must be exactly `A search aggregation website for global design awards.`
- First skill title must be `产品工作流` / `Product Workflow`.
- Public email must be exactly `sensorMaru@163.com`.
- Email must appear above GitHub and link to `mailto:sensorMaru@163.com`.
- No new dependency, component, or unrelated visual change.
- No deployment is part of this plan.

---

### Task 1: Add failing content and markup validation

**Files:**
- Modify: `scripts/validate-content.ts`

**Interfaces:**
- Consumes: `projects`, `skills`, `site`, and the source of `src/pages/index.astro`.
- Produces: deterministic failures when the confirmed copy, email link, or contact order regresses.

- [ ] **Step 1: Import skills and assert the requested values**

Add `import { skills } from '../src/content/skills';` and checks equivalent to:

```ts
if (
  globalDesignAwardMuseumProject?.summary !== '一个面向全球设计奖项的检索聚合网站' ||
  globalDesignAwardMuseumProject.translations?.en?.summary !==
    'A search aggregation website for global design awards.'
) {
  throw new Error('Global Design Award Museum summaries must match the requested bilingual copy');
}

if (skills[0]?.title !== '产品工作流' || skills[0]?.titleEn !== 'Product Workflow') {
  throw new Error('The first skill group title must match the requested bilingual product workflow copy');
}

if (site.email !== 'sensorMaru@163.com') {
  throw new Error('Contact email must match the requested public email address');
}
```

- [ ] **Step 2: Assert email markup and ordering**

After reading `indexSource`, add checks for:

```ts
const emailContactIndex = indexSource.indexOf('class="contact-value contact-email"');
const githubContactIndex = indexSource.indexOf('class="contact-value contact-github"');

if (
  !indexSource.includes('data-i18n-zh="邮箱"') ||
  !indexSource.includes('data-i18n-en="Email"') ||
  !indexSource.includes('href={`mailto:${site.email}`}') ||
  emailContactIndex === -1 ||
  githubContactIndex === -1 ||
  emailContactIndex >= githubContactIndex
) {
  throw new Error('Email contact must be bilingual, use site.email, and appear above GitHub');
}
```

- [ ] **Step 3: Run the validation and confirm RED**

Run: `npm run validate:content`

Expected: failure reporting the old project summary before any production content is changed.

### Task 2: Update structured bilingual content

**Files:**
- Modify: `src/content/projects.ts`
- Modify: `src/content/skills.ts`
- Modify: `src/content/site.ts`

**Interfaces:**
- Consumes: the exact confirmed bilingual copy and public email.
- Produces: updated data for cards, dialogs, skill groups, and the contact section.

- [ ] **Step 1: Update the project summary**

Set the first project's summary values to:

```ts
summary: '一个面向全球设计奖项的检索聚合网站',
```

and:

```ts
summary: 'A search aggregation website for global design awards.',
```

- [ ] **Step 2: Update the first skill title**

Set:

```ts
title: '产品工作流',
titleEn: 'Product Workflow',
```

- [ ] **Step 3: Update the configured email**

Set:

```ts
email: 'sensorMaru@163.com',
```

### Task 3: Render and style the email contact

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `site.email`.
- Produces: a bilingual email contact link between Phone / WeChat and GitHub.

- [ ] **Step 1: Add the email contact item**

Insert before the GitHub item:

```astro
<div class="contact-item">
  <p class="contact-label" data-i18n-zh="邮箱" data-i18n-en="Email">邮箱</p>
  <a class="contact-value contact-email" href={`mailto:${site.email}`}>{site.email}</a>
</div>
```

- [ ] **Step 2: Reuse the link interaction styles**

Add `.contact-email` alongside `.contact-github` in the display, hover, and focus selectors. Keep the existing GitHub rules unchanged otherwise.

- [ ] **Step 3: Run the validation and confirm GREEN**

Run: `npm run validate:content`

Expected: exit code 0 with no error output.

### Task 4: Build, inspect, and update the handoff

**Files:**
- Modify: `PROJECT_STATUS.md`

**Interfaces:**
- Consumes: the completed implementation and fresh command results.
- Produces: an accurate continuation document for the next development session.

- [ ] **Step 1: Run static verification**

Run:

```bash
npm run build
git diff --check
```

Expected: Astro generates the static page successfully and Git reports no whitespace errors.

- [ ] **Step 2: Run browser verification**

Start the Astro dev server and inspect desktop and mobile widths. Confirm:

- the project card and project dialog use the new summary;
- the first skill group switches between `产品工作流` and `Product Workflow`;
- the email appears above GitHub;
- the email label switches between `邮箱` and `Email`;
- the email link resolves to `mailto:sensorMaru@163.com`;
- no contact text overlaps at mobile width.

- [ ] **Step 3: Update the project handoff**

Update `PROJECT_STATUS.md` with the confirmed requirements, files changed, fresh test results, remaining risks, failed attempts, and the next development sequence. Preserve relevant historical context and remove the obsolete statement that the Feishu document has not been read.

