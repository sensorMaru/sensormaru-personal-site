# Project Card Order Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Place the park investment intelligence card in the first column of the second desktop row while the other three project cards remain in the first row.

**Architecture:** Keep the existing content-driven project grid and reorder the `projects` array so normal CSS Grid auto-placement produces the requested layout. Update the content validator to lock the exact slug order and leave components, project copy, media, links, and CSS unchanged.

**Tech Stack:** Astro 5, TypeScript, CSS Grid, repository content validation script.

## Global Constraints

- Desktop project order must be `global-design-award-museum -> wm-tracking-demo -> 360-screenshot -> park-investment-intelligence`.
- Mobile must continue using the existing single-column grid in the same data order.
- Do not modify project copy, images, carousel media, links, components, or CSS.

---

### Task 1: Reorder Project Cards

**Files:**
- Modify: `scripts/validate-content.ts`
- Modify: `src/content/projects.ts`
- Modify: `PROJECT_STATUS.md`

**Interfaces:**
- Consumes: exported `projects: ProjectItem[]` from `src/content/projects.ts`.
- Produces: a stable project ordering consumed by `src/pages/index.astro` through the existing `projects.map(...)` rendering.

- [ ] **Step 1: Write the failing order validation**

Replace the previous adjacency check with an exact slug-order assertion:

```ts
const expectedProjectOrder = [
  'global-design-award-museum',
  'wm-tracking-demo',
  '360-screenshot',
  'park-investment-intelligence'
];

if (projects.map((project) => project.slug).join('|') !== expectedProjectOrder.join('|')) {
  throw new Error('Project cards must match the requested desktop grid order');
}
```

- [ ] **Step 2: Run the validator and confirm RED**

Run:

```bash
npm run validate:content
```

Expected: FAIL with `Project cards must match the requested desktop grid order` because the park project is still second.

- [ ] **Step 3: Apply the minimal data reorder**

In `src/content/projects.ts`, move the existing, unchanged object whose slug is `park-investment-intelligence` from immediately after `global-design-award-museum` to immediately after the complete `360-screenshot` object.

The resulting slug sequence must be:

```ts
[
  'global-design-award-museum',
  'wm-tracking-demo',
  '360-screenshot',
  'park-investment-intelligence'
]
```

- [ ] **Step 4: Confirm GREEN and build**

Run:

```bash
npm run validate:content
npm run build
git diff --check
```

Expected: all commands exit successfully; Astro builds one static page.

- [ ] **Step 5: Verify responsive placement**

At a desktop viewport with three project columns, verify:

```text
Row 1: Global Design Award Museum | 可视化埋点事件地图 | 360 Screenshot
Row 2: 园区招商前沿动态推送平台
```

At a mobile viewport, verify the same four projects render in a single column without horizontal overflow.

- [ ] **Step 6: Update project handoff status**

Update `PROJECT_STATUS.md` so the current goal, completed work, ordering decision, validation results, known deployment state, and next steps reflect this layout correction.

- [ ] **Step 7: Commit**

```bash
git add PROJECT_STATUS.md scripts/validate-content.ts src/content/projects.ts
git commit -m "Fix personal project card order"
```
