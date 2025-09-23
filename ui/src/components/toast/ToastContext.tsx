import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { Toast, ToastType } from "./ToastTypes";

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

export function ToastProviderRoot({ children, value }: { children: ReactNode; value: ToastContextValue }) {
  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}
