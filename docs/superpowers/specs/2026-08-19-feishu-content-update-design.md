# Feishu Content Update Design

**Goal:** Apply the three confirmed homepage updates from Feishu document `Q5MQw0nJ9iSsktknghbcQJ1bn0f` while preserving the site's existing bilingual content model and contact styling.

## Confirmed Changes

1. Change the `Global Design Award Museum` summary to:
   - Chinese: `一个面向全球设计奖项的检索聚合网站`
   - English: `A search aggregation website for global design awards.`
2. Change the first skill group title to:
   - Chinese: `产品工作流`
   - English: `Product Workflow`
3. Add an email contact item above GitHub:
   - Chinese label: `邮箱`
   - English label: `Email`
   - Address: `sensorMaru@163.com`
   - Clicking the address opens the visitor's mail application through `mailto:sensorMaru@163.com`.

## Data Flow

- Store the project summary in `src/content/projects.ts`. Both the project card and project detail dialog already read this object, so one content edit updates both places shown in the reference screenshots.
- Store the skill group title in `src/content/skills.ts`. `SkillGroup.astro` already reads `title` and `titleEn`.
- Store the public email in `src/content/site.ts`. Render the contact item from `site.email` in `src/pages/index.astro` instead of duplicating the address in markup.

## Presentation

- Insert the email contact item between Phone / WeChat and GitHub, matching the order in the Feishu requirement.
- Reuse the existing large contact value treatment.
- Give the email link the same hover and keyboard focus behavior as the GitHub link.
- Keep the current contact layout, responsive type scale, language switching, and external GitHub behavior unchanged.

## Validation

Extend `scripts/validate-content.ts` before changing production content so the initial run fails against the old values. The validation must assert:

- exact Chinese and English project summaries;
- exact Chinese and English first skill group titles;
- exact configured email address;
- an email label with Chinese and English translations;
- a `mailto:` link rendered from `site.email`;
- the email contact item appears before GitHub.

After implementation, run content validation, the Astro production build, whitespace validation, and browser checks at desktop and mobile widths. Browser checks must cover the Chinese and English text, both project summary surfaces, the email order, and the email link target.

## Scope Boundaries

- Do not change project details, skill items, phone, GitHub, navigation, or unrelated styling.
- Do not add dependencies or a new component for this small contact item.
- Do not deploy unless the user separately requests deployment.

