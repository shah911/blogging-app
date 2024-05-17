import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Query from "@/utils/Query";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Shah.",
  description: "A next blogging web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Query>
          <Header />
          {children}
          <Section />
          <Footer />
        </Query>
      </body>
    </html>
  );
}
