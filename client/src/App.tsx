import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { flatMap } from "lodash";
import { useState } from "react";

import { ExperienceList } from "./features/experiences/components/ExperienceList";
import { InfiniteScroll } from "./features/shared/components/InfiniteScroll";
import Navbar from "./features/shared/components/Navbar";
import { Toaster } from "./features/shared/components/ui/Toaster";
import { ThemeProvider } from "./features/shared/context/ThemeProvider";
import { trpc } from "./router";

export function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
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
                    <span className="dark:text-primary-500">Cosden</span>{" "}
                    Solutions
                  </b>
                </p>
              </header>
              <Index />
            </div>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function Index() {
  const experiencesQuery = trpc.experiences.feed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  return (
    <InfiniteScroll onLoadMore={experiencesQuery.fetchNextPage}>
      <ExperienceList
        experiences={
          flatMap(experiencesQuery.data?.pages, (page) => page.experiences) ??
          []
        }
        isLoading={
          experiencesQuery.isLoading || experiencesQuery.isFetchingNextPage
        }
      />
    </InfiniteScroll>
  );
}
