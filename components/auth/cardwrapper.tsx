import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Social } from "./social";

interface CardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  backbuttonlabel: string;
  backbuttonhref: string;
  social?: boolean;
}

export const CardWrapper = ({
  title,
  description,
  children,
  backbuttonhref,
  backbuttonlabel,
  social,
}: CardWrapperProps) => {
  return (
    <Card className="w-[550px] flex flex-col items-center px-[40px]">
      <CardHeader className="flex flex-col  items-center">
        <CardTitle className="text-[28px]">🔐 Auth</CardTitle>
        <CardTitle className="text-[30px] text-center">{title}</CardTitle>
        <CardDescription className="text-[16px]">{description}</CardDescription>
      </CardHeader>
      <CardContent className="w-[90%]">{children}</CardContent>
      {social && (
        <CardFooter className="w-full">
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <Link href={backbuttonhref}>
          <Button variant="link">{backbuttonlabel}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
