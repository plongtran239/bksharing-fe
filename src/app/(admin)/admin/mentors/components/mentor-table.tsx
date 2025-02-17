"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import {
  CalendarCheck2Icon,
  EyeIcon,
  UserRoundCheckIcon,
  UserRoundXIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import adminApi from "@/apis/admin.api";
import DataTable from "@/components/data-table";
import MeetingModal from "@/components/meeting-modal";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LOCALE } from "@/constants/date";
import { MENTOR_STATUS } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { convertMilisecondsToLocaleString, generateNameId } from "@/lib/utils";
import { MentorType } from "@/schemas";

interface IProps {
  data: MentorType[];
}

const MentorTable = ({ data }: IProps) => {
  const t = useTranslations("mentorStatus");

  const router = useRouter();

  const { toast } = useToast();

  const [openMeetingModal, setOpenMeetingModal] = useState(false);

  const [meetingValues, setMeetingValues] = useState({
    title: "",
    startsAt: new Date(),
  });

  const [mentorId, setMentorId] = useState<number | undefined>(undefined);

  const handleProcessMentorApplication = async (
    mentorId: number,
    isApproved: boolean
  ) => {
    try {
      await adminApi.approveMentor(mentorId, isApproved);

      const toastMessage = isApproved
        ? "Mentor application has been accepted!"
        : "Mentor application has been rejected!";

      toast({
        title: "Success",
        description: toastMessage,
      });

      router.refresh();
    } catch (error) {
      console.error({ error });
    }
  };

  const handleScheduleInterview = async () => {
    if (!mentorId) {
      return;
    }

    try {
      const { title, startsAt } = meetingValues;

      await adminApi.interviewMentor(mentorId, {
        title: title || "Interview Meeting",
        startsAt: startsAt,
      });

      toast({
        title: "Success",
        description: "Interview has been scheduled!",
      });

      router.push("/admin/meetings");
      router.refresh();
    } catch (error) {
      console.error({ error });

      toast({
        title: "Error",
        description: "Failed to schedule interview!",
        variant: "destructive",
      });
    }

    setOpenMeetingModal(false);
  };

  const columns: ColumnDef<MentorType>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Họ tên
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Số điện thoại
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => (
        <div className="capitalize">{t(row.original.status.toLowerCase())}</div>
      ),
    },
    {
      accessorKey: "registeredAt",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Tham gia vào
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div>
          {convertMilisecondsToLocaleString(
            row.getValue("registeredAt"),
            LOCALE,
            {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          )}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  router.push(
                    `/admin/mentors/${generateNameId({
                      name: row.original.name,
                      id: row.original.id,
                    })}`
                  );
                }}
                className="flex items-center gap-2"
              >
                <EyeIcon size={16} />
                Xem chi tiết
              </DropdownMenuItem>

              {![MENTOR_STATUS.ACCEPTED, MENTOR_STATUS.REJECTED].includes(
                row.original.status
              ) && (
                <DropdownMenuItem
                  onClick={() => {
                    setOpenMeetingModal(true);
                    setMentorId(row.original.id);
                  }}
                  className="flex items-center gap-2"
                >
                  <CalendarCheck2Icon size={16} />
                  Đặt lịch phỏng vấn
                </DropdownMenuItem>
              )}

              <Separator className="my-1" />

              {row.original.status === MENTOR_STATUS.PENDING ? (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      handleProcessMentorApplication(row.original.id, true)
                    }
                    className="flex items-center gap-2"
                  >
                    <UserRoundCheckIcon size={16} />
                    Chấp nhận
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleProcessMentorApplication(row.original.id, false)
                    }
                    className="flex items-center gap-2"
                  >
                    <UserRoundXIcon size={16} />
                    Từ chối
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  onClick={() =>
                    handleProcessMentorApplication(
                      row.original.id,
                      row.original.status === MENTOR_STATUS.REJECTED
                    )
                  }
                  className="flex items-center gap-2"
                >
                  {row.original.status === MENTOR_STATUS.ACCEPTED ? (
                    <>
                      <UserRoundXIcon size={16} />
                      Từ chối
                    </>
                  ) : (
                    <>
                      <UserRoundCheckIcon size={16} />
                      Chấp nhận
                    </>
                  )}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        searchBy="name"
        filterBy="status"
        filterOptions={Object.values(MENTOR_STATUS)}
      />

      <MeetingModal
        isOpen={openMeetingModal}
        onClose={() => {
          setOpenMeetingModal(false);
          setMeetingValues({ title: "", startsAt: new Date() });
        }}
        title="Schedule Meeting"
        buttonText="Schedule Interview"
        buttonIcon={<CalendarCheck2Icon size={16} />}
        handleClick={handleScheduleInterview}
      >
        <div className="mt-5 w-full space-y-5">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="title"
              onChange={(e) =>
                setMeetingValues({ ...meetingValues, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="date" required>
              Date & Time
            </Label>

            <DateTimePicker
              value={meetingValues.startsAt}
              onChange={(date) =>
                setMeetingValues({
                  ...meetingValues,
                  startsAt: date || new Date(),
                })
              }
              granularity="minute"
              hourCycle={12}
              yearRange={1}
              weekStartsOn={1}
            />
          </div>
        </div>
      </MeetingModal>
    </>
  );
};
export default MentorTable;
