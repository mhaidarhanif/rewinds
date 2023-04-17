import { cn } from "~/utils";

/**
 * Image
 *
 * Display image with default styles.
 */

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export function Image({ src, alt, className, ...props }: Props) {
  return (
    <img src={src} alt={alt} className={cn("rounded", className)} {...props} />
  );
}
