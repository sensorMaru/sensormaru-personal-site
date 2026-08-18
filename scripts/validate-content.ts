import { experience } from '../src/content/experience';
import { projects } from '../src/content/projects';
import { site } from '../src/content/site';

import { readFileSync } from 'node:fs';

function sentenceCount(text: string): number {
  return text
    .split(/[。！？.!?]/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

for (const item of experience) {
  if (item.kind !== 'internship') {
    continue;
  }

  if (!item.bullets || item.bullets.length > 5) {
    throw new Error(`${item.org} has too many bullets or missing bullets`);
  }

  for (const bullet of item.bullets) {
    if (sentenceCount(bullet) > 2) {
      throw new Error(`${item.org} bullet is too long: ${bullet}`);
    }
  }

  const enBullets = item.translations?.en?.bullets;
  if (enBullets && enBullets.length > 5) {
    throw new Error(`${item.org} English translation has too many bullets`);
  }

  for (const bullet of enBullets ?? []) {
    if (sentenceCount(bullet) > 2) {
      throw new Error(`${item.org} English bullet is too long: ${bullet}`);
    }
  }
}

const requiredProjectSlugs = [
  'global-design-award-museum',
  'wm-tracking-demo',
  '360-screenshot'
];

for (const slug of requiredProjectSlugs) {
  if (!projects.some((project) => project.slug === slug)) {
    throw new Error(`Missing project: ${slug}`);
  }
}

const wmTrackingProject = projects.find((project) => project.slug === 'wm-tracking-demo');
if (wmTrackingProject?.url !== '/projects/wm-tracking-demo/index.html') {
  throw new Error('WM tracking demo link must point to the static index.html file');
}

if (site.phone !== '17816501613') {
  throw new Error('Contact phone must match the requested public phone number');
}

if (site.githubHandle !== 'SensorMaru') {
  throw new Error('Contact GitHub handle must match the requested handle');
}

const indexSource = readFileSync('src/pages/index.astro', 'utf8');
const navSource = readFileSync('src/components/SiteNav.astro', 'utf8');
const projectCardSource = readFileSync('src/components/ProjectCard.astro', 'utf8');
const sopsSource = readFileSync('src/content/sops.ts', 'utf8');
const stylesSource = readFileSync('src/styles/global.css', 'utf8');
const sopFlowSource = readFileSync('public/sop-assets/review-analysis-project-flow-4x3.svg', 'utf8');
const appStoreReadmeSource = readFileSync('src/data/sop-readmes/app-store-review-analysis.md', 'utf8');
const appStoreReadmeEnSource = readFileSync('src/data/sop-readmes/app-store-review-analysis.en.md', 'utf8');
const recipeSopFlowSource = readFileSync('public/sop-assets/recipe-clean-v2-flow-4x3.svg', 'utf8');
const recipeReadmeSource = readFileSync('src/data/sop-readmes/recipe-clean-v2.md', 'utf8');
const recipeReadmeEnSource = readFileSync('src/data/sop-readmes/recipe-clean-v2.en.md', 'utf8');

for (const requiredText of ['个人项目', '个人经历', 'Agent Skills']) {
  if (!indexSource.includes(requiredText)) {
    throw new Error(`Missing requested section title: ${requiredText}`);
  }
}

const projectsSectionIndex = indexSource.indexOf('id="projects"');
const sopsSectionIndex = indexSource.indexOf('id="sops"');
const skillsSectionIndex = indexSource.indexOf('id="skills"');

if (
  projectsSectionIndex === -1 ||
  sopsSectionIndex === -1 ||
  skillsSectionIndex === -1 ||
  !(projectsSectionIndex < sopsSectionIndex && sopsSectionIndex < skillsSectionIndex)
) {
  throw new Error('Agent Skills section must appear between Projects and Skills');
}

if (
  !navSource.includes("labelZh: 'Workflow'") ||
  !navSource.includes("href: '#sops'") ||
  !navSource.includes("labelZh: 'Skills'") ||
  !navSource.includes("href: '#skills'")
) {
  throw new Error('Top navigation must include Workflow and Skills tabs with the requested anchors');
}

if (
  navSource.indexOf("href: '#sops'") === -1 ||
  navSource.indexOf("href: '#skills'") === -1 ||
  navSource.indexOf("href: '#contact'") === -1 ||
  !(navSource.indexOf("href: '#sops'") < navSource.indexOf("href: '#skills'") && navSource.indexOf("href: '#skills'") < navSource.indexOf("href: '#contact'"))
) {
  throw new Error('Top navigation order must place Skills between Workflow and Contact');
}

if (indexSource.includes('左侧教育，右侧实习')) {
  throw new Error('Experience helper description should be removed');
}

if (!projectCardSource.includes('访问项目')) {
  throw new Error('Project cards must expose a visit-project link');
}

for (const requiredSopText of [
  'App Store评论采集与分析Skills',
  '批量获取多个指定的竞品 App',
  '/sop-assets/review-analysis-project-flow-4x3.svg',
  'appStoreReviewReadme',
  '异常处理与诊断输出',
  'flowLinks'
]) {
  if (!sopsSource.includes(requiredSopText)) {
    throw new Error(`Missing requested SOP content: ${requiredSopText}`);
  }
}

for (const requiredAppStoreReadmeText of [
  '## 对应流程图',
  '## 一、输入与口径确认',
  '## 二、自动化采集与数据处理主链路',
  '## 三、Excel 交付与复盘分析',
  '## 输出物清单',
  '=HYPERLINK',
  '/country/us'
]) {
  if (!appStoreReadmeSource.includes(requiredAppStoreReadmeText)) {
    throw new Error(`Missing updated App Store README content: ${requiredAppStoreReadmeText}`);
  }
}

for (const requiredRecipeSopText of [
  '食谱数据清洗skills',
  '对接上游爬虫获取的原始食谱文件',
  '/sop-assets/recipe-clean-v2-flow-4x3.svg',
  'recipeCleanReadme',
  'final_json_result.csv',
  'JSON 解析复核'
]) {
  if (!sopsSource.includes(requiredRecipeSopText)) {
    throw new Error(`Missing requested recipe SOP content: ${requiredRecipeSopText}`);
  }
}

if (!recipeReadmeSource.includes('# recipe_clean_V2 Skill README') || !recipeReadmeSource.includes('## 概览')) {
  throw new Error('Recipe SOP README source must be available for the detail dialog');
}

if (
  !sopsSource.includes('appStoreReviewReadmeEn') ||
  !sopsSource.includes('recipeCleanReadmeEn') ||
  !appStoreReadmeEnSource.includes('## 1. Input and Scope Confirmation') ||
  !recipeReadmeEnSource.includes('## 1. Input and Scope Confirmation')
) {
  throw new Error('SOP dialogs must provide English README content for language switching');
}

if (
  !navSource.includes('site-language-change') ||
  !indexSource.includes('localizedValue') ||
  !indexSource.includes('applySopSvgLanguage') ||
  !sopsSource.includes('flowTextTranslations') ||
  !indexSource.includes('data-i18n-zh') ||
  !projectCardSource.includes('data-i18n-en')
) {
  throw new Error('Language toggle must update page content and dynamic dialogs, not only the top navigation');
}

if (
  sopsSource.includes("name: 'App Store 评论采集与分析 Skill'") ||
  sopsSource.includes('name: "App Store 评论采集与分析 Skill"')
) {
  throw new Error('SOP card title must use the latest requested wording');
}

if (indexSource.includes('01') || indexSource.includes('需求拆解')) {
  throw new Error('SOP cards should not render the reference card numbering or placeholder title');
}

if (stylesSource.includes('5.15rem')) {
  throw new Error('Contact value text should be reduced below the Skills title scale');
}

if (!indexSource.includes('data-copy-label') || !indexSource.includes('电话 / 微信（已复制）')) {
  throw new Error('Phone copy feedback must update the contact label, not the phone number');
}

if (!indexSource.includes('data-sop-trigger') || !indexSource.includes('data-sop-dialog')) {
  throw new Error('SOP cards must open a full-screen detail dialog');
}

if (!indexSource.includes('parseSopSvg') || !indexSource.includes('sop-flow-svg') || !indexSource.includes('renderMarkdown')) {
  throw new Error('SOP detail dialog must render the uploaded SVG inline and README markdown');
}

if (!indexSource.includes('setupSopSvgInteractions') || !indexSource.includes('scrollSopReadmeToSection') || !indexSource.includes('data-sop-section')) {
  throw new Error('SOP flow and README detail views must support linked highlight and section jumping');
}

if (!indexSource.includes('sop-readme-title') || !indexSource.includes("readmeTitle.textContent = 'README'")) {
  throw new Error('SOP README panel title must be the generic README label for every SOP card');
}

if (!stylesSource.includes('white-space: nowrap') || !stylesSource.includes('.sop-dialog')) {
  throw new Error('SOP title and dialog styles must support the requested layout');
}

if (!stylesSource.includes('rgba(0, 0, 0, 0.36)') || !stylesSource.includes('rgba(12, 12, 12, 0.24)')) {
  throw new Error('SOP dialog glass effect should use the more transparent requested opacity');
}

if (!sopFlowSource.includes('.bg,') || !sopFlowSource.includes('display: none') || !sopFlowSource.includes('.lane { fill: none')) {
  throw new Error('SOP flow SVG should remove decorative background blocks and keep core flow elements');
}

if (!recipeSopFlowSource.includes('.bg,') || !recipeSopFlowSource.includes('display: none') || !recipeSopFlowSource.includes('.lane { fill: none')) {
  throw new Error('Recipe SOP flow SVG should remove decorative background blocks and keep core flow elements');
}

if (!stylesSource.includes('.sop-flow-svg') || !stylesSource.includes('background: transparent')) {
  throw new Error('SOP SVG should be rendered as a transparent inline flow diagram');
}
