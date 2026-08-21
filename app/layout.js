import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "CareerPilot AI - Your Career Companion",
  description: "AI-powered career guidance and job preparation platform",
  icons: {
    // Use local folder icons (no external Cloudinary) and bust cache with v=3
    icon: [
      { url: '/favicon-32x32.png?v=3', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png?v=3', type: 'image/png', sizes: '16x16' },
      { url: '/android-chrome-192x192.png?v=3', type: 'image/png', sizes: '192x192' }
    ],
    // Shortcut icon for broader browser support
    shortcut: ['/favicon-32x32.png?v=3'],
    // Apple touch icon (PWA/IOS)
    apple: '/apple-touch-icon.png?v=3',
  },
  openGraph: {
    title: 'CareerPilot AI - Your Career Companion',
    description: 'AI-powered career guidance and job preparation platform',
    images: [
      {
        url: '/android-chrome-512x512.png?v=3',
        width: 512,
        height: 512,
        alt: 'CareerPilot AI',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'CareerPilot AI - Your Career Companion',
    description: 'AI-powered career guidance and job preparation platform',
    images: ['/android-chrome-512x512.png?v=3'],
  },
};

import { ClerkProvider } from "@clerk/nextjs";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isValidKey = clerkKey && (clerkKey.startsWith("pk_test_") || clerkKey.startsWith("pk_live_"));
const publishableKey = isValidKey ? clerkKey : "pk_test_aG9seS1waXBlZmlzaC0yMC5jbGVyay5hY2NvdW50cy5kZXYk";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en" suppressHydrationWarning>
        <head>
        </head>
        <body>
          <Providers>
              <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="flex-grow">{children}</main>
                <Footer />
                <ChatBot />
              </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
