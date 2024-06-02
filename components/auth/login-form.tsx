"use client";
import { loginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CardWrapper } from "./cardwrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { Checkbox } from "../ui/checkbox";
import { login } from "@/actions/login";
import { FormError } from "../from-error";
import { FormSuccess } from "../form-success";
import BeatLoader from "react-spinners/BeatLoader";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      login(values).then((message) => {
        setSuccess(message?.success);
        setError(message?.error);
      });
    });
  }

  return (
    <CardWrapper
      title="Login into to your account."
      description="Welcome back!"
      backbuttonhref="/auth/register"
      backbuttonlabel="Don't have an account yet?"
      social
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="flex items-center gap-2">
                  <Checkbox
                    checked={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                    id="showpassword"
                  />
                  <label htmlFor="showpassword">Show passoword</label>
                </FormDescription>
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} className="w-full mt-3" type="submit">
            {isPending ? <BeatLoader size={10} color="#ffffff" /> : "Continue"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
