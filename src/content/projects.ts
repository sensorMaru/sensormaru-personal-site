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
  cardBadge?: string;
  cardEyebrow?: string;
  cardTag?: string;
  image?: {
    src: string;
    alt: string;
  };
  detailImages?: {
    src: string;
    alt: string;
  }[];
  detailVideo?: {
    src: string;
    type: string;
    poster?: string;
  };
  translations?: {
    en?: {
      title?: string;
      summary?: string;
      details?: string;
      role?: string;
      period?: string;
      highlights?: string[];
      imageAlt?: string;
      detailImageAlts?: string[];
    };
  };
};

export const projects: ProjectItem[] = [
  {
    slug: 'global-design-award-museum',
    title: 'Global Design Award Museum',
    summary: '一个面向全球设计奖项的检索与归档空间。',
    details:
      '设计大奖官网分散且普遍缺乏开放 API，设计师寻找参考作品需要反复浏览多个官网，效率较低。',
    role: '项目作品',
    period: '已上线',
    url: 'https://design-award-meta-search.vercel.app/',
    cardBadge: 'GDA',
    cardEyebrow: 'GLOBAL DESIGN AWARD',
    cardTag: 'MUSEUM',
    image: {
      src: '/project-images/global-design-award-museum.png',
      alt: 'Global Design Award Museum 页面预览'
    },
    detailImages: [
      {
        src: '/project-detail-images/global-design-award-museum-hero.png',
        alt: 'Global Design Award Museum 首页搜索界面'
      },
      {
        src: '/project-detail-images/global-design-award-museum-results.png',
        alt: 'Global Design Award Museum 搜索结果界面'
      },
      {
        src: '/project-detail-images/global-design-award-museum-detail.png',
        alt: 'Global Design Award Museum 奖项详情界面'
      }
    ],
    highlights: [
      '跨奖项检索：统一搜索 iF / Red Dot / IDEA 等多个国际设计大奖作品。',
      '多维筛选：支持奖项、年份、品类、地区、获奖等级等条件组合筛选。',
      '作品详情：展示作品、设计方、奖项、年份，点击跳转到官方来源。',
      '持续更新：通过数据采集持续同步各大奖最新获奖作品。'
    ],
    translations: {
      en: {
        title: 'Global Design Award Museum',
        summary: 'A searchable archive space for global design awards.',
        details:
          'Major design award sites are scattered and often lack open APIs, so designers need to browse many official sites repeatedly when looking for reference work.',
        role: 'Project',
        period: 'Live',
        imageAlt: 'Global Design Award Museum page preview',
        detailImageAlts: [
          'Global Design Award Museum home search interface',
          'Global Design Award Museum search results interface',
          'Global Design Award Museum award detail interface'
        ],
        highlights: [
          'Cross-award search: unified search across iF, Red Dot, IDEA, and other international design awards.',
          'Multi-dimensional filters: combine award, year, category, region, award level, and more.',
          'Work details: show the work, designer, award, and year, with links to the official source.',
          'Continuous updates: keep award-winning works synchronized through ongoing data collection.'
        ]
      }
    }
  },
  {
    slug: 'wm-tracking-demo',
    title: '可视化埋点事件地图',
    summary: '一个用于把 WM 核心功能的埋点数据、UI 截图和用户操作路径串联起来的可视化查看与讲解工具。',
    details:
      '帮助新入职的运营、数分、投放人员快速摸清产品核心埋点和用户路径。',
    role: '项目作品',
    period: '已上线',
    url: '/projects/wm-tracking-demo/index.html',
    cardBadge: 'WM',
    cardEyebrow: 'TRACKING EVENT MAP',
    cardTag: 'VISUAL',
    image: {
      src: '/project-images/wm-tracking-demo.png',
      alt: '可视化埋点事件地图页面预览'
    },
    detailImages: [
      {
        src: '/project-detail-images/wm-tracking-demo-flow.png',
        alt: '可视化埋点事件地图核心流程图视图'
      },
      {
        src: '/project-detail-images/wm-tracking-demo-presentation.png',
        alt: '可视化埋点事件地图演示视图'
      },
      {
        src: '/project-detail-images/wm-tracking-demo-layer.png',
        alt: '可视化埋点事件地图分层视图'
      }
    ],
    highlights: [
      '自动解析 Excel/飞书表格中的埋点事件、参数和 UI 截图，生成模块化埋点数据。',
      '生成可编辑核心流程图，支持节点拖拽、缩放、连线、删除、撤销重做和本地保存。',
      '提供演示视图，聚焦单个 UI 节点并展示上下游路径，支持点击模拟跳转。',
      '支持查看埋点详情、导出高清流程图，并同步发布到固定飞书应用地址。'
    ],
    translations: {
      en: {
        title: 'Visual Tracking Event Map',
        summary: 'A visual exploration and presentation tool that connects WM core tracking events, UI screenshots, and user operation paths.',
        details:
          'Helps new operations, analytics, and UA team members quickly understand core tracking events and user paths in the product.',
        role: 'Project',
        period: 'Live',
        imageAlt: 'Visual tracking event map page preview',
        detailImageAlts: [
          'Visual tracking event map core flowchart view',
          'Visual tracking event map presentation view',
          'Visual tracking event map layered view'
        ],
        highlights: [
          'Automatically parses tracking events, parameters, and UI screenshots from Excel or Feishu sheets into modular tracking data.',
          'Generates an editable core flowchart with node dragging, zooming, connections, deletion, undo/redo, and local saving.',
          'Provides a presentation view focused on a single UI node and its upstream and downstream paths, with click-through simulation.',
          'Supports tracking detail review, high-resolution flowchart export, and publishing to a fixed Feishu app address.'
        ]
      }
    }
  },
  {
    slug: '360-screenshot',
    title: '360 Screenshot',
    summary:
      '360 Screenshot 是一款 Chrome 插件，用于在网页、云文档和无限画布场景中按自定义区域连续截图，并自动拼接导出完整 PNG。',
    details:
      '飞书画板、云表格等无限画布页面无法通过普通长截图工具完整捕获，手动截图又容易漏截、错位和重复拼接。',
    role: '项目作品',
    period: 'Chrome 插件',
    url: 'https://github.com/sensorMaru/360-screenshot-extension',
    cardBadge: '360',
    cardEyebrow: 'CHROME EXTENSION',
    cardTag: 'SCREENSHOT',
    image: {
      src: '/project-images/360-screenshot.png',
      alt: '360 Screenshot 连续截图覆盖提示界面'
    },
    detailVideo: {
      src: '/project-videos/360-screenshot.mp4',
      type: 'video/mp4',
      poster: '/project-images/360-screenshot.png'
    },
    highlights: [
      '自定义 Tile 截图：用户先框选第一块截图区域，后续通过方向键扩展覆盖范围，最终一键拼接导出。',
      '实时覆盖提示：已捕获区域显示绿色半透明覆盖层，并提供局部缩略矩阵，帮助判断当前覆盖进度和坐标位置。',
      '画布平移同步：支持触控板、鼠标拖拽、鼠标中键移动画布时同步更新红绿框位置，减少拼接错位。',
      '屏幕参数预检：启动和截图过程中检测 DPR、viewport、screen 等参数变化，避免因缩放、换屏或 Retina 显示导致最终图片错乱。'
    ],
    translations: {
      en: {
        title: '360 Screenshot',
        summary:
          '360 Screenshot is a Chrome extension for repeatedly capturing custom regions across webpages, cloud documents, and infinite canvases, then stitching them into a complete PNG.',
        details:
          'Infinite-canvas pages such as Feishu whiteboards and cloud sheets cannot be fully captured by ordinary long-screenshot tools, while manual screenshots are easy to miss, misalign, or duplicate.',
        role: 'Project',
        period: 'Chrome Extension',
        imageAlt: '360 Screenshot continuous capture coverage prompt interface',
        highlights: [
          'Custom tile capture: select the first screenshot region, expand coverage with arrow keys, and export the stitched result in one click.',
          'Real-time coverage hints: captured regions appear as green translucent overlays, with a thumbnail matrix to judge progress and coordinates.',
          'Canvas pan synchronization: keeps red and green boxes aligned while using trackpad, mouse drag, or middle-button panning.',
          'Screen parameter preflight: checks DPR, viewport, and screen changes during capture to prevent output distortion caused by zoom, display switching, or Retina screens.'
        ]
      }
    }
  }
] as const;
