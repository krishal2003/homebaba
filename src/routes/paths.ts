// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  home:'/',
  comingSoon: '/coming-soon',
  cart: '/your-cart',
  shop: '/shop',
  featuredProduct1: '/shop/asas',
  featuredProduct2: '/shop/asdxs',
  featuredProduct3: '/shop/sadasd',
  story: '/story',
  blog: {
    root: '/blog',
    view: (title: string) => `/blog/post/${title}`,
  },
  event: {
    root: '/events',
    view: (title: string) => `/events/event/${title}`,
  },
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  tournaments: '/tournaments',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  privacy: '/privacy-policy',
  cookie: '/cookie-policy',
  terms: '/terms-and-conditions',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  testimonial: {
    list: path(ROOTS_DASHBOARD, '/testimonial/list'),
  },
  organization: {
    chart: {
      list: path(ROOTS_DASHBOARD, '/organizational-chart/list'),
    },
    freePlayer: {
      list: path(ROOTS_DASHBOARD, '/freePlayer/list'),
    },
    team: {
      list: path(ROOTS_DASHBOARD, '/organization-teams/list'),
      new: path(ROOTS_DASHBOARD, '/organization-teams/new'),
      edit: (id: string) => path(ROOTS_DASHBOARD, `/organization-teams/${id}/edit`),
    },
  },
  faq: {
    list: path(ROOTS_DASHBOARD, '/faq/list'),
    new: path(ROOTS_DASHBOARD, '/faq/new'),
  },
  ourTeam: {
    list: path(ROOTS_DASHBOARD, '/ourTeam/list'),
    new: path(ROOTS_DASHBOARD, '/ourTeam/new'),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/blog/${id}/edit`),
  },
  event: {
    root: path(ROOTS_DASHBOARD, '/events'),
    new: path(ROOTS_DASHBOARD, '/events/new'),
    events: path(ROOTS_DASHBOARD, '/events/events'),
    event_tournaments: (id: string) => path(ROOTS_DASHBOARD, `/events/${id}/tournaments`),
    event_dashboard: (id: string) => path(ROOTS_DASHBOARD, `/events/${id}/dashboard`),
    event_faq: (id: string) => path(ROOTS_DASHBOARD, `/events/${id}/dashboard/event-faqs`),
    event_sponsor: (id: string) => path(ROOTS_DASHBOARD, `/events/${id}/dashboard/event-sponsors`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/events/${id}/edit`),
  },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
