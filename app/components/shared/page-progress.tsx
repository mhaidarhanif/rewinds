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
}

export function PageProgress({
  progressValue = 25,
  className,
  ...props
}: Props) {
  function handleMarkAsComplete() {
    toast({
      title: "Completed!",
      description: "About page has been marked as complete.",
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

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(progressValue), 500);
    return () => clearTimeout(timer);
  }, []);

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
