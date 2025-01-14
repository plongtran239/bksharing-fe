import { ChevronsUpDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import MentorFeedbacks from "@/app/(admin)/admin/mentors/components/mentor-feedbacks";
import Achievement from "@/components/achievement";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ACHIEVEMENT_TYPES } from "@/constants/enum";
import {
  convertMilisecondsToLocaleDateString,
  convertToCapitalizeCase,
} from "@/lib/utils";
import { MentorType } from "@/schemas";

const MentorDetail = ({ mentor }: { mentor: MentorType }) => {
  const achievementsByType = (type: string) =>
    mentor.achievements.filter((achievement) => achievement.type === type);

  const educations = achievementsByType(ACHIEVEMENT_TYPES.EDUCATION);
  const experiences = achievementsByType(ACHIEVEMENT_TYPES.EXPERIENCE);
  const certifications = achievementsByType(ACHIEVEMENT_TYPES.CERTIFICATION);

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="space-y-5">
        <div className="flex justify-between rounded-xl bg-secondary p-5 text-secondary-foreground">
          <div className="flex items-center gap-5">
            <div className="relative h-[120px] w-[120px]">
              <Image
                src={
                  mentor.thumbnail?.originalUrl || "/images/default-user.png"
                }
                alt="avatar"
                fill
                sizes="(max-width: 640px) 100px,"
                priority
                className="rounded-full border-2 border-primary"
              />
            </div>

            <Separator orientation="vertical" />

            <div className="flex-1">
              <p>
                <span className="font-semibold">Name: </span>
                {mentor.name}
              </p>
              <p>
                <span className="font-semibold">Gender: </span>
                {convertToCapitalizeCase(mentor.gender)}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {mentor.email}
              </p>
              <p>
                <span className="font-semibold">Phone: </span>
                {mentor.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Birthday: </span>
                {convertMilisecondsToLocaleDateString(mentor.dob, "en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link href={mentor.cv.url || "#"} target="_blank">
              <Button className="px-2">View CV / Resume</Button>
            </Link>
          </div>
        </div>

        <Separator />

        <div className="flex-center w-full">
          <div className="w-full space-y-5">
            {Object.values(ACHIEVEMENT_TYPES).map((type, index) => (
              <div key={type}>
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex-between group w-full rounded-sm py-2 transition hover:bg-primary/30">
                    <h3 className="text-xl font-semibold text-primary">
                      {convertToCapitalizeCase(type)} (
                      {(() => {
                        switch (type) {
                          case ACHIEVEMENT_TYPES.EDUCATION:
                            return educations.length;
                          case ACHIEVEMENT_TYPES.EXPERIENCE:
                            return experiences.length;
                          case ACHIEVEMENT_TYPES.CERTIFICATION:
                            return certifications.length;
                          default:
                            return 0;
                        }
                      })()}
                      )
                    </h3>

                    <ChevronsUpDownIcon
                      size={20}
                      className="group-hover:text-primary"
                    />
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="mt-5 space-y-5">
                      {type === ACHIEVEMENT_TYPES.EDUCATION &&
                        educations.map((achievement, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-primary p-5"
                          >
                            <Achievement
                              field={achievement.major as string}
                              organization={achievement.organization}
                              description={achievement.description}
                              startDate={achievement.startDate}
                              endDate={achievement.endDate}
                            />
                          </div>
                        ))}

                      {type === ACHIEVEMENT_TYPES.EXPERIENCE &&
                        experiences.map((achievement, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-primary p-5"
                          >
                            <Achievement
                              field={achievement.position as string}
                              organization={achievement.organization}
                              description={achievement.description}
                              startDate={achievement.startDate}
                              endDate={achievement.endDate}
                            />
                          </div>
                        ))}

                      {type === ACHIEVEMENT_TYPES.CERTIFICATION &&
                        certifications.map((achievement, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-primary p-5"
                          >
                            <Achievement
                              field={achievement.name as string}
                              organization={achievement.organization}
                              description={achievement.description}
                              startDate={achievement.startDate}
                              endDate={achievement.endDate}
                            />
                          </div>
                        ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {index !== Object.values(ACHIEVEMENT_TYPES).length - 1 && (
                  <Separator className="my-5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <MentorFeedbacks mentorId={mentor.id} />
    </div>
  );
};
export default MentorDetail;
