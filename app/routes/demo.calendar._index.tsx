import { useState } from "react";
import { Calendar, Layout } from "~/components";
import { createMetaData } from "~/utils";

export const meta = createMetaData({
  title: "Demo: Calendar",
  description: "Calendar component demo.",
});

export default function Route() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </Layout>
  );
}
