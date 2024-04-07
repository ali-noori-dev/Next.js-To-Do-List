"use client";

import { loginAuthentication } from "@/app/lib/actions";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import Input from "../input";
import RegisterButton from "../register-button";

const iconStyles =
  "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900";

export default function LoginForm() {
  const [formState, formAction] = useFormState(loginAuthentication, undefined);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 py-4">
        <div className="w-full">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            startIcon={<AtSymbolIcon className={iconStyles} />}
          />

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
          </div>
          {formState?.status === "error" && (
            <div className="text-red-500 text-xs mt-4">
              Invalid username or password.
            </div>
          )}
        </div>
        <RegisterButton title="Log in" />
      </div>
    </form>
  );
}
