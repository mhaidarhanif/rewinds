import {
  Circle,
  Database,
  Home,
  InfoEmpty,
  LayoutLeft,
  Components,
  Notes,
  Cloud,
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
  notes: <Notes />,
  site: <Cloud />,
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
