import { experience } from '../src/content/experience';
import { projects } from '../src/content/projects';
import { site } from '../src/content/site';
import { skills } from '../src/content/skills';

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
  'park-investment-intelligence',
  'wm-tracking-demo',
  '360-screenshot',
  'pet-mobile-air-purifier-aigc-film'
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

const globalDesignAwardMuseumProject = projects.find((project) => project.slug === 'global-design-award-museum');
if (globalDesignAwardMuseumProject?.url !== 'https://awards.sensormaru.com/') {
  throw new Error('Global Design Award Museum link must point to awards.sensormaru.com');
}

const parkInvestmentProject = projects.find(
  (project) => project.slug === 'park-investment-intelligence'
);
const expectedProjectOrder = [
  'global-design-award-museum',
  'wm-tracking-demo',
  '360-screenshot',
  'park-investment-intelligence',
  'pet-mobile-air-purifier-aigc-film'
];

if (projects.map((project) => project.slug).join('|') !== expectedProjectOrder.join('|')) {
  throw new Error('Project cards must match the requested desktop grid order');
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

if (site.phone !== '17816501613') {
  throw new Error('Contact phone must match the requested public phone number');
}

if (site.email !== 'sensorMaru@163.com') {
  throw new Error('Contact email must match the requested public email address');
}

if (site.githubHandle !== 'sensorMaru') {
  throw new Error('Contact GitHub handle must match the requested handle');
}

if (site.role !== '产品经理 / AI产品经理') {
  throw new Error('Hero role must match the requested product manager wording');
}

if (site.name !== '沈智宇' || site.translations.en.name !== 'Shen Zhiyu') {
  throw new Error('Hero and contact names must preserve the confirmed Chinese and English names');
}

if (site.translations.en.role !== 'Product Manager / AI Product Manager') {
  throw new Error('Hero English role must match the updated product manager wording');
}

const indexSource = readFileSync('src/pages/index.astro', 'utf8');
const heroSource = readFileSync('src/components/Hero.astro', 'utf8');
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
const bpTranslatorSopFlowSource = readFileSync('public/sop-assets/bp-translator-project-flow-4x3.svg', 'utf8');
const bpTranslatorReadmeSource = readFileSync('src/data/sop-readmes/bp-translator.md', 'utf8');
const bpTranslatorReadmeEnSource = readFileSync('src/data/sop-readmes/bp-translator.en.md', 'utf8');
const vcmFoodSopFlowSource = readFileSync('public/sop-assets/vcm-food-project-flow-4x3.svg', 'utf8');
const vcmFoodReadmeSource = readFileSync('src/data/sop-readmes/vcm-food-search-completion.md', 'utf8');
const vcmFoodReadmeEnSource = readFileSync('src/data/sop-readmes/vcm-food-search-completion.en.md', 'utf8');
const emgSopFlowSource = readFileSync('public/sop-assets/emg-analysis-project-flow-4x3.svg', 'utf8');
const emgReadmeSource = readFileSync('src/data/sop-readmes/emg-analysis.md', 'utf8');
const emgReadmeEnSource = readFileSync('src/data/sop-readmes/emg-analysis.en.md', 'utf8');

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

for (const requiredText of ['个人项目', '个人经历', 'Skills &amp; SOP沉淀']) {
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
  throw new Error('Skills & SOP section must appear between Projects and Skills');
}

if (
  !navSource.includes("labelZh: 'Workflow'") ||
  !navSource.includes("href: '#sops'") ||
  !navSource.includes("labelZh: '技能'") ||
  !navSource.includes("href: '#skills'")
) {
  throw new Error('Top navigation must include Workflow and 技能 tabs with the requested anchors');
}

if (indexSource.includes('掌握技能')) {
  throw new Error('Skills section title should use 技能 instead of 掌握技能');
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

if (!stylesSource.includes('.project-dialog-visit[hidden]')) {
  throw new Error('Hidden project dialog visit links must remain visually hidden');
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

for (const requiredBpTranslatorSopText of [
  '多语言自动翻译脚本',
  '该脚本用于在产品上线新的语言时快速将全量文案翻译为该新语言，并生成csv字段',
  '/sop-assets/bp-translator-project-flow-4x3.svg',
  'bpTranslatorReadme',
  'CSV 输入契约',
  '格式校验',
  '生成 loco_add.csv'
]) {
  if (!sopsSource.includes(requiredBpTranslatorSopText)) {
    throw new Error(`Missing requested BP translator SOP content: ${requiredBpTranslatorSopText}`);
  }
}

if (!bpTranslatorReadmeSource.includes('# Brazilian Portuguese CSV 翻译 Skill') || !bpTranslatorReadmeSource.includes('## 一、输入与运行基础确认')) {
  throw new Error('BP translator SOP README source must be available for the detail dialog');
}

for (const requiredVcmFoodSopText of [
  '食物库搜索失败自动补全skills',
  '该脚本用于对接上游神策端数据库搜索无结果的数据，使用AI将其补全并交付至下游运营端上传新数据',
  '/sop-assets/vcm-food-project-flow-4x3.svg',
  'vcmFoodReadme',
  '原始搜索数据',
  '联网兜底与异常处理',
  'vcm_food_nutri_part*.xlsx'
]) {
  if (!sopsSource.includes(requiredVcmFoodSopText)) {
    throw new Error(`Missing requested VCM food SOP content: ${requiredVcmFoodSopText}`);
  }
}

if (!vcmFoodReadmeSource.includes('# 食物库搜索结果清洗与营养估算 Skill') || !vcmFoodReadmeSource.includes('## 一、输入与处理口径确认')) {
  throw new Error('VCM food SOP README source must be available for the detail dialog');
}

for (const requiredEmgSopText of [
  '坐姿肩颈肌电信号&疲劳度分析skills',
  '该 Skill 用于从 EDF 肌电原始数据中解析通道、计算 RMS/对称性/MF/MPF/疲劳评分，并生成终端摘要与 HTML 对比报告。',
  '/sop-assets/emg-analysis-project-flow-4x3.svg',
  'emgReadme',
  'RMS 与对称性',
  'MF / MPF 疲劳',
  'emg_comparison.html'
]) {
  if (!sopsSource.includes(requiredEmgSopText)) {
    throw new Error(`Missing requested EMG SOP content: ${requiredEmgSopText}`);
  }
}

if (!emgReadmeSource.includes('# EMG 肌电 EDF 解析与疲劳对比 Skill') || !emgReadmeSource.includes('## 一、输入与实验口径确认')) {
  throw new Error('EMG SOP README source must be available for the detail dialog');
}

if (
  !sopsSource.includes('appStoreReviewReadmeEn') ||
  !sopsSource.includes('recipeCleanReadmeEn') ||
  !sopsSource.includes('bpTranslatorReadmeEn') ||
  !sopsSource.includes('vcmFoodReadmeEn') ||
  !sopsSource.includes('emgReadmeEn') ||
  !appStoreReadmeEnSource.includes('## 1. Input and Scope Confirmation') ||
  !recipeReadmeEnSource.includes('## 1. Input and Scope Confirmation') ||
  !bpTranslatorReadmeEnSource.includes('## 1. Input and Runtime Confirmation') ||
  !vcmFoodReadmeEnSource.includes('## 1. Input and Processing Scope Confirmation') ||
  !emgReadmeEnSource.includes('## 1. Input and Experiment Scope Confirmation')
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

if (!stylesSource.includes('top: 1em') || !stylesSource.includes('calc(14px + 1em)')) {
  throw new Error('Hero role text should move down by one unit of its own font height');
}

if (
  !/\.hero-about-list\s*\{[^}]*font-size:\s*1\.1rem;/.test(stylesSource) ||
  stylesSource.includes('hero-about-list {\n    font-size: 0.95rem;')
) {
  throw new Error('Hero About bullet text should match the hero role font size');
}

if (!stylesSource.includes('--hero-content-inset: 0px;')) {
  throw new Error('Hero left content should align with the Experience section heading');
}

if (
  !/\.bullet-list\.hero-about-list\s*\{[^}]*padding-left:\s*56px;/.test(stylesSource) ||
  !stylesSource.includes('.bullet-list.hero-about-list {\n    font-size: 1.1rem;\n    padding-left: 52px;')
) {
  throw new Error('Hero About bullet content should align with the Experience entry titles');
}

if (
  !stylesSource.includes('.cursor-glow') ||
  !stylesSource.includes('--cursor-glow-size: 147px') ||
  !stylesSource.includes('rgba(255, 255, 255, 0.09)') ||
  !stylesSource.includes('rgba(255, 255, 255, 0.04)') ||
  !stylesSource.includes('z-index: 2147483600') ||
  !indexSource.includes('renderCursorGlow') ||
  !indexSource.includes('cursorTargetX')
) {
  throw new Error('Mouse hover should render a smaller, dimmer delayed white glow above page elements');
}

if (
  !stylesSource.includes('.site-nav-links a::after') ||
  !/\.site-nav-links a:hover::after,\n\.site-nav-links a:focus-visible::after\s*\{[^}]*opacity:\s*0\.9;[^}]*transform:\s*scaleX\(1\);/.test(stylesSource)
) {
  throw new Error('Top navigation items should show an underline on hover and focus');
}

if (
  !heroSource.includes(
    '<h1 data-i18n-zh={site.name} data-i18n-en={siteEn.name}>{site.name}</h1>'
  )
) {
  throw new Error('Hero must keep the bilingual personal name binding');
}

if (
  !/html\.is-dialog-open \.site-nav\s*\{[^}]*opacity:\s*0;[^}]*visibility:\s*hidden;[^}]*pointer-events:\s*none;/.test(stylesSource)
) {
  throw new Error('Site navigation must be hidden while a modal dialog is open');
}

if (
  !/@media \(max-width: 640px\)[\s\S]*?\.dialog-close\s*\{[^}]*position:\s*sticky;[^}]*env\(safe-area-inset-top/.test(stylesSource)
) {
  throw new Error('Mobile project dialog close control must stay sticky below the browser safe area');
}

if (
  !stylesSource.includes('@keyframes dialog-window-in') ||
  !stylesSource.includes('@keyframes dialog-window-out') ||
  !stylesSource.includes('.project-dialog.is-closing') ||
  !stylesSource.includes('.sop-dialog.is-closing') ||
  !indexSource.includes('showAnimatedDialog') ||
  !indexSource.includes('closeAnimatedDialog') ||
  !indexSource.includes("addEventListener('cancel'")
) {
  throw new Error('Project and SOP dialogs should animate when opening and closing');
}

if (
  !indexSource.includes("document.querySelectorAll('.project-card, .sop-card, .skill-group')") ||
  !indexSource.includes('--card-shift-x') ||
  !stylesSource.includes('transition-duration: 120ms')
) {
  throw new Error('Cards should move subtly with pointer hover');
}

if (!stylesSource.includes('.project-card:hover .project-card-image') || !stylesSource.includes('transform: scale(1.2)')) {
  throw new Error('Project card cover images should scale to 1.2 on hover');
}

if (
  stylesSource.includes('.project-card:hover,\n.project-card:hover .project-card-inner') ||
  /\.(project-card|sop-card)(?::hover|:focus-within)[^{]*\{[^}]*border-color:\s*var\(--accent\)/.test(stylesSource)
) {
  throw new Error('Card hover should not add the previous white accent border');
}

if (!indexSource.includes('data-copy-label') || !indexSource.includes('电话 / 微信（已复制）')) {
  throw new Error('Phone copy feedback must update the contact label, not the phone number');
}

if (
  !/@media \(max-width: 640px\)[\s\S]*?\.contact-email\s*\{[^}]*font-size:\s*1\.55rem;/.test(stylesSource)
) {
  throw new Error('Contact email must use a mobile-specific font size that keeps the address readable');
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

if (!bpTranslatorSopFlowSource.includes('.bg,') || !bpTranslatorSopFlowSource.includes('display: none') || !bpTranslatorSopFlowSource.includes('.lane { fill: none')) {
  throw new Error('BP translator SOP flow SVG should remove decorative background blocks and keep core flow elements');
}

if (!vcmFoodSopFlowSource.includes('.bg,') || !vcmFoodSopFlowSource.includes('display: none') || !vcmFoodSopFlowSource.includes('.lane { fill: none')) {
  throw new Error('VCM food SOP flow SVG should remove decorative background blocks and keep core flow elements');
}

if (!emgSopFlowSource.includes('.bg,') || !emgSopFlowSource.includes('display: none') || !emgSopFlowSource.includes('.lane { fill: none')) {
  throw new Error('EMG SOP flow SVG should remove decorative background blocks and keep core flow elements');
}

for (const overflowingBpTranslatorText of [
  '异常处理：缺少配置、接口失败、JSON 结构异常、空译文、占位符不匹配',
  '诊断输出：终端进度、选中行数、跳过空原文行、重试原因、最终写出路径'
]) {
  if (bpTranslatorSopFlowSource.includes(`>${overflowingBpTranslatorText}</text>`)) {
    throw new Error(`BP translator flow SVG should wrap long helper text inside its rounded rectangle: ${overflowingBpTranslatorText}`);
  }
}

for (const overflowingVcmFoodText of [
  '联网兜底：搜索结果 + LLM 清洗；网络或配置失败时回退本地规则',
  '质量收口：去重、修复多逗号、避免品牌单独进入 food_name'
]) {
  if (vcmFoodSopFlowSource.includes(`>${overflowingVcmFoodText}</text>`)) {
    throw new Error(`VCM food flow SVG should wrap long helper text inside its rounded rectangle: ${overflowingVcmFoodText}`);
  }
}

for (const overflowingEmgText of [
  '异常处理：EDF 头部异常、数据截断、通道数量不符、采样率不一致',
  '终端诊断：文件元数据、通道标签、样本数、单文件指标摘要'
]) {
  if (emgSopFlowSource.includes(`>${overflowingEmgText}</text>`)) {
    throw new Error(`EMG flow SVG should wrap long helper text inside its rounded rectangle: ${overflowingEmgText}`);
  }
}

if (!stylesSource.includes('.sop-flow-svg') || !stylesSource.includes('background: transparent')) {
  throw new Error('SOP SVG should be rendered as a transparent inline flow diagram');
}
