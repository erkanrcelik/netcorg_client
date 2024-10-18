import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "@/providers/theme-provider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TanstackProvider from "@/providers/query-provider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NETCORG",
  description: "NETCORG",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TanstackProvider>{children}</TanstackProvider>
    </ThemeProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme="colored"
      pauseOnFocusLoss
      draggable
    />
    </body>
    </html>
  );
}
