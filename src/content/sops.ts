import appStoreReviewReadme from '../data/sop-readmes/app-store-review-analysis.md?raw';
import appStoreReviewReadmeEn from '../data/sop-readmes/app-store-review-analysis.en.md?raw';
import recipeCleanReadme from '../data/sop-readmes/recipe-clean-v2.md?raw';
import recipeCleanReadmeEn from '../data/sop-readmes/recipe-clean-v2.en.md?raw';

export interface Sop {
  name: string;
  summary: string;
  flowImage: {
    src: string;
    alt: string;
  };
  flowLinks: {
    id: string;
    title: string;
    titleEn?: string;
    nodeLabels: string[];
  }[];
  readmeMarkdown: string;
  translations?: {
    en?: {
      name?: string;
      summary?: string;
      flowImageAlt?: string;
      flowTextTranslations?: Record<string, string>;
      readmeMarkdown?: string;
    };
  };
}

export const sops: Sop[] = [
  {
    name: 'App Store评论采集与分析Skills',
    summary: '批量获取多个指定的竞品 App 在美国区App Store近一个月的用户评论，并输出可复盘、可跳转、可分析的 Excel 文件',
    flowImage: {
      src: '/sop-assets/review-analysis-project-flow-4x3.svg',
      alt: 'App Store 评论采集与分析 Skill 流程图'
    },
    flowLinks: [
      {
        id: 'appstore-flowchart-reference',
        title: '对应流程图',
        titleEn: 'Flowchart Reference',
        nodeLabels: []
      },
      {
        id: 'appstore-input-confirmation',
        title: '一、输入与口径确认',
        titleEn: '1. Input and Scope Confirmation',
        nodeLabels: []
      },
      {
        id: 'appstore-business-rules',
        title: 'SOP / 业务规则',
        titleEn: 'SOP / Business Rules',
        nodeLabels: ['SOP / 业务规则']
      },
      {
        id: 'appstore-app-links',
        title: 'App 清单与链接',
        titleEn: 'App List and Links',
        nodeLabels: ['App 清单与链接']
      },
      {
        id: 'appstore-runtime',
        title: '运行环境',
        titleEn: 'Runtime Environment',
        nodeLabels: ['运行环境']
      },
      {
        id: 'appstore-auth-cache',
        title: '登录态与缓存',
        titleEn: 'Login State and Cache',
        nodeLabels: ['登录态与缓存']
      },
      {
        id: 'appstore-automation-mainline',
        title: '二、自动化采集与数据处理主链路',
        titleEn: '2. Automation Collection and Data Processing Mainline',
        nodeLabels: []
      },
      {
        id: 'appstore-iterate-apps',
        title: '遍历 App',
        titleEn: 'Iterate Apps',
        nodeLabels: ['遍历 App']
      },
      {
        id: 'appstore-set-filters',
        title: '设置筛选器',
        titleEn: 'Set Filters',
        nodeLabels: ['设置筛选器']
      },
      {
        id: 'appstore-time-region',
        title: '时间与地区',
        titleEn: 'Time and Region',
        nodeLabels: ['时间与地区']
      },
      {
        id: 'appstore-export-data',
        title: '导出数据',
        titleEn: 'Export Data',
        nodeLabels: ['导出数据']
      },
      {
        id: 'appstore-save-raw',
        title: '保存原始表',
        titleEn: 'Save Raw Table',
        nodeLabels: ['保存原始表']
      },
      {
        id: 'appstore-parse-normalize',
        title: '解析与规范化',
        titleEn: 'Parse and Normalize',
        nodeLabels: ['解析与规范化']
      },
      {
        id: 'appstore-diagnostics-main',
        title: '异常处理与诊断输出',
        titleEn: 'Error Handling and Diagnostic Output',
        nodeLabels: []
      },
      {
        id: 'appstore-error-handling',
        title: '异常处理',
        titleEn: 'Error Handling',
        nodeLabels: ['异常处理：登录 / 验证、下载失败、导出空表、解析失败']
      },
      {
        id: 'appstore-diagnostic-output',
        title: '诊断输出',
        titleEn: 'Diagnostic Output',
        nodeLabels: ['诊断输出：qimai_export_debug.txt、终端日志、原始导出表']
      },
      {
        id: 'appstore-excel-delivery',
        title: '三、Excel 交付与复盘分析',
        titleEn: '3. Excel Delivery and Review Analysis',
        nodeLabels: []
      },
      {
        id: 'appstore-app-sheets',
        title: '按 App 建工作表',
        titleEn: 'Build Sheets by App',
        nodeLabels: ['按 App 建工作表']
      },
      {
        id: 'appstore-translation',
        title: '评论内容翻译',
        titleEn: 'Review Content Translation',
        nodeLabels: ['评论内容翻译']
      },
      {
        id: 'appstore-analysis-sheet',
        title: '评论分析 Sheet',
        titleEn: 'Review Analysis Sheet',
        nodeLabels: ['评论分析 Sheet']
      },
      {
        id: 'appstore-interaction-acceptance',
        title: '交互与验收',
        titleEn: 'Interaction and Acceptance',
        nodeLabels: ['交互与验收']
      },
      {
        id: 'appstore-output-list',
        title: '输出物清单',
        titleEn: 'Output List',
        nodeLabels: []
      },
      {
        id: 'appstore-excel-output',
        title: 'Excel 交付文件',
        titleEn: 'Excel Delivery File',
        nodeLabels: []
      },
      {
        id: 'appstore-raw-exports',
        title: '原始导出表',
        titleEn: 'Raw Export Tables',
        nodeLabels: []
      },
      {
        id: 'appstore-log-diagnostics',
        title: '日志 / 诊断文本',
        titleEn: 'Logs / Diagnostic Text',
        nodeLabels: []
      },
      {
        id: 'appstore-acceptance',
        title: '验收标准',
        titleEn: 'Acceptance Criteria',
        nodeLabels: []
      },
      {
        id: 'appstore-future-directions',
        title: '后续扩展方向',
        titleEn: 'Future Extensions',
        nodeLabels: []
      },
      {
        id: 'appstore-add-app',
        title: '新增 App',
        titleEn: 'Add App',
        nodeLabels: []
      },
      {
        id: 'appstore-add-translation',
        title: '增加翻译',
        titleEn: 'Add Translation',
        nodeLabels: []
      },
      {
        id: 'appstore-improve-analysis',
        title: '优化评论分析',
        titleEn: 'Improve Review Analysis',
        nodeLabels: []
      }
    ],
    readmeMarkdown: appStoreReviewReadme,
    translations: {
      en: {
        name: 'App Store Review Collection and Analysis Skills',
        summary:
          'Batch collect user reviews from the United States App Store for selected competitor Apps over the last month, then output a reviewable, jumpable, and analyzable Excel file.',
        flowImageAlt: 'App Store review collection and analysis Skill flowchart',
        flowTextTranslations: {
          '基于 SOP 口径、七麦数据导出、Python 自动化清洗与 Excel 多工作表交付的整体技术路径':
            'Overall technical path based on SOP scope, Qimai data export, Python automation cleaning, and multi-sheet Excel delivery',
          '一、输入与口径确认': '1. Input and Scope Confirmation',
          'SOP / 业务规则': 'SOP / Business Rules',
          '确认时间范围、筛选器': 'Confirm time range and filters',
          '交付字段与验收标准': 'Delivery fields and acceptance criteria',
          'App 清单与链接': 'App List and Links',
          '13 个竞品 App 评论页': '13 competitor App review pages',
          '七麦链接固定 country/us': 'Qimai links fixed to country/us',
          '运行环境': 'Runtime Environment',
          'openpyxl 生成 Excel': 'openpyxl generates Excel',
          '登录态与缓存': 'Login State and Cache',
          '复用 qimai_storage_state': 'Reuse qimai_storage_state',
          '登录 / 验证失败时人工介入': 'Manual handling if login / verification fails',
          '二、自动化采集与数据处理主链路': '2. Automation Collection and Data Processing Mainline',
          '遍历 App': 'Iterate Apps',
          '读取 APP_CONFIGS': 'Read APP_CONFIGS',
          '逐个打开七麦链接': 'Open Qimai links one by one',
          '失败记录并继续': 'Log failures and continue',
          '设置筛选器': 'Set Filters',
          '评级：全部': 'Rating: all',
          '评论类型：全部': 'Review type: all',
          '排序：最新评价': 'Sort: latest reviews',
          '时间与地区': 'Time and Region',
          '日期：近一个月': 'Date: last month',
          '地区：美国': 'Region: United States',
          '校验 /country/us': 'Validate /country/us',
          '导出数据': 'Export Data',
          '定位可见导出按钮': 'Find visible export button',
          '监听下载事件': 'Listen for download event',
          'JS 兜底点击': 'JS fallback click',
          '保存原始表': 'Save Raw Table',
          'App 名前缀防覆盖': 'Use App-name prefix to avoid overwrites',
          '保留原始证据': 'Keep raw evidence',
          '解析与规范化': 'Parse and Normalize',
          '识别 xlsx/csv 表头': 'Detect xlsx/csv headers',
          '映射时间、用户、评级、标题': 'Map time, user, rating, and title',
          '去重并生成 review_id': 'Deduplicate and generate review_id',
          '异常处理：登录 / 验证、下载失败、导出空表、解析失败':
            'Error handling: login / verification, download failure, empty export, parse failure',
          '诊断输出：qimai_export_debug.txt、终端日志、原始导出表':
            'Diagnostics: qimai_export_debug.txt, terminal logs, raw export tables',
          '三、Excel 交付与复盘分析': '3. Excel Delivery and Review Analysis',
          '按 App 建工作表': 'Build Sheets by App',
          '每个 App 一个 Sheet': 'One Sheet per App',
          '字段：id、时间、用户、评级': 'Fields: id, time, user, rating',
          '评论内容翻译': 'Review Content Translation',
          '当前版本暂不翻译': 'Current version does not translate',
          '翻译列置空，预留扩展': 'Keep translation column empty for extension',
          '评论分析 Sheet': 'Review Analysis Sheet',
          '汇总好评 / 差评主要原因': 'Summarize main positive / negative reasons',
          '每点标注 review_id 佐证': 'Attach review_id evidence to each point',
          '交互与验收': 'Interaction and Acceptance',
          'App 名称跳转对应 Sheet': 'App name jumps to matching Sheet',
          '冻结首行、筛选、备份旧文件': 'Freeze header, filter, and back up old files',
          '交付物：review_data.xlsx、qimai_downloads 原始导出表、日志 / 诊断文本。SOP 原文如需精确落词，可补充权限或粘贴内容后继续对齐。':
            'Deliverables: review_data.xlsx, qimai_downloads raw export tables, logs / diagnostic text.'
        },
        readmeMarkdown: appStoreReviewReadmeEn
      }
    }
  },
  {
    name: '食谱数据清洗skills',
    summary: '对接上游爬虫获取的原始食谱文件，AI补全食谱各营养成分及标签字段并产出json格式交付给下游服务端',
    flowImage: {
      src: '/sop-assets/recipe-clean-v2-flow-4x3.svg',
      alt: '食谱数据清洗 Skill 流程图'
    },
    flowLinks: [
      {
        id: 'recipe-overview',
        title: '概览',
        titleEn: 'Overview',
        nodeLabels: []
      },
      {
        id: 'recipe-input',
        title: '一、输入与口径确认',
        titleEn: '1. Input and Scope Confirmation',
        nodeLabels: []
      },
      {
        id: 'recipe-clean-rules',
        title: 'SOP / 清洗规范',
        titleEn: 'SOP / Cleaning Rules',
        nodeLabels: ['SOP / 清洗规范']
      },
      {
        id: 'recipe-raw-data',
        title: '原始食谱数据',
        titleEn: 'Raw Recipe Data',
        nodeLabels: ['原始食谱数据']
      },
      {
        id: 'recipe-dynamic-ref',
        title: '动态参考配置',
        titleEn: 'Dynamic Reference Configuration',
        nodeLabels: ['动态参考配置']
      },
      {
        id: 'recipe-orchestration',
        title: '运行编排入口',
        titleEn: 'Orchestration Entry',
        nodeLabels: ['运行编排入口']
      },
      {
        id: 'recipe-preprocess',
        title: '二、预处理、有效性判断与营养结构化',
        titleEn: '2. Preprocessing, Validity Check, and Nutrition Structuring',
        nodeLabels: []
      },
      {
        id: 'recipe-th-data-pre',
        title: 'th_data_pre.py',
        titleEn: 'th_data_pre.py',
        nodeLabels: ['th_data_pre.py']
      },
      {
        id: 'recipe-data-pre-result',
        title: 'data_pre_result.csv',
        titleEn: 'data_pre_result.csv',
        nodeLabels: ['data_pre_result.csv']
      },
      {
        id: 'recipe-nutri-process',
        title: 'nutri_process.py',
        titleEn: 'nutri_process.py',
        nodeLabels: ['nutri_process.py']
      },
      {
        id: 'recipe-no-tag-process',
        title: 'no_tag_process.py',
        titleEn: 'no_tag_process.py',
        nodeLabels: ['no_tag_process.py']
      },
      {
        id: 'recipe-structured-artifacts',
        title: '结构化中间产物',
        titleEn: 'Structured Intermediate Artifacts',
        nodeLabels: ['结构化中间产物']
      },
      {
        id: 'recipe-bypass-rule',
        title: '旁路规则',
        titleEn: 'Bypass Rule',
        nodeLabels: ['旁路规则']
      },
      {
        id: 'recipe-tagging',
        title: '三、标签召回、规则校验与多语言展示',
        titleEn: '3. Tag Recall, Rule Validation, and Multilingual Display',
        nodeLabels: []
      },
      {
        id: 'recipe-tag-process',
        title: 'tag_process.py',
        titleEn: 'tag_process.py',
        nodeLabels: ['tag_process.py']
      },
      {
        id: 'recipe-hard-rules',
        title: '强规则校验',
        titleEn: 'Hard Rule Validation',
        nodeLabels: ['强规则校验']
      },
      {
        id: 'recipe-audit-fields',
        title: '审计字段',
        titleEn: 'Audit Fields',
        nodeLabels: ['审计字段']
      },
      {
        id: 'recipe-remain-process',
        title: 'remain_process.py',
        titleEn: 'remain_process.py',
        nodeLabels: ['remain_process.py']
      },
      {
        id: 'recipe-remain-result',
        title: 'remain_result.csv',
        titleEn: 'remain_result.csv',
        nodeLabels: ['remain_result']
      },
      {
        id: 'recipe-final-json',
        title: '四、final_json 组装、交付与复核',
        titleEn: '4. final_json Assembly, Delivery, and Review',
        nodeLabels: []
      },
      {
        id: 'recipe-final-process',
        title: 'final_json_process.py',
        titleEn: 'final_json_process.py',
        nodeLabels: ['final_json_process.py']
      },
      {
        id: 'recipe-template',
        title: '匹配 template_final_json.csv',
        titleEn: 'Match template_final_json.csv',
        nodeLabels: ['匹配 template_final_json.csv']
      },
      {
        id: 'recipe-final-result',
        title: 'final_json_result.csv',
        titleEn: 'final_json_result.csv',
        nodeLabels: ['final_json_result.csv']
      },
      {
        id: 'recipe-json-check',
        title: 'JSON 解析复核',
        titleEn: 'JSON Parse Review',
        nodeLabels: ['JSON 解析复核']
      },
      {
        id: 'recipe-run-method',
        title: '推荐运行方式',
        titleEn: 'Recommended Run Methods',
        nodeLabels: []
      },
      {
        id: 'recipe-full-pipeline',
        title: '完整数据链路',
        titleEn: 'Full Data Pipeline',
        nodeLabels: []
      },
      {
        id: 'recipe-deliverables',
        title: '交付物',
        titleEn: 'Deliverables',
        nodeLabels: []
      },
      {
        id: 'recipe-preflight',
        title: '运行前检查',
        titleEn: 'Preflight Check',
        nodeLabels: []
      },
      {
        id: 'recipe-postflight',
        title: '运行后检查',
        titleEn: 'Post-run Check',
        nodeLabels: []
      },
      {
        id: 'recipe-maintenance',
        title: '维护建议',
        titleEn: 'Maintenance Suggestions',
        nodeLabels: []
      }
    ],
    readmeMarkdown: recipeCleanReadme,
    translations: {
      en: {
        name: 'Recipe Data Cleaning Skills',
        summary:
          'Connect to raw recipe files from the upstream crawler, use AI to complete nutrition and tag fields, and deliver JSON-format results to downstream server services.',
        flowImageAlt: 'Recipe data cleaning Skill flowchart',
        flowTextTranslations: {
          '食谱清洗 V2 项目整体操作流程与技术路径：SOP 口径、动态参考文件、Python CSV 流水线与 final_json 交付':
            'Overall recipe cleaning V2 workflow: SOP scope, dynamic references, Python CSV pipeline, and final_json delivery',
          '一、输入与口径确认': '1. Input and Scope Confirmation',
          'SOP / 清洗规范': 'SOP / Cleaning Rules',
          '确认字段与验收口径': 'Confirm fields and acceptance scope',
          '只作为业务参考': 'Business reference only',
          '原始食谱数据': 'Raw Recipe Data',
          '菜名、份量、食材、步骤': 'Name, serving, ingredients, steps',
          '动态参考配置': 'Dynamic Reference Configuration',
          '规则、词表、模板': 'Rules, word lists, templates',
          '运行编排入口': 'Orchestration Entry',
          '串行产出中间 CSV': 'Generate intermediate CSVs in sequence',
          '二、预处理、有效性判断与营养结构化': '2. Preprocessing, Validity Check, and Nutrition Structuring',
          '规范份量和时间': 'Normalize serving and time',
          '补齐翻译字段': 'Complete translation fields',
          '失败标记 validity=0': 'Mark failures as validity=0',
          '形成基础字段': 'Create base fields',
          'validity 作为开关': 'Use validity as switch',
          '无效行保留': 'Keep invalid rows',
          '按每份估算营养': 'Estimate nutrition per serving',
          '热量、糖、脂肪、蛋白': 'Calories, sugar, fat, protein',
          '只处理有效行': 'Process valid rows only',
          '生成 uuid 和 icon': 'Generate uuid and icon',
          '营养明细与食材结构': 'Nutrition details and ingredient structure',
          '输出 no_tag_result': 'Output no_tag_result',
          '结构化中间产物': 'Structured Intermediate Artifacts',
          '为强规则校验供数': 'Provide data for hard-rule validation',
          '可回溯、可抽查': 'Traceable and reviewable',
          '旁路规则：validity=0 的行继续写入后续 CSV，但不新增业务字段或 final_json':
            'Bypass rule: rows with validity=0 continue into later CSVs, but do not add business fields or final_json',
          '三、标签召回、规则校验与多语言展示': '3. Tag Recall, Rule Validation, and Multilingual Display',
          '读取规则和词表': 'Read rules and word lists',
          'LLM 候选 + 关键词': 'LLM candidates + keywords',
          '生成候选标签': 'Generate candidate tags',
          '强规则校验': 'Hard Rule Validation',
          '营养阈值定标签': 'Nutrition thresholds assign tags',
          '食材冲突做删除': 'Remove tags on ingredient conflicts',
          '准确率优先': 'Accuracy first',
          '审计字段': 'Audit Fields',
          '保留判断依据': 'Keep decision evidence',
          '读取 label_map': 'Read label_map',
          '描述、时长、tagList': 'Description, duration, tagList',
          '匹配目标语言': 'Match target language',
          '字段齐备': 'Fields complete',
          '等待组装': 'Ready for assembly',
          '可人工抽查': 'Manual spot-check ready',
          '四、final_json 组装、交付与复核': '4. final_json Assembly, Delivery, and Review',
          '匹配 template_final_json.csv': 'Match template_final_json.csv',
          'JSON 解析复核': 'JSON Parse Review',
          '交付物：final_json_result.csv 与各阶段中间 CSV。技术栈：Python csv/json/re/textutil、动态 RTF/CSV/XLSX 参考文件、LLM 补齐、规则校验与 JSON 模板渲染。':
            'Deliverables: final_json_result.csv and intermediate CSVs from each stage. Stack: Python csv/json/re/textutil, dynamic RTF/CSV/XLSX references, LLM completion, rule validation, and JSON template rendering.'
        },
        readmeMarkdown: recipeCleanReadmeEn
      }
    }
  }
];
