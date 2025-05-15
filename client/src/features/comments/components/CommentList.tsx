import Spinner from "@/features/shared/components/ui/Spinner";
import { map } from "lodash";
import { CommentForList } from "../types";
import { CommentCard } from "./CommentCard";

type CommentListProps = {
  comments: CommentForList[];
  isLoading: boolean;
};

export default function CommentList({ comments, isLoading }: CommentListProps) {
  return (
    <div className="space-y-4">
      {map(comments, (comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && comments.length === 0 && (
        <div className="flex justify-center">No comments yet</div>
      )}
    </div>
  );
}
