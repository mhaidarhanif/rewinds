import {
  Circle,
  Database,
  Home,
  InfoEmpty,
  LayoutLeft,
  Svg3DSelectFace,
} from "~/icons";

/**
 * Icon Component
 *
 * Mapping with name string
 * Only used when need to determine icon based on the item name from data
 */

export const iconMaps = {
  home: <Home />,
  about: <InfoEmpty />,
  database: <Database />,
  default: <Circle />,
  demo: <LayoutLeft />,
  examples: <Svg3DSelectFace />,
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
