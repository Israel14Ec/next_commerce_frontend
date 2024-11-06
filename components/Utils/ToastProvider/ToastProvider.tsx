"use client"

import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

type ToastProviderProps = {
    children: ReactNode
}

export function ToastProvider({children} : ToastProviderProps) {
  return (
    <>
        {children}
        <ToastContainer/>
    </>
  )
}
