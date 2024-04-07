"use client";

import { signUpAuthentication } from "@/app/lib/actions";
import {
  AtSymbolIcon,
  IdentificationIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toastService from "../../toast/toast.service";
import { AuthenticationResult } from "../../types/definitions";
import Input from "../input";
import RegisterButton from "../register-button";

const labelStyles = "mb-3 mt-5 block text-xs font-medium text-gray-900";
const errorStyles = "text-red-500 text-xs mt-3";

const inputStyles =
  "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500";

const iconStyles =
  "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900";

export default function SignUpForm() {
  const [formState, formAction] = useFormState(signUpAuthentication, undefined);
  const state = formState as AuthenticationResult | undefined;
  const errors = state?.errors;
  const nameError = errors?.name;
  const emailError = errors?.email;
  const passwordError = errors?.password;
  const confirmPasswordError = errors?.password_confirmation;

  useEffect(() => {
    if (state?.status === "success") {
      toastService.success("Sign up successful! You can now log in.");
      redirect("/login");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 py-4">
        <div className="w-full">
          <div>
            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              required
              startIcon={<IdentificationIcon className={iconStyles} />}
            />
            {nameError && <span className={errorStyles}>{nameError}</span>}
          </div>

          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
              startIcon={<AtSymbolIcon className={iconStyles} />}
            />

            {emailError && <span className={errorStyles}>{emailError}</span>}
          </div>

          <div className="mt-4">
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
              minLength={8}
              startIcon={<KeyIcon className={iconStyles} />}
            />

            {passwordError && (
              <span
                className={errorStyles}
                dangerouslySetInnerHTML={{
                  __html: passwordError.join("<br />"),
                }}
              />
            )}
          </div>

          <div className="mt-4">
            <Input
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              placeholder="Re-enter Password"
              required
              minLength={8}
              startIcon={<KeyIcon className={iconStyles} />}
            />

            {confirmPasswordError && (
              <span className={errorStyles}>{confirmPasswordError}</span>
            )}
          </div>
        </div>

        <RegisterButton title="Sign up" />
      </div>
    </form>
  );
}
