import { useEffect, useState } from "react";
import { Button, Progress, ToastAction } from "~/components";
import { toast } from "~/hooks";
import { CheckCircle, Undo } from "~/icons";
import { cn } from "~/utils";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  progressValue?: number;
  isAnimated?: boolean;
}

export function PageProgress({
  progressValue = 100,
  isAnimated = false,
  className,
  ...props
}: Props) {
  function handleMarkAsComplete() {
    toast({
      variant: "success",
      title: "Completed!",
      description: "It has been marked as complete.",
      action: (
        <ToastAction
          altText="Undo mark as complete"
          className="flex items-center gap-1"
        >
          <Undo className="size-sm" />
          <span>Undo</span>
        </ToastAction>
      ),
    });
  }

  const [progress, setProgress] = useState(isAnimated ? 0 : progressValue);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progressValue), 500);
    return () => clearTimeout(timer);
  }, [progressValue]);

  return (
    <aside
      className={cn("flex w-full flex-wrap justify-between gap-4", className)}
      {...props}
    >
      <div className="w-full max-w-xs space-y-2">
        <span className="font-bold">{progress}% complete</span>
        <Progress size="sm" value={progress} />
      </div>

      <div>
        <Button variant="success" onClick={handleMarkAsComplete}>
          <CheckCircle className="size-md" />
          <span>Mark as Complete</span>
        </Button>
      </div>
    </aside>
  );
}
