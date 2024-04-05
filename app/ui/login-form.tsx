"use client";

import { signUpAuthentication } from "@/app/lib/actions";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import RegisterButton from "./register-button";

const labelStyles = "mb-3 mt-5 block text-xs font-medium text-gray-900";
const inputStyles =
  "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500";
const iconStyles =
  "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(
    signUpAuthentication,
    undefined
  );

  return (
    <form action={dispatch} className="space-y-3">
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
          </div>
        </div>
        <RegisterButton title="Log in" />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
