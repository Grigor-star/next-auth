"use client";
import { registerSchema } from "@/schemas";
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
import { useState, useTransition, CSSProperties } from "react";
import { Checkbox } from "../ui/checkbox";
import { register } from "@/actions/register";

import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { FormError } from "../from-error";
import { FormSuccess } from "../form-success";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  let [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true);
    startTransition(async () => {
      console.log(values);
      await register(values).then((message) => {
        setSuccess(message.success);
        setError(message.error);
      });
    });
  }

  return (
    <CardWrapper
      title="Create an account."
      description="Welcome back!"
      backbuttonhref="/auth/login"
      backbuttonlabel="Already have an account?"
      social
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="name"
                    placeholder="John"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormDescription className="flex items-center gap-2 mb-4">
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
