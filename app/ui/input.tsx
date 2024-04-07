import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startIcon?: React.ReactNode;
}

export default function Input({
  name,
  className,
  startIcon,
  label,
  ...rest
}: Props) {
  return (
    <div className="w-full">
      <label
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...rest}
          id={name}
          name={name}
          required
          autoComplete="on"
          className={clsx(
            "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500",
            className
          )}
        />
        {startIcon}
      </div>
    </div>
  );
}
