import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: {
    default: "RusGo — Rus tilini oson o‘rgan!",
    template: "%s | RusGo",
  },
  description:
    "Har kuni 10 daqiqa. Yangi so‘zlar, interaktiv darslar va haqiqiy natijalar. O‘zbek tilida tushuntirishlar bilan rus tilini o‘rganing.",
  keywords: ["rus tili", "rus tilini o'rganish", "o'zbek tilida", "RusGo", "darslar"],
  openGraph: {
    title: "RusGo — Rus tilini oson o‘rgan!",
    description:
      "Har kuni 10 daqiqa. Yangi so‘zlar, interaktiv darslar va haqiqiy natijalar.",
    type: "website",
    locale: "uz_UZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
