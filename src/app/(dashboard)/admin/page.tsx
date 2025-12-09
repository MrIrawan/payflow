import { Card } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <section className="w-full p-6">
      <div className="w-full flex flex-col gap-6">
        {/* Data card component */}
        <div className="flex flex-row justify-between items-center gap-6">
          <Card className="w-full min-h-[200px]"></Card>
          <Card className="w-full min-h-[200px]"></Card>
          <Card className="w-full min-h-[200px]"></Card>
        </div>
        {/* attendance graph */}
        <Card className="w-full min-h-[300px]"></Card>
        {/* employee table component */}
        <Card className="w-full min-h-[500px]"></Card>
      </div>
    </section>
  );
}
