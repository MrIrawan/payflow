import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
} from "../ui/sidebar";
import PayflowLogo from "../../../public/payflow-logo.svg"

export default function AppDashboard() {
  return (
    <Sidebar className="p-3 w-[18%]">
      <SidebarHeader className="p-0 h-14">
        <div className="w-full h-full bg-white flex items-center justify-start gap-3 overflow-hidden">
          <div className="w-10 h-full">
              <Image 
              src={PayflowLogo}
              alt="payflow-logo"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full flex flex-col gap-0">
            <h3 className="text-lg font-bold text-black">Payflow</h3>
            <p className="text-sm font-medium text-gray-400">Manage your account</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarGroup className="h-full">
        <SidebarContent></SidebarContent>
      </SidebarGroup>
      <SidebarFooter className="p-0">
        <div className="w-full h-14 flex items-center gap-2 justify-start bg-white ring ring-gray-200 rounded-lg p-1.5">
          <div className="w-12 h-full bg-red-600 rounded-lg"></div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base font-bold">robiatul adawiah</h3>
            <p className="text-sm font-medium text-gray-500">robiatuladawiah@gmail.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
