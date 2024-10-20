import { GeistSans } from "geist/font/sans";
import NavBar from "@/components/NavBar";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "nextjs template",
  description: "nextjs&supabaseのtemplate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={GeistSans.className}>
      <body className="bg-background text-foreground">
      <NavBar/>
      <div className="flex justify-center w-screen h-screen">
        {children}
      </div>
      </body>
    </html>
  );
}


/*
        <main className="min-h-screen flex flex-col items-center">
        <NavBar/>
          {children}
        </main>

      main className="justify-center items-center w-screen h-screen">
        <div className="w-11/12 h-1/6 md:w-9/12">
        {children}
        </div>
      </main>
*/