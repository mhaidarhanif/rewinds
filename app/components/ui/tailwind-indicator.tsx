// https://github.com/shadcn/taxonomy/blob/main/components/tailwind-indicator.tsx

export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex select-none items-center justify-center rounded bg-brand-800 p-1 font-mono text-xs text-white">
      <p>dev:</p>
      <p className="block sm:hidden">xs</p>
      <p className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        sm
      </p>
      <p className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</p>
      <p className="hidden lg:block xl:hidden 2xl:hidden">lg</p>
      <p className="hidden xl:block 2xl:hidden">xl</p>
      <p className="hidden 2xl:block">2xl</p>
    </div>
  );
}
