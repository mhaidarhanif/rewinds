interface Props
  extends React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {
  youtubeEmbedId: string;
}

export const YouTubeVideo = ({
  youtubeEmbedId,
  title,
  className,
  ...props
}: Props) => {
  return (
    <iframe
      title={title}
      src={`https://youtube.com/embed/${youtubeEmbedId}?playlist=${youtubeEmbedId}&controls=1&modestbranding=1&rel=0&disablekb=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      allowFullScreen
      className="aspect-video w-full rounded"
      {...props}
    />
  );
};
