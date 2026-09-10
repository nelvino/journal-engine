import type { Metadata, Viewport } from "next";
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
import { UpdatePrompt } from "@/components/design/UpdatePrompt";

export const metadata: Metadata = {
  title: "Journal",
  description: "A paper-first journaling app.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F1E8",
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
                      <UpdatePrompt />
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
