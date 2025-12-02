import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeClosed, Eye } from "lucide-react";
import { Label } from "./label";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

function Input({ label, error, id, type, className, ...props }: InputProps) {
  const [show, setShow] = React.useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1 mb-5">
      {label && (
        <Label htmlFor={id} className="font-bold mb-3">
          {label}
        </Label>
      )}

      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          className={cn(
            "placeholder:text-muted-foreground border-input h-12 w-full rounded-lg border bg-neutral-950 px-4 py-2 text-sm-semibold md:text-md-semibold outline-none read-only:bg-neutral-900",
            error && "border border-[#EE1D52]",
            className
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-500"
            onClick={() => setShow(!show)}
          >
            {show ? <Eye /> : <EyeClosed />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-xs md:text-sm">{error}</p>}
    </div>
  );
}

export { Input };
