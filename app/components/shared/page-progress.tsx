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

  return (
    <aside
      className={cn(
        "mx-auto flex w-full max-w-prose flex-wrap justify-between gap-4",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-xs space-y-2">
        <span className="font-bold">{progressValue}% complete</span>
        <Progress size="sm" value={progressValue} />
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
