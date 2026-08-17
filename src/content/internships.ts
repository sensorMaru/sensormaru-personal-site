export type InternshipItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export const internships: InternshipItem[] = [
  {
    company: '杭州小影创新科技股份有限公司',
    role: 'AI 产品实习生',
    period: '2026.04 - 2026.07',
    bullets: [
      '围绕 WiseMeal 的海外饮食与运动追踪体验，梳理 AI 识别、食物搜索和运动记录链路，推动核心路径更短。',
      '参与需求拆解、PRD 撰写和原型设计，协同设计、研发和运营推进上线。',
      '基于用户反馈和竞品分析整理问题清单，持续跟进功能优先级。',
      '补充多语言内容与本地化规则，支持中英文等多语言场景。'
    ]
  },
  {
    company: '火石创造科技有限公司',
    role: 'AI 产品实习生',
    period: '2025.12 - 2026.03',
    bullets: [
      '评审招商智能体试用阶段的输出报告和信息结构，定位表达不清和信息缺失问题。',
      '拆解济南园区招商流程，输出更适配项目跟进的数字化管理方案。',
      '撰写 PRD 并绘制高保真原型，和设计、开发一起推进功能落地。',
      '通过插件调用与 Prompt 工程搭建批量调研 Agent，缩短信息采集与分析周期。'
    ]
  }
] as const;
