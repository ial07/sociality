"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  EyeClosed,
  Eye,
  CloudUpload,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Label } from "./label";
import Image from "next/image";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

function Input({ label, error, id, type, className, ...props }: InputProps) {
  const [show, setShow] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);

  // PERBAIKAN: Gunakan useId untuk generate ID unik jika props 'id' kosong
  const generatedId = React.useId();
  const inputId = id || generatedId;

  const isPassword = type === "password";
  const isFile = type === "file";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Mencegah klik tembus ke label (agar tidak membuka dialog file lagi)
    setPreview(null);
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) input.value = "";
  };

  // --- LOGIKA TIPE FILE ---
  if (isFile) {
    return (
      <div className="space-y-1 mb-5">
        {label && (
          <Label htmlFor={inputId} className="font-bold mb-3 block">
            {label}
          </Label>
        )}
        <div className="relative w-full">
          {/* Input Hidden dengan ID yang pasti ada */}
          <input
            id={inputId}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            {...props}
          />

          {/* Label terhubung ke ID input */}
          <label
            htmlFor={inputId}
            className={cn(
              "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors bg-neutral-950 border-neutral-800 hover:bg-neutral-900",
              error && "border-[#EE1D52] bg-[#EE1D52]/10",
              preview &&
                "border-solid border-neutral-800 p-0 overflow-hidden relative",
              className
            )}
          >
            {preview ? (
              <div className="relative w-full h-full group">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm font-semibold">
                    Change Image
                  </p>
                </div>
                {/* Tombol Hapus dengan stopPropagation */}
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 bg-neutral-900/80 p-1.5 rounded-full text-white hover:bg-red-500 transition-colors z-10"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-neutral-400">
                <div className="bg-neutral-900 p-3 rounded-full mb-3">
                  <CloudUpload className="w-6 h-6 text-neutral-400" />
                </div>
                <p className="mb-1 text-sm text-neutral-400">
                  <span className="font-semibold text-white">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-neutral-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
          </label>
        </div>
        {error && <p className="text-red-500 text-xs md:text-sm">{error}</p>}
      </div>
    );
  }

  // --- LOGIKA INPUT BIASA ---
  return (
    <div className="space-y-1 mb-5">
      {label && (
        <Label htmlFor={inputId} className="font-bold mb-3">
          {label}
        </Label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={isPassword && show ? "text" : type}
          className={cn(
            "placeholder:text-muted-foreground border-input h-12 w-full rounded-lg border bg-neutral-950 px-4 py-2 text-sm-semibold md:text-md-semibold outline-none read-only:bg-neutral-900",
            error && "border-[#EE1D52]",
            className
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-white transition-colors"
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
