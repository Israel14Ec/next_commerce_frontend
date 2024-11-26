import type { Metadata } from "next";
import { AuthProvider, CartProvider } from "@/src/context";
import {ToastProvider} from "@/components/Utils/ToastProvider";
import 'semantic-ui-css/semantic.min.css'
import '@/scss/global.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
          <CartProvider>
            <ToastProvider>
              { children }
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
