export const skills = [
  {
    title: '产品思维',
    items: ['需求调研', '功能定义', 'PRD', '埋点设计', '测试上线']
  },
  {
    title: 'AI / 智能体',
    items: [
      { label: 'Codex', icon: '/skill-logos/openai.svg', alt: 'OpenAI', tone: 'mono-dark' },
      { label: 'Coze', icon: '/skill-logos/coze.svg', alt: 'Coze' },
      { label: 'Dify', icon: '/skill-logos/dify.svg', alt: 'Dify' },
      { label: 'FastGPT', icon: '/skill-logos/fastgpt.svg', alt: 'FastGPT' },
      'Prompt 编写',
      'Skills 搭建'
    ]
  },
  {
    title: '设计工具',
    items: [
      { label: 'Figma', icon: '/skill-logos/figma.svg', alt: 'Figma' },
      { label: 'MasterGo', icon: '/skill-logos/mastergo.ico', alt: 'MasterGo' },
      { label: 'Axure', icon: '/skill-logos/axure.ico', alt: 'Axure' },
      { label: 'Notion', icon: '/skill-logos/notion.svg', alt: 'Notion', tone: 'mono-dark' },
      { label: 'Lovable', icon: '/skill-logos/lovable.png', alt: 'Lovable' }
    ]
  },
  {
    title: '数据分析',
    items: [
      { label: '神策', icon: '/skill-logos/sensorsdata.png', alt: '神策' },
      { label: 'Excel', icon: '/skill-logos/excel.svg', alt: 'Excel' },
      { label: 'MySQL', icon: '/skill-logos/mysql.svg', alt: 'MySQL' },
      { label: 'Navicat', icon: '/skill-logos/navicat.ico', alt: 'Navicat' },
      'SQL 查询',
      '数据清洗'
    ]
  },
  {
    title: '语言',
    items: ['英语六级', '英文产品资料阅读', '多语言内容整理']
  }
] as const;
