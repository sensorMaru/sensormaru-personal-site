export type ProjectItem = {
  slug: string;
  title: string;
  summary: string;
  details: string;
  role: string;
  period: string;
  url: string;
  featured?: boolean;
  highlights: string[];
};

export const projects: ProjectItem[] = [
  {
    slug: 'design-award-meta-search',
    title: 'Design Award Meta Search',
    summary: '一个面向设计奖项信息检索的作品，当前先作为首页重点项目展示。',
    details:
      '这个项目围绕设计奖项信息的检索、筛选、浏览和汇总体验展开，主要解决信息分散和检索效率的问题。当前仍部署在 Vercel，后续会迁移到 sensormaru.com 的子域名下，和个人站统一管理。',
    role: '项目作品',
    period: '已上线',
    url: 'https://design-award-meta-search.vercel.app/',
    featured: true,
    highlights: [
      '作为作品集里的重点案例优先展示在首页。',
      '当前保留外链访问，后续迁入个人域名体系。',
      '后续补充更多项目时可以直接沿用同一版式。'
    ]
  }
] as const;
