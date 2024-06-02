import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full h-full justify-center items-center ">
      <Link href="/auth/register">
        {" "}
        <Button>Log In</Button>
      </Link>
    </main>
  );
}
