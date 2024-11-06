import type { Metadata } from "next";
import { AuthProvider } from "@/src/context";
import {ToastProvider} from "@/components/Utils/ToastProvider";
import 'semantic-ui-css/semantic.min.css'
import '@/scss/global.scss'

export const metadata: Metadata = {
  title: "Aplicación e-commerce",
  description: "NextApp aplication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
            <ToastProvider>
              { children }
            </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}