"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn, generateNameId } from "@/lib/utils";
import { useAppContext } from "@/providers/app.provider";
import { MentorType } from "@/schemas";

interface IProps {
  mentor: MentorType;
}

const BookButton = ({ mentor }: IProps) => {
  const { user } = useAppContext();
  const router = useRouter();

  const isOwner = user?.id === mentor.accountId;

  const handleBookNow = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    router.push(
      `/users/${generateNameId({ id: mentor.id, name: mentor.name })}/schedule`
    );
  };

  return (
    <div className="flex flex-1 items-center justify-end">
      <Button
        className={cn({
          hidden: isOwner,
        })}
        onClick={handleBookNow}
      >
        Book now
      </Button>
    </div>
  );
};
export default BookButton;
