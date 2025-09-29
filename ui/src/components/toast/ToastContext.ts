import { createContext, useContext } from "react";
import type { ToastType } from "./ToastTypes";

export type ToastContextValue = {
  push: (t: { type: ToastType; text: string; duration?: number }) => void;
  remove: (id: string) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider />");
  return ctx;
}
