"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logOutAdmin } from "@/lib/services/admin/auth/logOutAdmin";

import Link from "next/link";
import Image from "next/image";
import LogoWithTitle from "../../../public/images/payflow_logo_with_title.svg";

import { toast } from "sonner";
import { Toaster } from "../Toaster/toaster";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarFooter,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import { SidebarNavigationLink } from "../SidebarNavigationLink/sidebar-navigation-link";
import { CollabsipleSidebarNavigation } from "../CollapsibleSidebarNavigation/collapsible-sidebar-navigation";
import { CalendarCheck2, House, LogOut, ReceiptText, UserCircleIcon, Users, Wallet, WalletIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Spinner } from "../ui/spinner";

export function AdminSidebar() {
  return (
    <Sidebar className="px-2.5">
      <SidebarHeader className="p-4">
        <Image src={LogoWithTitle} alt="payflow-logo" width={200} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="h-full">
          {/* Sidebar items go here */}
          <SidebarMenu className="gap-4">
            <SidebarNavigationLink
              href="/admin"
              label="dashboard"
              Icon={House}
              activeBg
            />
            <CollabsipleSidebarNavigation
              label="data guru"
              Icon={Users}
              sub={[
                {
                  label: "lihat data guru",
                  href: "/admin/employee/employee-list"
                },
                {
                  label: "tambah data guru",
                  href: "/admin/employee/add-employee"
                },
              ]}
            />
            <SidebarNavigationLink
              href="/admin/payroll"
              label="penggajian"
              Icon={Wallet}
              activeBg
            />
            <SidebarNavigationLink
              href="/admin/attendance"
              label="absensi"
              Icon={CalendarCheck2}
              activeBg
            />
            <SidebarNavigationLink
              href="/admin/report"
              label="laporan"
              Icon={Wallet}
              activeBg
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex flex-row items-center gap-2 w-full h-fit">
                  <Avatar className="w-10 h-10 rounded-md">
                    <AvatarFallback className={`rounded-md text-white font-medium bg-blue-600`}>Ad</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-black">Admin PayFlow</p>
                    <p className="text-xs font-medium text-muted-foreground">admin_payflow</p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" className="min-w-[250px] flex flex-col justify-between h-fit">
                <div className="w-full flex flex-row items-center gap-2 p-2">
                  <Avatar className="w-10 h-10 rounded-md">
                    <AvatarFallback className={`rounded-md text-white font-medium bg-blue-600`}>Ad</AvatarFallback>
                  </Avatar>
                  <div className="w-full flex flex-col">
                    <p className="text-sm font-medium text-black">Admin PayFlow</p>
                    <p className="text-xs font-medium text-muted-foreground">admin_payflow</p>
                  </div>
                </div>
                <Separator />
                <div className="w-full flex flex-col gap-0">
                  <Link href={"/admin/employee/employee-list"}>
                    <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                      <UserCircleIcon />
                      <p className="text-sm font-medium">Data Guru</p>
                    </Button>
                  </Link>
                  <Link href={"/admin/attendance"}>
                    <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                      <CalendarCheck2 />
                      <p className="text-sm font-medium">Data Absensi</p>
                    </Button>
                  </Link>
                  <Link href={"/admin/payroll"}>
                    <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                      <WalletIcon />
                      <p className="text-sm font-medium">Penggajian</p>
                    </Button>
                  </Link>
                  <Link href={"/admin/report"}>
                    <Button variant={"ghost"} className="w-full flex flex-row gap-1 items-center justify-start has-[>svg]:p-2">
                      <ReceiptText />
                      <p className="text-sm font-medium">Cetak Laporan</p>
                    </Button>
                  </Link>
                </div>
                <Separator />
                <div className="w-full p-2">
                  <LogOutAlertDialog />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function LogOutAlertDialog() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const employeeLogOut = async () => {
    setIsLoading(true);

    try {
      const response = await logOutAdmin();

      if (response.data.success === false) {
        toast.custom(() => <Toaster variant="error" title="gagal melakukan logout" description={`${response.data.message || "kami gagal dalam memproses logout pada akun admin."}`} />);
        return;
      }

      toast.custom(() => <Toaster variant="success" title="anda berhasil keluar dari akun" description="silahkan masuk kembali ke akun admin." />);
      router.push("/admin/signIn");
    } catch (error) {
      toast.custom(() => <Toaster variant="error" title="kami tidak bisa memproses" description={`${error || "terjadi suatu error sehingga kami tidak bisa memproses."}`} />)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* alert trigger */}
        <Button className="w-full flex flex-row items-center bg-destructive hover:bg-red-700">
          <LogOut />
          <p className="text-sm">Keluar dari akun admin</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <LogOut />
          </AlertDialogMedia>
          <AlertDialogTitle>Keluar dari akun admin?</AlertDialogTitle>
          <AlertDialogDescription className="font-medium">
            apakah anda yakin ingin keluar dari akun admin? ini akan membuat anda masuk ulang kedalam akun admin.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" className="w-full">
            <p className="text-sm font-medium">Cancel</p>
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" className="w-full" onClick={employeeLogOut}>
            {isLoading ? (<Spinner className="size-3.5 text-white" />) : (<p className="text-sm font-medium">Logout</p>)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
