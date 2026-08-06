import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Snekko — оборудование для цехов полуфабрикатов";
const description =
  "Подбор, поставка и запуск оборудования для малых пищевых производств: под продукт, помещение и объём выпуска.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host")?.split(",")[0].trim() ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim() ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title,
    description,
    icons: {
      icon: "/snekko-logo.png",
      shortcut: "/snekko-logo.png",
    },
    openGraph: {
      type: "website",
      url: origin,
      title,
      description,
      siteName: "Snekko",
      locale: "ru_RU",
      images: [{ url: socialImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
