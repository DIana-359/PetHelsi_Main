"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SistemProvider } from "@/contextSistem/contextSistem";
import { BookingProvider } from "@/contextBooking/contextBooking";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
        <SistemProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </SistemProvider>
    </QueryClientProvider>
  );
}
