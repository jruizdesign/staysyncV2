import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StaySync",
  description: "A modern hotel booking application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <header
          style={{
            backgroundColor: "#003366",
            color: "white",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "2rem" }}>StaySync</h1>
          <nav>
            <a href="/" style={{ color: "white", margin: "0 1rem" }}>
              Home
            </a>
            <a href="/rooms" style={{ color: "white", margin: "0 1rem" }}>
              Rooms
            </a>
            <a href="/login" style={{ color: "white", margin: "0 1rem" }}>
              Login
            </a>
          </nav>
        </header>
        <main style={{ padding: "2rem" }}>{children}</main>
        <footer
          style={{
            backgroundColor: "#003366",
            color: "white",
            padding: "1rem",
            textAlign: "center",
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <p>&copy; 2024 StaySync. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}