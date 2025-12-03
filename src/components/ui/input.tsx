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
  const isPassword = type === "password";
  const isFile = type === "file";

  // Handle perubahan file untuk preview gambar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
    // Panggil onChange asli jika ada props yang dikirim
    if (props.onChange) {
      props.onChange(e);
    }
  };

  // Handle remove file
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setPreview(null);
    // Reset input value (perlu trik sedikit karena input hidden)
    const input = document.getElementById(id as string) as HTMLInputElement;
    if (input) input.value = "";
  };

  // --- LOGIKA KHUSUS TIPE FILE ---
  if (isFile) {
    return (
      <div className="space-y-1 mb-5">
        {label && (
          <Label htmlFor={id} className="font-bold mb-3 block">
            {label}
          </Label>
        )}
        <div className="relative w-full">
          {/* Input asli disembunyikan */}
          <input
            id={id}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*" // Opsional: batasi hanya gambar
            {...props}
          />

          {/* Label yang bertindak sebagai trigger klik */}
          <label
            htmlFor={id}
            className={cn(
              "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors bg-neutral-950 border-neutral-800 hover:bg-neutral-900",
              error && "border-[#EE1D52] bg-[#EE1D52]/10",
              preview &&
                "border-solid border-neutral-800 p-0 overflow-hidden relative", // Style saat ada preview
              className
            )}
          >
            {preview ? (
              // Tampilan saat ada file/gambar terpilih
              <div className="relative w-full h-full group">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                {/* Overlay hover untuk ganti/hapus */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm font-semibold">
                    Change Image
                  </p>
                </div>
                {/* Tombol Hapus */}
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 bg-neutral-900/80 p-1.5 rounded-full text-white hover:bg-red-500 transition-colors z-10"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              // Tampilan Kosong (Upload Placeholder)
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-neutral-400 border w-full py-4 rounded-xl">
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

  // --- LOGIKA INPUT BIASA (TEXT/PASSWORD) ---
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
