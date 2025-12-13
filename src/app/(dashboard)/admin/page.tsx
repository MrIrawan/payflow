import {
  DataCard,
  DataCardBody,
  DataCardFooter,
  DataCardHeader,
} from "@/components/DataCard/data-card";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, MarsIcon, Users2Icon, VenusIcon } from "lucide-react";

export default function AdminPage() {
  return (
    <section className="w-full p-6">
      <div className="w-full flex flex-col gap-6">
        {/* Data card component */}
        <div className="flex flex-row justify-between items-center gap-6">
          <DataCard className="w-full h-[250px] flex flex-col gap-0 items-start">
            <DataCardHeader className="flex flex-row items-center gap-3 justify-start">
              <div className="w-16 h-16 p-2.5 rounded-xl bg-blue-100 flex flex-row items-center justify-center">
                <MarsIcon className="text-blue-600 size-9" />
              </div>
              <div className="flex flex-col gap-1 items-start">
                <CardTitle>Guru laki-laki</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur.
                </CardDescription>
              </div>
            </DataCardHeader>
            <DataCardBody className="p-0 h-full flex flex-col justify-center">
              <h2 className="text-5xl font-medium text-black">20</h2>
            </DataCardBody>
            <DataCardFooter className="p-0 h-fit">
              <Button className="w-fit h-fit px-6 py-1.5 flex flex-row items-center justify-center gap-1 rounded-full bg-blue-600">
                <p className="text-sm font-medium text-white">
                  lihat selengkapnya
                </p>
                <ArrowRightIcon className="text-white" />
              </Button>
            </DataCardFooter>
          </DataCard>
          <DataCard className="w-full h-[250px] flex flex-col gap-0 items-start">
            <DataCardHeader className="flex flex-row items-center gap-3 justify-start">
              <div className="w-16 h-16 p-2.5 rounded-xl bg-pink-100 flex flex-row items-center justify-center">
                <VenusIcon className="text-pink-600 size-9" />
              </div>
              <div className="flex flex-col gap-0 items-start">
                <CardTitle>Guru laki-laki</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur.
                </CardDescription>
              </div>
            </DataCardHeader>
            <DataCardBody className="p-0 h-full flex flex-col justify-center">
              <h2 className="text-5xl font-medium text-black">20</h2>
            </DataCardBody>
            <DataCardFooter className="p-0 h-fit">
              <Button className="w-fit h-fit px-6 py-1.5 flex flex-row items-center justify-center gap-1 rounded-full bg-pink-600">
                <p className="text-sm font-medium text-white">
                  lihat selengkapnya
                </p>
                <ArrowRightIcon className="text-white" />
              </Button>
            </DataCardFooter>
          </DataCard>
          <DataCard className="w-full h-[250px] flex flex-col gap-0 items-start">
            <DataCardHeader className="flex flex-row items-center gap-3 justify-start">
              <div className="w-16 h-16 p-2.5 rounded-xl bg-yellow-100 flex flex-row items-center justify-center">
                <Users2Icon className="text-yellow-600 size-9" />
              </div>
              <div className="flex flex-col gap-0 items-start">
                <CardTitle>Guru laki-laki</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur.
                </CardDescription>
              </div>
            </DataCardHeader>
            <DataCardBody className="p-0 h-full flex flex-col justify-center">
              <h2 className="text-5xl font-medium text-black">20</h2>
            </DataCardBody>
            <DataCardFooter className="p-0 h-fit">
              <Button className="w-fit h-fit px-6 py-1.5 flex flex-row items-center justify-center gap-1 rounded-full bg-yellow-600">
                <p className="text-sm font-medium text-white">
                  lihat selengkapnya
                </p>
                <ArrowRightIcon className="text-white" />
              </Button>
            </DataCardFooter>
          </DataCard>
        </div>
        {/* attendance graph */}
        <Card className="w-full min-h-[300px]"></Card>
        {/* employee table component */}
        <Card className="w-full min-h-[500px]"></Card>
      </div>
    </section>
  );
}
