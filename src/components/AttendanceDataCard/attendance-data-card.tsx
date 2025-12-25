import { CheckCircleIcon, ClipboardPasteIcon, FrownIcon } from "lucide-react";
import { DataCard, DataCardBody, DataCardFooter, DataCardHeader } from "../DataCard/data-card";
import { CardDescription, CardTitle } from "../ui/card";

export function AttendanceDataCard() {
    return (
        <>
            {/* <present> attendance data card */}
            <DataCard className="h-[220px] flex flex-col justify-between items-start p-3">
                <DataCardHeader>
                    <div className="w-14 h-14 p-2.5 rounded-xl bg-green-100 flex flex-row items-center justify-center">
                        <CheckCircleIcon className="text-green-600 size-7" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <CardTitle className="font-semibold">Present Today</CardTitle>
                        <CardDescription className="font-medium">
                            Show present teachers in today.
                        </CardDescription>
                    </div>
                </DataCardHeader>
                <DataCardBody className="h-fit p-0">
                    <h2 className="text-5xl font-medium text-black">0</h2>
                </DataCardBody>
                <DataCardFooter className="h-fit p-0">
                    <p className="text-sm font-medium text-muted-foreground">10 Teacher Remaining</p>
                </DataCardFooter>
            </DataCard>
            {/* <on leave> attendance data card */}
            <DataCard className="h-[220px] flex flex-col justify-between items-start p-3">
                <DataCardHeader>
                    <div className="w-14 h-14 p-2.5 rounded-xl bg-indigo-100 flex flex-row items-center justify-center">
                        <ClipboardPasteIcon className="text-indigo-600 size-7" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <CardTitle className="font-semibold">On Leave</CardTitle>
                        <CardDescription className="font-medium">
                            Show on leave teachers in today.
                        </CardDescription>
                    </div>
                </DataCardHeader>
                <DataCardBody className="h-fit p-0">
                    <h2 className="text-5xl font-medium text-black">0</h2>
                </DataCardBody>
                <DataCardFooter className="h-fit p-0">
                    <p className="text-sm font-medium text-muted-foreground">Approved leave</p>
                </DataCardFooter>
            </DataCard>
            {/* <absent> data card */}
            <DataCard className="h-[220px] flex flex-col justify-between items-start p-3">
                <DataCardHeader>
                    <div className="w-14 h-14 p-2.5 rounded-xl bg-red-100 flex flex-row items-center justify-center">
                        <FrownIcon className="text-red-600 size-7" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <CardTitle className="font-semibold">Absent</CardTitle>
                        <CardDescription className="font-medium">
                            Show absent teachers in today.
                        </CardDescription>
                    </div>
                </DataCardHeader>
                <DataCardBody className="h-fit p-0">
                    <h2 className="text-5xl font-medium text-black">0</h2>
                </DataCardBody>
                <DataCardFooter className="h-fit p-0">
                    <p className="text-sm font-medium text-muted-foreground">Without information</p>
                </DataCardFooter>
            </DataCard>
        </>
    )
}