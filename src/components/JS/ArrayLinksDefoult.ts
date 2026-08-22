export interface NavLink {
  labelKey: string;
  link_name: string;
}

const links: NavLink[] = [
  {
    labelKey: "nav.home",
    link_name: "home",
  },
  {
    labelKey: "nav.work",
    link_name: "work",
  },
  {
    labelKey: "nav.tools",
    link_name: "tools",
  },
  {
    labelKey: "nav.projects",
    link_name: "projects",
  },
  {
    labelKey: "nav.contact",
    link_name: "contact",
  },
  {
    labelKey: "nav.signin",
    link_name: "signin",
  },
];

export default links;
