import { Input, Label, RemixForm } from "~/components";
import { Search } from "~/icons";

export function SearchForm({ action = "/search" }: { action?: string }) {
  return (
    <RemixForm method="GET" action={action} className="w-full">
      <fieldset className="relative flex items-center gap-1">
        <Label className="sr-only">Search</Label>
        <Input
          name="q"
          type="search"
          placeholder="Search..."
          autoComplete="off"
          className="block w-full ps-9 placeholder:text-surface-500 dark:placeholder:text-surface-400"
        />
        <span className="pointer-events-none absolute flex ps-3">
          <Search className="size-sm" />
        </span>
      </fieldset>
    </RemixForm>
  );
}
