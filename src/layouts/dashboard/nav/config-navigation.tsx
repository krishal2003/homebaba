// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// components
// import Label from '../../../components/label';
// import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

export enum UserRole {
  Admin = 'Admin',
  Player = 'Player',
  BlogWriter = 'Blog Writer',
  Organizer = 'Organizer',
  Organization = 'Organization',
}

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  filter: icon('ic_filter'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  testimonial: icon('ic_testimonials'),
  faq: icon('ic_faq'),
  ourTeam: icon('ic_ourTeam'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'Filter', path: PATH_PAGE.shop, icon: ICONS.filter }],
  },


];

export default navConfig;
