import type { Metadata } from "next";
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
import { AppLockGate } from "@/components/design/AppLockGate";

export const metadata: Metadata = {
  title: "Journal",
  description: "A paper-first journaling app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <ToastProvider>
          <AuthProvider>
            <ThemeProvider>
              <LanguageProvider>
              <ProgressProvider>
                <GoalProvider>
                  <GuidanceProvider>
                    <OnboardingProvider>
                      {children}
                      <OnboardingModal />
                      <AppLockGate />
                    </OnboardingProvider>
                  </GuidanceProvider>
                </GoalProvider>
              </ProgressProvider>
              </LanguageProvider>
            </ThemeProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
