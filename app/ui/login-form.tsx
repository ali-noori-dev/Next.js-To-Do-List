"use client";

import { loginAuthentication } from "@/app/lib/actions";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { AuthenticationResult } from "../types/definitions";
import RegisterButton from "./register-button";

const labelStyles = "mb-3 mt-5 block text-xs font-medium text-gray-900";
const errorStyles = "text-red-500 text-xs mt-3";

const inputStyles =
  "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500";

const iconStyles =
  "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900";

export default function LoginForm() {
  const [formState, formAction] = useFormState(loginAuthentication, undefined);
  const state = formState as AuthenticationResult | undefined;
  const errors = state?.errors;
  const emailError = errors?.email;
  const passwordError = errors?.password;

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 py-4">
        <div className="w-full">
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
                required
                autoComplete="on"
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
        </div>
        <RegisterButton title="Log in" />
      </div>
    </form>
  );
}
