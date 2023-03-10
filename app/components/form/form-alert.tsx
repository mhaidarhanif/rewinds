export function FormAlert() {
  return (
    <div
      role="alert"
      className="rounded border-l-4 border-red-500 bg-red-50 p-4"
    >
      <div className="flex items-center gap-2 text-red-800">
        <strong className="block font-medium">Something went wrong</strong>
      </div>

      <p className="mt-2 text-sm text-red-700">
        Lorem ipsum dolor sit amet consectetur.
      </p>
    </div>
  );
}
