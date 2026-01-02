import { getCookie } from "@/utils/getCookie";
import { redirect } from "next/navigation";

export default async function Home() {
  const isAccessToken = await getCookie("accessToken");

  console.log("isAccessToken", isAccessToken);
  if (isAccessToken) {
    redirect("/employee");
  }
  return <></>;
}
