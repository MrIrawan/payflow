import { getCookie } from "@/utils/getCookie";
import { redirect } from "next/navigation";

export default async function Home() {
  const refreshToken = await getCookie("refreshToken");

  if (refreshToken) {
    redirect("/employee");
  }
  return <></>;
}
