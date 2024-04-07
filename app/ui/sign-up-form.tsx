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
import toastService from "../toast/toast.service";
import { AuthenticationResult } from "../types/definitions";
import RegisterButton from "./register-button";

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
            <label className={labelStyles} htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <input
                className={inputStyles}
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
                autoComplete="on"
              />
              <IdentificationIcon className={iconStyles} />
            </div>
            {nameError && <span className={errorStyles}>{nameError}</span>}
          </div>

          <div>
            <label className={labelStyles} htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className={inputStyles}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="on"
                required
              />
              <AtSymbolIcon className={iconStyles} />
            </div>
            {emailError && <span className={errorStyles}>{emailError}</span>}
          </div>

          <div className="mt-4">
            <label className={labelStyles} htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className={inputStyles}
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={8}
                autoComplete="on"
              />
              <KeyIcon className={iconStyles} />
            </div>
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
            <label className={labelStyles} htmlFor="password_confirmation">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={inputStyles}
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                placeholder="Re-enter Password"
                required
                minLength={8}
                autoComplete="on"
              />
              <KeyIcon className={iconStyles} />
            </div>
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
