import { ButtonLink } from "~/components";
import { createSitemap } from "~/utils";

export const handle = createSitemap();

export default function NoteIndexRoute() {
  return (
    <p>
      No note selected. Select a note on the left, or{" "}
      <ButtonLink size="sm" to="new">
        Create a new note.
      </ButtonLink>
    </p>
  );
}
