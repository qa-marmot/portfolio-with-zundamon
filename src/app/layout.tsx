import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ずんだもんポートフォリオ",
  description:
    "Live2Dずんだもんと一緒に見るWebエンジニアのポートフォリオサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <Script
          src="/lib/live2dcubismcore.min.js"
          type="text/javascript"
          async={false}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
