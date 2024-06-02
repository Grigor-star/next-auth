import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };
  return (
    <div className="flex flex-col space-y-3 items-center w-full gap-x-2">
      <Button
        onClick={() => onClick("google")}
        size="lg"
        className="w-full flex gap-2"
        variant="outline"
      >
        <FcGoogle size={20} />
        Continue with Google
      </Button>
      <Button
        onClick={() => onClick("github")}
        size="lg"
        className="w-full flex gap-2"
        variant="outline"
      >
        <FaGithub size={20} />
        Continue with Github
      </Button>
    </div>
  );
};
