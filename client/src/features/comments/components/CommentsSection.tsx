import { Experience } from "@advanced-react/server/database/schema";

import { trpc } from "@/router";

import { CommentCreateForm } from "./CommentCreateForm";
import CommentList from "./CommentList";

type CommentsSectionProps = {
  commentsCount: number;
  experienceId: Experience["id"];
};

export function CommentsSection({
  commentsCount,
  experienceId,
}: CommentsSectionProps) {
  const commentsQuery = trpc.comments.byExperienceId.useQuery(
    { experienceId },
    {
      enabled: commentsCount > 0,
    },
  );

  if (commentsQuery.error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Comments ({commentsCount})</h3>
      <CommentCreateForm experienceId={experienceId} />
      <CommentList
        comments={commentsQuery.data ?? []}
        isLoading={commentsQuery.isLoading}
      />
    </div>
  );
}
