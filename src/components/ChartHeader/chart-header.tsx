import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function ChartHeader() {
  return (
    <Card className="flex flex-row justify-between items-start">
      <CardHeader className="flex flex-col gap-1 p-0">
        <CardTitle>Attendance graph</CardTitle>
        <CardDescription>Based on Attendance data</CardDescription>
      </CardHeader>
      <div className="flex flex-row justify-between items-center gap-4"></div>
    </Card>
  );
}
