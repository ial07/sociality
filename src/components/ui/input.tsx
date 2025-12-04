"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  EyeClosed,
  Eye,
  CloudUpload,
  Image as ImageIcon,
  X,
  Upload, // Import ikon Upload baru untuk tombol ganti
  Trash2, // Import ikon Trash baru untuk tombol hapus
} from "lucide-react";
import { Label } from "./label";
import Image from "next/image";
import { Button } from "./button"; // Asumsi Anda memiliki Button ShadCN yang bisa diimport

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

function Input({ label, error, id, type, className, ...props }: InputProps) {
  const [show, setShow] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);

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
    e.stopPropagation();
    setPreview(null);
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) input.value = "";
    // Jika ada onChange dari RHF, panggil dengan null/undefined untuk mereset state file
    if (props.onChange) {
      props.onChange({ target: { files: null } } as any);
    }
  };

  // Trigger klik input file hidden saat tombol 'Change Image' diklik
  const handleTriggerFileInput = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Penting! Jangan buka dialog file di luar tombol
    document.getElementById(inputId)?.click();
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
          <input
            id={inputId}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            {...props}
          />

          <label
            htmlFor={inputId}
            className={cn(
              // Style saat KOSONG
              !preview &&
                "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors bg-neutral-950 border-neutral-800 hover:bg-neutral-900",
              // Style saat ADA PREVIEW (Menjadi container untuk gambar dan tombol)
              preview &&
                "border-solid border-neutral-800 p-0 overflow-hidden relative block",
              error && "border-[#EE1D52] bg-[#EE1D52]/10",
              className
            )}
          >
            {preview ? (
              // Tampilan saat ada file/gambar terpilih
              // Struktur: Gambar di atas (aspect-ratio), Tombol di bawah
              <div className="flex flex-col w-full">
                {/* GAMBAR PREVIEW */}
                <div className="relative w-full aspect-square">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* BUTTONS / FOOTER */}
                <div
                  className="flex justify-center gap-3 p-4 bg-neutral-950 border-t border-neutral-800"
                  // Mencegah klik di area tombol membuka dialog file lagi
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full px-4 text-xs"
                    // Trigger klik pada input file hidden
                    onClick={handleTriggerFileInput}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Change Image
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-full px-4 text-xs"
                    onClick={handleRemoveFile}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Image
                  </Button>
                </div>
              </div>
            ) : (
              // Tampilan Kosong (Upload Placeholder) - (Kode Anda tetap)
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
                  PNG or JPG (max. 5mb)
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
