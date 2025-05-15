import { useState } from "react";
import Navbar from "./features/shared/components/Navbar";
import { Toaster } from "./features/shared/components/ui/Toaster";
import { ThemeProvider } from "./features/shared/context/ThemeProvider";
import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/react-query";
import { env } from "./lib/utils/env";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExperienceList } from "./features/experiences/components/ExperienceList";
import { InfiniteScroll } from "./features/shared/components/InfiniteScroll";
import { flatMap } from "lodash";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: env.VITE_SERVER_BASE_URL,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <Toaster />
          <div className="flex justify-center gap-8 pb-8">
            <Navbar />
            <div className="w-full max-w-2xl min-h-screen">
              <header className="p-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                <h1 className="text-xl font-bold text-center">
                  Advanced Patterns React
                </h1>
                <p className="text-sm text-center text-neutral-500">
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
    <InfiniteScroll
      hasNextPage={!!experiencesQuery.data?.pages[0].nextCursor}
      onLoadMore={experiencesQuery.fetchNextPage}
    >
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
