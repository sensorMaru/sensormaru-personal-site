import appStoreReviewReadme from '../data/sop-readmes/app-store-review-analysis.md?raw';
import appStoreReviewReadmeEn from '../data/sop-readmes/app-store-review-analysis.en.md?raw';
import recipeCleanReadme from '../data/sop-readmes/recipe-clean-v2.md?raw';
import recipeCleanReadmeEn from '../data/sop-readmes/recipe-clean-v2.en.md?raw';
import bpTranslatorReadme from '../data/sop-readmes/bp-translator.md?raw';
import bpTranslatorReadmeEn from '../data/sop-readmes/bp-translator.en.md?raw';
import vcmFoodReadme from '../data/sop-readmes/vcm-food-search-completion.md?raw';
import vcmFoodReadmeEn from '../data/sop-readmes/vcm-food-search-completion.en.md?raw';
import emgReadme from '../data/sop-readmes/emg-analysis.md?raw';
import emgReadmeEn from '../data/sop-readmes/emg-analysis.en.md?raw';

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
  },
  {
    name: '多语言自动翻译脚本',
    summary: '该脚本用于在产品上线新的语言时快速将全量文案翻译为该新语言，并生成csv字段',
    flowImage: {
      src: '/sop-assets/bp-translator-project-flow-4x3.svg',
      alt: '多语言自动翻译脚本流程图'
    },
    flowLinks: [
      {
        id: 'bp-translator-input',
        title: '一、输入与运行基础确认',
        titleEn: '1. Input and Runtime Confirmation',
        nodeLabels: []
      },
      {
        id: 'bp-translator-csv-contract',
        title: 'CSV 输入契约',
        titleEn: 'CSV Input Contract',
        nodeLabels: ['CSV 输入契约']
      },
      {
        id: 'bp-translator-runtime-config',
        title: '运行配置',
        titleEn: 'Runtime Configuration',
        nodeLabels: ['运行配置']
      },
      {
        id: 'bp-translator-local-entry',
        title: '本地执行入口',
        titleEn: 'Local Execution Entry',
        nodeLabels: ['本地执行入口']
      },
      {
        id: 'bp-translator-scope',
        title: '处理范围',
        titleEn: 'Processing Scope',
        nodeLabels: ['处理范围']
      },
      {
        id: 'bp-translator-mainline',
        title: '二、批量翻译与格式保护主链路',
        titleEn: '2. Batch Translation and Format Protection Mainline',
        nodeLabels: []
      },
      {
        id: 'bp-translator-read-csv',
        title: '读取 CSV',
        titleEn: 'Read CSV',
        nodeLabels: ['读取 CSV']
      },
      {
        id: 'bp-translator-select-rows',
        title: '筛选行',
        titleEn: 'Select Rows',
        nodeLabels: ['筛选行']
      },
      {
        id: 'bp-translator-batch-requests',
        title: '批量请求',
        titleEn: 'Batch Requests',
        nodeLabels: ['批量请求']
      },
      {
        id: 'bp-translator-pt-br',
        title: 'pt-BR 翻译',
        titleEn: 'pt-BR Translation',
        nodeLabels: ['pt-BR 翻译']
      },
      {
        id: 'bp-translator-format-validation',
        title: '格式校验',
        titleEn: 'Format Validation',
        nodeLabels: ['格式校验']
      },
      {
        id: 'bp-translator-write-back',
        title: '写回内存行',
        titleEn: 'Write Back to In-Memory Rows',
        nodeLabels: ['写回内存行']
      },
      {
        id: 'bp-translator-diagnostics',
        title: '异常处理与诊断输出',
        titleEn: 'Error Handling and Diagnostic Output',
        nodeLabels: []
      },
      {
        id: 'bp-translator-error-handling',
        title: '异常处理',
        titleEn: 'Error Handling',
        nodeLabels: ['异常处理']
      },
      {
        id: 'bp-translator-diagnostic-output',
        title: '诊断输出',
        titleEn: 'Diagnostic Output',
        nodeLabels: ['诊断输出']
      },
      {
        id: 'bp-translator-delivery',
        title: '三、CSV 交付与复核验收',
        titleEn: '3. CSV Delivery and Review Acceptance',
        nodeLabels: []
      },
      {
        id: 'bp-translator-output',
        title: '生成 loco_add.csv',
        titleEn: 'Generate loco_add.csv',
        nodeLabels: ['生成 loco_add.csv']
      },
      {
        id: 'bp-translator-structure-review',
        title: '结构复核',
        titleEn: 'Structure Review',
        nodeLabels: ['结构复核']
      },
      {
        id: 'bp-translator-format-review',
        title: '格式复核',
        titleEn: 'Format Review',
        nodeLabels: ['格式复核']
      },
      {
        id: 'bp-translator-rerun',
        title: '复跑策略',
        titleEn: 'Rerun Strategy',
        nodeLabels: ['复跑策略']
      }
    ],
    readmeMarkdown: bpTranslatorReadme,
    translations: {
      en: {
        name: 'Multilingual Auto Translation Script',
        summary:
          'When a product launches a new language, this script quickly translates the full copy set into that language and generates CSV fields.',
        flowImageAlt: 'Multilingual auto translation script flowchart',
        flowTextTranslations: {
          '基于 CSV 列位置、OpenAI 批量翻译、占位符与换行校验、loco_add.csv 交付的 Brazilian Portuguese 本地化 SOP':
            'Brazilian Portuguese localization SOP based on CSV column positions, OpenAI batch translation, placeholder and line-break validation, and loco_add.csv delivery',
          '一、输入与运行基础确认': '1. Input and Runtime Confirmation',
          'CSV 输入契约': 'CSV Input Contract',
          'wisemeal-bundle-2.csv': 'wisemeal-bundle-2.csv',
          '第 1 列英文，第 2 列译文': 'Column 1 English, column 2 translation',
          '运行配置': 'Runtime Configuration',
          'account.yaml / 环境变量': 'account.yaml / environment variables',
          'base_url、api_key、model': 'base_url, api_key, model',
          '本地执行入口': 'Local Execution Entry',
          'PyCharm Terminal': 'PyCharm Terminal',
          'python3 bp_trans.py': 'python3 bp_trans.py',
          '处理范围': 'Processing Scope',
          '默认全量处理': 'Process all rows by default',
          '--limit / --skip-existing 可选': '--limit / --skip-existing optional',
          '二、批量翻译与格式保护主链路': '2. Batch Translation and Format Protection Mainline',
          '读取 CSV': 'Read CSV',
          '保留首行表头': 'Preserve first-row header',
          '补齐不足两列行': 'Pad rows with fewer than two columns',
          'utf-8-sig + csv.reader': 'utf-8-sig + csv.reader',
          '筛选行': 'Select Rows',
          '第 1 列非空即处理': 'Process rows with non-empty column 1',
          '默认覆盖第 2 列': 'Overwrite column 2 by default',
          '空原文行跳过': 'Skip empty source rows',
          '批量请求': 'Batch Requests',
          '按 batch-size 分组': 'Group by batch-size',
          'Chat Completions JSON': 'Chat Completions JSON',
          '失败自动重试': 'Retry automatically on failure',
          'pt-BR 翻译': 'pt-BR Translation',
          '移动 App 本地化口径': 'Mobile App localization style',
          '保留品牌、单位、术语': 'Preserve brands, units, and terms',
          'temperature 0.1': 'temperature 0.1',
          '格式校验': 'Format Validation',
          '保留 %@ 占位符': 'Preserve %@ placeholders',
          '按原文行数换行': 'Match source line count',
          '异常时停止写错数据': 'Stop before writing bad data',
          '写回内存行': 'Write Back to In-Memory Rows',
          '译文写入第 2 列': 'Write translation to column 2',
          '保留其他列与原顺序': 'Preserve other columns and order',
          '逐批累计进度': 'Accumulate progress by batch',
          '异常处理：缺少配置、接口失败、JSON 结构异常':
            'Error handling: missing config, API failures, invalid JSON shape',
          '空译文、占位符不匹配': 'Empty translations, placeholder mismatch',
          '诊断输出：终端进度、选中行数、跳过空原文行':
            'Diagnostics: terminal progress, selected rows, skipped empty source rows',
          '重试原因、最终写出路径': 'Retry reasons, final write path',
          '三、CSV 交付与复核验收': '3. CSV Delivery and Review Acceptance',
          '生成 loco_add.csv': 'Generate loco_add.csv',
          '写入 utf-8-sig CSV': 'Write utf-8-sig CSV',
          '保留表头与行顺序': 'Preserve header and row order',
          '结构复核': 'Structure Review',
          '行数与输入保持一致': 'Row count matches input',
          '第 2 列非空数量符合预期': 'Column 2 non-empty count matches expectations',
          '格式复核': 'Format Review',
          '%@ 数量不变': '%@ count unchanged',
          '换行结构与英文一致': 'Line-break structure matches English',
          '复跑策略': 'Rerun Strategy',
          '默认全量覆盖': 'Overwrite all by default',
          '小批量用 --limit 验证': 'Use --limit for small-batch validation',
          '交付物：loco_add.csv、bp_trans.py、account.yaml。核心验收：第一列英文原文被翻译到第二列，%@ 与换行格式按 SOP 保持一致。':
            'Deliverables: loco_add.csv, bp_trans.py, and account.yaml. Core acceptance: English source text in column 1 is translated into column 2 while %@ and line breaks stay consistent with the SOP.'
        },
        readmeMarkdown: bpTranslatorReadmeEn
      }
    }
  },
  {
    name: '食物库搜索失败自动补全skills',
    summary: '该脚本用于对接上游神策端数据库搜索无结果的数据，使用AI将其补全并交付至下游运营端上传新数据',
    flowImage: {
      src: '/sop-assets/vcm-food-project-flow-4x3.svg',
      alt: '食物库搜索失败自动补全 Skill 流程图'
    },
    flowLinks: [
      {
        id: 'vcm-food-flowchart-reference',
        title: '对应流程图',
        titleEn: 'Flowchart Reference',
        nodeLabels: []
      },
      {
        id: 'vcm-food-input',
        title: '一、输入与处理口径确认',
        titleEn: '1. Input and Processing Scope Confirmation',
        nodeLabels: []
      },
      {
        id: 'vcm-food-raw-data',
        title: '原始搜索数据',
        titleEn: 'Raw Search Data',
        nodeLabels: ['原始搜索数据']
      },
      {
        id: 'vcm-food-lang-allowlist',
        title: '语言白名单',
        titleEn: 'Language Allowlist',
        nodeLabels: ['语言白名单']
      },
      {
        id: 'vcm-food-runtime-config',
        title: '运行配置',
        titleEn: 'Runtime Configuration',
        nodeLabels: ['运行配置']
      },
      {
        id: 'vcm-food-filtering-rules',
        title: '过滤规则',
        titleEn: 'Filtering Rules',
        nodeLabels: ['过滤规则']
      },
      {
        id: 'vcm-food-mainline',
        title: '二、食物清洗、翻译与结构化主链路',
        titleEn: '2. Food Cleaning, Translation, and Structuring Mainline',
        nodeLabels: []
      },
      {
        id: 'vcm-food-row-reading',
        title: '逐行读取',
        titleEn: 'Row-by-Row Reading',
        nodeLabels: ['逐行读取']
      },
      {
        id: 'vcm-food-language-mapping',
        title: '语言映射',
        titleEn: 'Language Mapping',
        nodeLabels: ['语言映射']
      },
      {
        id: 'vcm-food-brand-recognition',
        title: '品牌识别',
        titleEn: 'Brand Recognition',
        nodeLabels: ['品牌识别']
      },
      {
        id: 'vcm-food-name-generation',
        title: '食物名生成',
        titleEn: 'Food Name Generation',
        nodeLabels: ['食物名生成']
      },
      {
        id: 'vcm-food-chinese-explanation',
        title: '中文释义',
        titleEn: 'Chinese Explanation',
        nodeLabels: ['中文释义']
      },
      {
        id: 'vcm-food-unit-amount',
        title: '单位与数量',
        titleEn: 'Unit and Amount',
        nodeLabels: ['单位与数量']
      },
      {
        id: 'vcm-food-online-fallback',
        title: '联网兜底与异常处理',
        titleEn: 'Online Fallback and Error Handling',
        nodeLabels: ['联网兜底']
      },
      {
        id: 'vcm-food-quality-closure',
        title: '质量收口',
        titleEn: 'Quality Closure',
        nodeLabels: ['质量收口']
      },
      {
        id: 'vcm-food-delivery',
        title: '三、清洗结果、营养估算与交付验收',
        titleEn: '3. Cleaning Results, Nutrition Estimation, and Delivery Acceptance',
        nodeLabels: []
      },
      {
        id: 'vcm-food-cleaning-csv',
        title: '清洗 CSV',
        titleEn: 'Cleaning CSV',
        nodeLabels: ['清洗 CSV']
      },
      {
        id: 'vcm-food-nutrition-estimation',
        title: '营养估算',
        titleEn: 'Nutrition Estimation',
        nodeLabels: ['营养估算']
      },
      {
        id: 'vcm-food-excel-splitting',
        title: 'Excel 分片',
        titleEn: 'Excel Splitting',
        nodeLabels: ['Excel 分片']
      },
      {
        id: 'vcm-food-acceptance-review',
        title: '验收复核',
        titleEn: 'Acceptance Review',
        nodeLabels: ['验收复核']
      },
      {
        id: 'vcm-food-output-list',
        title: '输出物清单',
        titleEn: 'Output List',
        nodeLabels: []
      },
      {
        id: 'vcm-food-cleaning-result',
        title: '清洗结果',
        titleEn: 'Cleaning Result',
        nodeLabels: []
      },
      {
        id: 'vcm-food-nutrition-splits',
        title: '营养分片',
        titleEn: 'Nutrition Split Files',
        nodeLabels: []
      },
      {
        id: 'vcm-food-project-notes',
        title: '项目说明',
        titleEn: 'Project Notes',
        nodeLabels: []
      },
      {
        id: 'vcm-food-future',
        title: '后续扩展方向',
        titleEn: 'Future Extension Directions',
        nodeLabels: []
      },
      {
        id: 'vcm-food-brand-rules',
        title: '增加品牌与食物规则',
        titleEn: 'Add Brand and Food Rules',
        nodeLabels: []
      },
      {
        id: 'vcm-food-regression-samples',
        title: '固化回归样例',
        titleEn: 'Stabilize Regression Samples',
        nodeLabels: []
      },
      {
        id: 'vcm-food-nutrition-profiles',
        title: '优化营养档案',
        titleEn: 'Improve Nutrition Profiles',
        nodeLabels: []
      }
    ],
    readmeMarkdown: vcmFoodReadme,
    translations: {
      en: {
        name: 'Food Library Failed Search Auto Completion Skills',
        summary:
          'This script connects to no-result search data from the upstream Sensors Data database, uses AI to complete it, and delivers new data for upload in the downstream operations console.',
        flowImageAlt: 'Food library failed search auto completion Skill flowchart',
        flowTextTranslations: {
          '基于 raw_data、lang 白名单、Python 多语言清洗与营养估算分片交付的食物库处理 SOP':
            'Food library processing SOP based on raw_data, language allowlist, Python multilingual cleaning, and nutrition-estimation split delivery',
          '一、输入与处理口径确认': '1. Input and Processing Scope Confirmation',
          '原始搜索数据': 'Raw Search Data',
          '读取 raw_data.xlsx': 'Read raw_data.xlsx',
          '字段需包含 content 与 lang': 'Fields must include content and lang',
          '语言白名单': 'Language Allowlist',
          '读取 lang.xlsx': 'Read lang.xlsx',
          '按源 lang 映射目标语言': 'Map source lang to target language',
          '运行配置': 'Runtime Configuration',
          '相对路径随项目迁移': 'Relative paths move with the project',
          'account.yaml 仅作本地 LLM 配置': 'account.yaml is local LLM config only',
          '过滤规则': 'Filtering Rules',
          '跳过空值、未知、无关词': 'Skip empty, unknown, unrelated terms',
          '语言匹配不到则删除该行': 'Delete rows with unmatched language',
          '二、食物清洗、翻译与结构化主链路': '2. Food Cleaning, Translation, and Structuring Mainline',
          '逐行读取': 'Row-by-Row Reading',
          '标准化 content': 'Normalize content',
          '去掉食物数量': 'Remove food quantities',
          '保留原始统计字段': 'Preserve original stats fields',
          '语言映射': 'Language Mapping',
          'en_TH 映射 th': 'Map en_TH to th',
          'zh-CN / zh-MY 为 zh-cn': 'zh-CN / zh-MY become zh-cn',
          '其他 zh 归为繁中 zh': 'Other zh variants become zh',
          '品牌识别': 'Brand Recognition',
          '别名词典 + 搜索辅助': 'Alias dictionary + search assist',
          '排除普通食物词': 'Exclude common food terms',
          '同语言标准化品牌写法': 'Normalize brand spelling per language',
          '食物名生成': 'Food Name Generation',
          '必须为具体食物': 'Must be a specific food',
          '品牌食物用逗号连接': 'Join brand and food with comma',
          '语言必须跟 lang 一致': 'Language must match lang',
          '中文释义': 'Chinese Explanation',
          'trans 输出简体中文': 'trans outputs Simplified Chinese',
          '本地词典兜底': 'Fallback to local dictionary',
          '不得为空': 'Must not be empty',
          '单位与数量': 'Unit and Amount',
          '蛋 / 水果 / 饮品 / 份量分类': 'Classify eggs / fruit / drinks / servings',
          'unit 按 lang 本地化': 'Localize unit by lang',
          '克类 amount=100，其余=1': 'Gram amount=100, others=1',
          '联网兜底：搜索结果 + LLM 清洗': 'Online fallback: search results + LLM cleaning',
          '网络或配置失败时回退本地规则': 'Fall back to local rules on network or config failure',
          '质量收口：去重、修复多逗号': 'Quality closure: deduplicate, fix extra commas',
          '避免品牌单独进入 food_name': 'Avoid brand-only food_name',
          '三、清洗结果、营养估算与交付验收': '3. Cleaning Results, Nutrition Estimation, and Delivery Acceptance',
          '清洗 CSV': 'Cleaning CSV',
          '生成 vcm_food_clean.csv': 'Generate vcm_food_clean.csv',
          '终端展示关键字段': 'Show key fields in terminal',
          '营养估算': 'Nutrition Estimation',
          '读取 food_name、unit、amount': 'Read food_name, unit, amount',
          '匹配每 100g 营养档案': 'Match per-100g nutrition profiles',
          'Excel 分片': 'Excel Splitting',
          '每 180 条一个 xlsx': 'One xlsx per 180 rows',
          '每个文件保留表头': 'Keep header in each file',
          '验收复核': 'Acceptance Review',
          '字段非空、语言一致、去重': 'Non-empty fields, language match, dedupe',
          '0 营养值置空，热量取整': 'Blank zero nutrition values, round calories',
          '交付物：vcm_food_clean.csv、vcm_food_nutri_part*.xlsx、可复核终端日志。私密配置 account.yaml 仅本地使用，不纳入公开交付。':
            'Deliverables: vcm_food_clean.csv, vcm_food_nutri_part*.xlsx, and reviewable terminal logs. Private account.yaml config is local only and excluded from public delivery.'
        },
        readmeMarkdown: vcmFoodReadmeEn
      }
    }
  },
  {
    name: '坐姿肩颈肌电信号&疲劳度分析skills',
    summary:
      '该 Skill 用于从 EDF 肌电原始数据中解析通道、计算 RMS/对称性/MF/MPF/疲劳评分，并生成终端摘要与 HTML 对比报告。',
    flowImage: {
      src: '/sop-assets/emg-analysis-project-flow-4x3.svg',
      alt: '坐姿肩颈肌电信号与疲劳度分析 Skill 流程图'
    },
    flowLinks: [
      {
        id: 'emg-input-scope',
        title: '一、输入与实验口径确认',
        titleEn: '1. Input and Experiment Scope Confirmation',
        nodeLabels: []
      },
      {
        id: 'emg-task-scope',
        title: 'SOP / 任务口径',
        titleEn: 'SOP / Task Scope',
        nodeLabels: ['SOP / 任务口径']
      },
      {
        id: 'emg-edf-directory',
        title: 'EDF 文件目录',
        titleEn: 'EDF File Directory',
        nodeLabels: ['EDF 文件目录']
      },
      {
        id: 'emg-runtime',
        title: '运行环境',
        titleEn: 'Runtime Environment',
        nodeLabels: ['运行环境']
      },
      {
        id: 'emg-channel-grouping',
        title: '通道与肌肉分组',
        titleEn: 'Channel and Muscle Grouping',
        nodeLabels: ['通道与肌肉分组']
      },
      {
        id: 'emg-mainline',
        title: '二、EDF 解析与肌电指标计算主链路',
        titleEn: '2. EDF Parsing and EMG Metric Calculation Mainline',
        nodeLabels: []
      },
      {
        id: 'emg-read-edf',
        title: '读取 EDF',
        titleEn: 'Read EDF',
        nodeLabels: ['读取 EDF']
      },
      {
        id: 'emg-unit-conversion',
        title: '物理量转换',
        titleEn: 'Physical Unit Conversion',
        nodeLabels: ['物理量转换']
      },
      {
        id: 'emg-merge-channels',
        title: '合并肌肉通道',
        titleEn: 'Merge Muscle Channels',
        nodeLabels: ['合并肌肉通道']
      },
      {
        id: 'emg-rms-symmetry',
        title: 'RMS 与对称性',
        titleEn: 'RMS and Symmetry',
        nodeLabels: ['RMS 与对称性']
      },
      {
        id: 'emg-mf-mpf-fatigue',
        title: 'MF / MPF 疲劳',
        titleEn: 'MF / MPF Fatigue',
        nodeLabels: ['MF / MPF 疲劳']
      },
      {
        id: 'emg-fatigue-score',
        title: '综合疲劳评分',
        titleEn: 'Composite Fatigue Score',
        nodeLabels: ['综合疲劳评分']
      },
      {
        id: 'emg-diagnostics',
        title: '异常处理与诊断输出',
        titleEn: 'Error Handling and Diagnostic Output',
        nodeLabels: []
      },
      {
        id: 'emg-error-handling',
        title: '异常处理',
        titleEn: 'Error Handling',
        nodeLabels: ['异常处理']
      },
      {
        id: 'emg-terminal-diagnostics',
        title: '终端诊断',
        titleEn: 'Terminal Diagnostics',
        nodeLabels: ['终端诊断']
      },
      {
        id: 'emg-delivery',
        title: '三、批量对比、可视化交付与复核',
        titleEn: '3. Batch Comparison, Visual Delivery, and Review',
        nodeLabels: []
      },
      {
        id: 'emg-batch-analysis',
        title: '批量分析',
        titleEn: 'Batch Analysis',
        nodeLabels: ['批量分析']
      },
      {
        id: 'emg-html-report',
        title: 'HTML 对比报告',
        titleEn: 'HTML Comparison Report',
        nodeLabels: ['HTML 对比报告']
      },
      {
        id: 'emg-csv-export',
        title: 'CSV 可选导出',
        titleEn: 'Optional CSV Export',
        nodeLabels: ['CSV 可选导出']
      },
      {
        id: 'emg-testing-review',
        title: '测试与复盘',
        titleEn: 'Testing and Review',
        nodeLabels: ['测试与复盘']
      }
    ],
    readmeMarkdown: emgReadme,
    translations: {
      en: {
        name: 'Seated Shoulder and Neck EMG Signal and Fatigue Analysis Skills',
        summary:
          'This Skill parses channels from raw EDF EMG data, calculates RMS, symmetry, MF, MPF, and fatigue scores, and generates terminal summaries plus an HTML comparison report.',
        flowImageAlt: 'Seated shoulder and neck EMG signal and fatigue analysis Skill flowchart',
        flowTextTranslations: {
          '基于 SOP 口径、EDF 原始肌电解析、Python 指标计算与 HTML 可视化对比的整体技术路径':
            'Overall technical path based on SOP scope, raw EDF EMG parsing, Python metric calculation, and HTML visual comparison',
          '一、输入与实验口径确认': '1. Input and Experiment Scope Confirmation',
          'SOP / 任务口径': 'SOP / Task Scope',
          '确认角度、动作、时段': 'Confirm angle, action, and time segment',
          '画画 / 看书 / 积木等实验条件': 'Experiment conditions such as drawing / reading / blocks',
          'EDF 文件目录': 'EDF File Directory',
          'mat-edf/ 下所有 .edf': 'All .edf files under mat-edf/',
          '文件名保留角度与任务信息': 'File names preserve angle and task info',
          '运行环境': 'Runtime Environment',
          'Python 标准库': 'Python standard library',
          '无需额外第三方依赖': 'No extra third-party dependencies',
          '通道与肌肉分组': 'Channel and Muscle Grouping',
          '4 通道按标签合并': 'Merge 4 channels by label',
          '两块肌肉，每块 2 个重复通道': 'Two muscles, two repeated channels each',
          '二、EDF 解析与肌电指标计算主链路': '2. EDF Parsing and EMG Metric Calculation Mainline',
          '读取 EDF': 'Read EDF',
          '解析固定宽度头部': 'Parse fixed-width header',
          '读取记录与采样率': 'Read records and sampling rates',
          '支持元数据快速检查': 'Supports fast metadata checks',
          '物理量转换': 'Physical Unit Conversion',
          'int16 数字量转换': 'Convert int16 digital values',
          '输出 mV 样本序列': 'Output mV sample series',
          '校验截断和量程异常': 'Check truncation and range issues',
          '合并肌肉通道': 'Merge Muscle Channels',
          '同标签通道求均值': 'Average channels with same label',
          '形成两块肌肉序列': 'Create two muscle series',
          '要求采样数和采样率一致': 'Require matching sample counts and rates',
          'RMS 与对称性': 'RMS and Symmetry',
          '计算全程 RMS': 'Calculate full-duration RMS',
          '比较左右 / 两肌肉发力': 'Compare left-right / two-muscle activation',
          '输出更活跃肌肉': 'Output more active muscle',
          'MF / MPF 疲劳': 'MF / MPF Fatigue',
          '首尾窗口频域分析': 'Frequency analysis on first and last windows',
          '计算频率变化': 'Calculate frequency change',
          '频率下降提示疲劳增强': 'Frequency drop indicates stronger fatigue evidence',
          '综合疲劳评分': 'Composite Fatigue Score',
          'MF 下降、MPF 下降、RMS 上升': 'MF drop, MPF drop, RMS rise',
          '生成 0-100 分疲劳证据': 'Generate 0-100 fatigue evidence score',
          'low / moderate / high 分级': 'low / moderate / high levels',
          '异常处理：EDF 头部异常、数据截断': 'Error handling: EDF header errors, data truncation',
          '通道数量不符、采样率不一致': 'Channel-count mismatch, sampling-rate mismatch',
          '终端诊断：文件元数据、通道标签': 'Terminal diagnostics: file metadata, channel labels',
          '样本数、单文件指标摘要': 'Sample counts, single-file metric summary',
          '三、批量对比、可视化交付与复核': '3. Batch Comparison, Visual Delivery, and Review',
          '批量分析': 'Batch Analysis',
          '遍历目录全部 EDF': 'Scan all EDF files in directory',
          '逐文件输出核心摘要': 'Output core summary per file',
          'HTML 对比报告': 'HTML Comparison Report',
          'RMS、对称性、疲劳评分': 'RMS, symmetry, fatigue score',
          'MF / MPF 起止值与变化': 'MF / MPF start-end values and change',
          'CSV 可选导出': 'Optional CSV Export',
          '单文件对齐样本表': 'Aligned sample table for one file',
          'time_s + 各通道 mV': 'time_s + each channel mV',
          '测试与复盘': 'Testing and Review',
          'unittest 验证解析和报告': 'unittest validates parsing and reports',
          '对比不同角度和任务疲劳度': 'Compare fatigue across angles and tasks',
          '交付物：终端分析摘要、emg_comparison.html、可选 emg_output.csv、测试用例。当前口径适用于两块肌肉、四通道 EDF 肌电文件。':
            'Deliverables: terminal analysis summary, emg_comparison.html, optional emg_output.csv, and tests. The current scope applies to two-muscle, four-channel EDF EMG files.'
        },
        readmeMarkdown: emgReadmeEn
      }
    }
  }
];
