import { useCallback, useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ToastContext, type ToastContextValue } from "./ToastContext";
import type { Toast, ToastType } from "./ToastTypes";

const Icon = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
} as const;

const styleByType: Record<ToastType, string> = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<string, number>>({});

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      window.clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback((t: { type: ToastType; text: string; duration?: number }) => {
    const id = genId();
    const toast: Toast = { id, ...t };
    setToasts((prev) => [toast, ...prev].slice(0, 5)); 
    const dur = t.duration ?? 6000;
    timers.current[id] = window.setTimeout(() => remove(id), dur);
  }, [remove]);

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((tid) => window.clearTimeout(tid));
      timers.current = {};
    };
  }, []);

  const value: ToastContextValue = { push, remove };

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast toast-top toast-end mt-16 z-50 fixed right-4 top-0">
        {toasts.map((t) => (
          <div key={t.id} className={`alert ${styleByType[t.type]} shadow-lg animate-fadeIn`}>
            {Icon[t.type]}
            <span>{t.text}</span>
            <button
              className="btn btn-ghost btn-xs ml-2"
              onClick={() => remove(t.id)}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
