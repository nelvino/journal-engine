import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { GoalProvider } from "@/context/GoalContext";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { GuidanceProvider } from "@/context/GuidanceContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Journal Engine - Evidence-Based Personal Development",
  description: "A comprehensive, research-backed journaling application that combines modern scientific research with ancient wisdom traditions to create an adaptive personal development system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ToastProvider>
          <ThemeProvider>
            <LanguageProvider>
            <AuthProvider>
              <ProgressProvider>
                <GoalProvider>
                  <GuidanceProvider>
                    <OnboardingProvider>
                      {children}
                      <OnboardingModal />
                    </OnboardingProvider>
                  </GuidanceProvider>
                </GoalProvider>
              </ProgressProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}