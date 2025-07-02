import { createContext } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (props: ToastProps) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
