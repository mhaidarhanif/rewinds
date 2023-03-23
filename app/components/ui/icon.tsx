import {
  Circle,
  Cloud,
  Components,
  Database,
  Group,
  Home,
  InfoEmpty,
  LayoutLeft,
  MultiplePages,
  PageEdit,
  PageSearch,
  PageStar,
  UserCrown,
} from "~/icons";

/**
 * Icon Component
 *
 * Mapping with name string
 * Only used when need to determine icon based on the item name from data
 */

export const iconMaps = {
  about: <InfoEmpty />,
  components: <Components />,
  database: <Database />,
  default: <Circle />,
  demo: <LayoutLeft />,
  home: <Home />,
  noteCategory: <PageSearch />,
  notes: <MultiplePages />,
  noteStatus: <PageStar />,
  noteTag: <PageEdit />,
  site: <Cloud />,
  userRole: <UserCrown />,
  users: <Group />,
};

export function lookupIcon(lookupObject: any, defaultCase = "default") {
  return (expression: string | number) => {
    return lookupObject[expression] || lookupObject[defaultCase];
  };
}

export const iconSwitch = lookupIcon(iconMaps, "default");

export function Icon({ name = "default" }: { name?: string }) {
  return iconSwitch(name);
}
