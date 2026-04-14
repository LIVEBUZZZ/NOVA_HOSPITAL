"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3500);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 rounded-xl border px-4 py-3 text-sm shadow-glow ${
        type === "success"
          ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-50"
          : "border-rose-400/40 bg-rose-400/15 text-rose-50"
      }`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
