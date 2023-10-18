// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useThemeState } from "@/app/lib/store";
import { Gabarito } from "next/font/google";
import { useEffect, useState } from "react";
const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-gabarito",
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [hydrate, setHydrate] = useState(false);
  const theme = useThemeState();
  useEffect(() => {
    setHydrate(true);
  }, []);

  return (
    <>
      {hydrate && (
        <NextUIProvider
          className={`${theme.mode} ${gabarito.variable} font-gabarito text-foreground text-sm sm:text-base`}
        >
          {children}
        </NextUIProvider>
      )}
    </>
  );
}
