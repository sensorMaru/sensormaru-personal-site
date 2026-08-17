export type ProjectItem = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  url: string;
  featured?: boolean;
};

export const projects: ProjectItem[] = [
  {
    slug: 'design-award-meta-search',
    title: 'Design Award Meta Search',
    summary: '一个面向设计奖项信息检索的项目，当前仍在 Vercel 托管，后续会迁到个人域名体系下。',
    role: '项目作品',
    period: '已上线',
    url: 'https://design-award-meta-search.vercel.app/',
    featured: true
  }
] as const;
