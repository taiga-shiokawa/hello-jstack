import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: "Hello JStack",
  description: "Next.js blog application",
  icons: {
    icon: [
      {
        url: "/justa-kun.ico",
        sizes: "any",
      },
      {
        url: "/justa-kun.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${inter.className} ${ibmPlexMono.variable}`}>
      <body className="font-mono">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <div className="flex min-h-screen w-full flex-col">
          <Header />

          <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
            {children}
          </main>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
