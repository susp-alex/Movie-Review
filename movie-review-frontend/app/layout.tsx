import type { Metadata } from "next";
import { AuthProvider } from '@/context/AuthContext';
import MovieBanner from './components/v1/MovieBanner';
import { MovieProvider } from "@/context/MovieContext";

export const metadata: Metadata = {
  title: "Movie Review",
  description: "A movie review system to learn and practice frontend development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MovieProvider initialReviews={[]}>
            <MovieBanner />
            {children}
          </MovieProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
