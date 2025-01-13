import { ChevronsUpDownIcon, PaperclipIcon } from "lucide-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { CourseDetailType } from "@/schemas";

const CourseSections = ({ course }: { course: CourseDetailType }) => {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex-between w-full rounded-lg px-2 hover:bg-secondary">
        <div className="flex items-center gap-2 text-lg font-semibold text-secondary-foreground">
          <p className="">{course.sections.length} sections</p>
          <div className="h-1 w-1 rounded-full bg-primary"></div>
          <p>{course.totalDuration}h total length</p>
        </div>

        <ChevronsUpDownIcon size={16} className="text-secondary-foreground" />
      </CollapsibleTrigger>

      <CollapsibleContent>
        {" "}
        <div className="mt-5 space-y-5">
          {course.sections.map((section, index) => (
            <Collapsible key={section.id} defaultOpen>
              {/* Section Title, Duration & Visibility */}
              <CollapsibleTrigger className="group flex w-full justify-between overflow-hidden rounded-t-xl border border-primary bg-secondary text-left">
                <div className="flex-between w-full p-5">
                  <h3 className="flex items-center gap-2 font-semibold text-secondary-foreground">
                    <span className="line-clamp-1">
                      Section {index + 1}: {section.title}
                    </span>
                    <ChevronsUpDownIcon
                      size={16}
                      className="hidden group-hover:block"
                    />
                  </h3>
                  <p className="m-0 text-sm">
                    {section.isPublic ? "Public" : "Private"}
                  </p>
                </div>
              </CollapsibleTrigger>

              {/* Description & Files */}
              <CollapsibleContent className="space-y-5 rounded-b-xl border border-primary border-t-transparent p-5">
                <p className="text-sm text-black">
                  {section.description !== ""
                    ? section.description
                        .trim()
                        .split("\n")
                        .map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))
                    : "No description"}
                </p>

                {section.files && section.files.length > 0 && (
                  <>
                    <Separator />
                    <div className="my-1 space-y-1">
                      {section.files.map((file, index) => {
                        return (
                          <div
                            key={index}
                            className="flex-between rounded-lg bg-secondary p-2"
                          >
                            <Link
                              href={file.url || "#"}
                              className="max-w-2/3 flex items-center gap-2 text-sm"
                              target="_blank"
                            >
                              <PaperclipIcon size={16} />
                              <span className="line-clamp-1 flex-1">
                                {file.url}
                              </span>
                              <span>
                                ({(file.fileSize / 1000).toFixed(1)} kB)
                              </span>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
export default CourseSections;
