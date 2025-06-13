import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import Navbar from "@/features/shared/components/Navbar";
import { Toaster } from "@/features/shared/components/ui/Toaster";
import { ThemeProvider } from "@/features/shared/context/ThemeProvider";
import { trpcQueryUtils } from "@/router";

export type RouterAppContext = { trpcQueryUtils: typeof trpcQueryUtils };

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Toaster />
      <div className="flex justify-center gap-8 pb-8">
        <Navbar />
        <div className="min-h-screen w-full max-w-2xl">
          <header className="mb-4 border-b border-neutral-200 p-4 dark:border-neutral-800">
            <h1 className="text-center text-xl font-bold">
              Advanced Patterns React
            </h1>
            <p className="text-center text-sm text-neutral-500">
              <b>
                <span className="dark:text-primary-500">Cosden</span> Solutions
              </b>
            </p>
          </header>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
