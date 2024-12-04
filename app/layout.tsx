import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";

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
  title: "Nooro Todo app",
  description: "Nooro Todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800`}
      >
        <div className="text-center relative mb-7 py-10 bg-black">
          <h1 className="text-3xl font-semibold text-white mx-auto">
            Todo App
          </h1>
        </div>
        <div className="container mx-auto px-2 max-w-4xl">{children}</div>
      </body>
    </html>
  );
}
