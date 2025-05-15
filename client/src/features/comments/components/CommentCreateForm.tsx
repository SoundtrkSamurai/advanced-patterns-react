import {
  commentLikesRelations,
  Experience,
} from "@advanced-react/server/database/schema";
import { z } from "zod";
import { commentValidationSchema } from "@advanced-react/shared/schema/comment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/features/shared/components/ui/Form";
import { TextArea } from "@/features/shared/components/ui/TextArea";
import { Button } from "@/features/shared/components/ui/Button";
import { trpc } from "@/trpc";
import { useToast } from "@/features/shared/hooks/useToast";
import Spinner from "@/features/shared/components/ui/Spinner";

type CommentCreateFormData = z.infer<typeof commentValidationSchema>;

type CommentCreateFormProps = {
  experienceId: Experience["id"];
};

export function CommentCreateForm({ experienceId }: CommentCreateFormProps) {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const form = useForm<CommentCreateFormData>({
    resolver: zodResolver(commentValidationSchema),
    defaultValues: {
      content: "",
    },
  });

  const addCommentMutation = trpc.comments.add.useMutation({
    onError: (error) => {
      toast({
        title: "Failed to add comment",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: async ({ experienceId }) => {
      await Promise.all([
        utils.comments.byExperienceId.invalidate({
          experienceId,
        }),
        utils.experiences.feed.invalidate({}),
      ]);

      form.reset();

      toast({
        title: "Comment added successfully",
      });
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    addCommentMutation.mutate({
      content: data.content,
      experienceId,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextArea {...field} placeholder="Add a comment..." />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={addCommentMutation.isPending}>
          {addCommentMutation.isPending ? <Spinner /> : "Add Comment"}
        </Button>
      </form>
    </Form>
  );
}
