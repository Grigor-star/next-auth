"use client";

import BeatLoader from "react-spinners/BeatLoader";
import { CardWrapper } from "./cardwrapper";

import { useSearchParams } from "next/navigation";

import { FormSuccess } from "../form-success";
import { FormError } from "../from-error";
import { useCallback, useEffect, useState } from "react";
import { newVerifiaction } from "@/actions/new-verification";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing the token");
      return;
    }

    newVerifiaction(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      title="Confirming your Verification"
      description="We would verify your e-mail automatically."
      backbuttonhref="/auth/login"
      backbuttonlabel="Back to Login"
    >
      <div className="flex h-full flex-col items-center justify-center">
        {!error && !success && <BeatLoader size={15} />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
