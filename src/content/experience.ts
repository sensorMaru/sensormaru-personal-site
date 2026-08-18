export type ExperienceItem = {
  kind: 'education' | 'internship';
  title: string;
  org: string;
  period: string;
  summary: string;
  logo?: {
    src: string;
    alt: string;
    variant?: 'badge' | 'plain' | 'large';
  };
  bullets?: string[];
  translations?: {
    en?: {
      title?: string;
      org?: string;
      summary?: string;
      bullets?: string[];
    };
  };
};

export const experience: ExperienceItem[] = [
  {
    kind: 'internship',
    title: 'AI 产品实习生',
    org: '杭州小影创新科技股份有限公司',
    period: '2026.04 - 2026.07',
    summary: '围绕 WiseMeal 的海外饮食与运动追踪体验，梳理 AI 识别、食物搜索和运动记录链路。',
    logo: {
      src: '/experience-logos/quvideo.png',
      alt: '小影科技 logo',
      variant: 'plain'
    },
    bullets: [
      '围绕 WiseMeal 海外用户饮食与运动追踪体验，拆解 AI 运动消耗分析、AI 食物营养分析、自定义运动和 AI 语音录入等功能需求。完成需求定义、交互流程梳理、PRD 撰写及评审跟进。',
      '基于后台用户反馈、数据看板、竞品分析和用户路径，归因饮食记录、运动记录、AI 识别、食物搜索等场景中的问题。结合用户频次、影响范围和实现成本输出优先级建议。',
      '搭建神策数据看板，追踪高频搜索词、搜索结果异常和食物库缺失问题。使用 Codex 辅助完成食物数据补全、字段标准化和结构化清洗，提升搜索命中率。',
      '参与 AI 拍照识别、AI 语音录入、运动记录和食物搜索等核心路径的埋点设计。分析记录完成率、搜索失败率、AI 功能使用率和用户编辑率，为功能迭代提供依据。',
      '参与 WiseMeal 多语言内容建设，定义食谱标签、食材、步骤和营养字段的清洗规则。完成泰语、日语等多语言食谱数据清洗，并沉淀为可复用的 Codex Skills。'
    ],
    translations: {
      en: {
        title: 'AI Product Intern',
        org: 'Hangzhou QuVideo Innovation Technology Co., Ltd.',
        summary: 'Worked around WiseMeal’s overseas diet and exercise tracking experience, clarifying AI recognition, food search, and workout logging flows.',
        bullets: [
          'Broke down requirements for WiseMeal’s overseas diet and workout tracking experience, including AI calorie analysis, AI nutrition analysis, custom workouts, and AI voice logging. Completed requirement definition, interaction flows, PRDs, and review follow-up.',
          'Analyzed user feedback, dashboards, competitor flows, and usage paths to identify issues in diet logging, workout logging, AI recognition, and food search. Prioritized needs by frequency, impact, and implementation cost.',
          'Built Sensors Data dashboards to track high-frequency searches, abnormal search results, and missing food database content. Used Codex to support food data completion, field standardization, and structured cleaning to improve search hit rates.',
          'Participated in event tracking design for AI photo recognition, AI voice logging, workout logging, and food search. Analyzed completion rate, search failure rate, AI feature usage, and user edit rate to inform product iterations.',
          'Supported WiseMeal’s multilingual content pipeline by defining cleaning rules for recipe tags, ingredients, steps, and nutrition fields. Cleaned Thai and Japanese recipe data and turned reusable logic into Codex Skills.'
        ]
      }
    }
  },
  {
    kind: 'internship',
    title: 'AI 产品实习生',
    org: '火石创造科技有限公司',
    period: '2025.12 - 2026.03',
    summary: '评审招商智能体试用阶段的输出报告和信息结构，定位表达不清和信息缺失问题。',
    logo: {
      src: '/experience-logos/huoshi-transparent.png',
      alt: '火石创造 logo'
    },
    bullets: [
      '对标竞品和权威报告格式，测评招商智能体输出报告的内容全面性、结构连贯性和表达准确性。定位结构错误、信息缺失和表达不清等问题，并整理为研发反馈。',
      '测试产品各功能模块的交互、数据和响应问题，按问题类型建立反馈清单。协助团队在标品试用阶段持续优化智能体体验。',
      '拆解济南园区招商项目流程，梳理项目文件管理、线索跟进和协作效率痛点。设计以项目跟进为中心的数字化管理方案，撰写 PRD 并绘制高保真原型。',
      '定期排查重点数据表字段质量，标记空值率、缺失率和错误率较高的字段。对企业新闻舆情、产业链标签等待入库数据进行抽样筛查并反馈数据中心。',
      '使用 Coze 搭建自动化批量调研 Agent，通过插件调用与 Prompt 工程采集和分析全国数百个产业园区动态。将调研周期由数周缩短至数天，输出结构化报告支持产品决策。'
    ],
    translations: {
      en: {
        title: 'AI Product Intern',
        org: 'Huoshichuangzao Technology Co., Ltd.',
        summary: 'Reviewed output reports and information architecture during the trial phase of an investment promotion agent, identifying unclear expression and missing information.',
        bullets: [
          'Benchmarked competitors and authoritative report formats to evaluate the agent’s output for completeness, structure, and expression accuracy. Identified structural errors, missing information, and unclear wording, then consolidated feedback for engineering.',
          'Tested interaction, data, and response issues across product modules, organizing them by issue type. Helped the team continuously improve the agent experience during the standard product trial phase.',
          'Mapped the Jinan park investment promotion workflow and identified pain points in project file management, lead follow-up, and collaboration efficiency. Designed a project-follow-up-centered digital management solution, wrote the PRD, and created high-fidelity prototypes.',
          'Regularly reviewed key data table fields and flagged high null, missing, and error rates. Sampled incoming company news, public opinion, and industry chain tag data, then reported quality findings to the data center.',
          'Built an automated batch research agent in Coze using plugin calls and prompt engineering to collect and analyze updates from hundreds of industrial parks. Shortened research cycles from weeks to days and produced structured reports for product decisions.'
        ]
      }
    }
  },
  {
    kind: 'education',
    title: '硕士 · 工业设计',
    org: '浙江工业大学 · 设计与建筑学院',
    period: '2024.09 - 2027.06',
    summary: '持续做设计与产品方向的学习和实践，关注更清晰的产品路径与体验优化。',
    logo: {
      src: '/experience-logos/zhejiang-university-of-technology.png',
      alt: '浙江工业大学 logo',
      variant: 'large'
    },
    bullets: [
      '主修课程：信息产品技术、设计思维、企业实践等',
      '2024-2025 学业一等奖学金',
      '2024 全国三维数字化创新设计大赛省级特等奖'
    ],
    translations: {
      en: {
        title: 'M.A. · Industrial Design',
        org: 'Zhejiang University of Technology · College of Design and Architecture',
        summary: 'Continuing product and design study and practice, with attention to clearer product paths and experience optimization.',
        bullets: [
          'Major coursework: information product technology, design thinking, enterprise practice, and related topics',
          '2024-2025 First-Class Academic Scholarship',
          '2024 National 3D Digital Innovation Design Competition, Provincial Special Prize'
        ]
      }
    }
  },
  {
    kind: 'education',
    title: '本科 · 创新设计',
    org: '中国美术学院 · 创新设计学院',
    period: '2020.09 - 2024.06',
    summary: '在创新设计训练里建立了研究、表达和方案落地的基础。',
    logo: {
      src: '/experience-logos/china-academy-of-art.png',
      alt: '中国美术学院 logo'
    },
    bullets: [
      '主修课程：智能硬件与系统开发、敏捷算法、服务设计等',
      '2021-2022 学业三等奖学金',
      '2020-2021 学业二等奖学金'
    ],
    translations: {
      en: {
        title: 'B.A. · Innovative Design',
        org: 'China Academy of Art · School of Innovation Design',
        summary: 'Built a foundation in research, communication, and implementation through innovation design training.',
        bullets: [
          'Major coursework: intelligent hardware and system development, agile algorithms, service design, and related topics',
          '2021-2022 Third-Class Academic Scholarship',
          '2020-2021 Second-Class Academic Scholarship'
        ]
      }
    }
  }
] as const;
