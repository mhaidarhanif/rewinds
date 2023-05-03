import { Alert } from "~/components";
import { createSitemap } from "~/utils";

export const handle = createSitemap();

export default function Route() {
  return (
    <div className="stack">
      <Alert variant="warning">Under development</Alert>

      <header>
        <span>Add New User Role</span>
      </header>
    </div>
  );
}
