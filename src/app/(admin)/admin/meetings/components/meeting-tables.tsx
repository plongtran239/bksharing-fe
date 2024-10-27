"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { ColumnDef } from "@tanstack/react-table";
import { LogInIcon, PlayIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import meetingApi from "@/apis/meeting.api";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MEETING_STATUS, ROLES } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import {
  convertMilisecondsToLocaleString,
  convertToCapitalizeCase,
} from "@/lib/utils";
import { MeetingType } from "@/schemas";

const MeetingTable = ({ data }: { data: MeetingType[] }) => {
  const router = useRouter();

  const { toast } = useToast();

  const client = useStreamVideoClient();

  const columns: ColumnDef<MeetingType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({}) => {
        return <button className="flex-center">Title</button>;
      },
      cell: ({ row }) => <div className="">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "startsAt",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex-center"
          >
            Date & Time
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div>
          {convertMilisecondsToLocaleString(row.getValue("startsAt"), "en-US", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {convertToCapitalizeCase(row.getValue("status"))}
        </div>
      ),
    },
    {
      accessorKey: "participants",
      header: "Candidate",
      cell: ({ row }) => {
        const participants = row.original.participants.filter(
          (participant) => participant.accountType !== ROLES.ADMIN
        );

        return (
          <div className="">
            {participants.map((participant) => (
              <div key={participant.id} className="">
                <p>{participant.name}</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const {
          id: meetingId,
          cid,
          startsAt,
          title,
          participants,
        } = row.original;

        if (!client) {
          return;
        }

        const call = client.call("default", cid);

        if (!call) {
          throw new Error("Failed to create a call");
        }

        const handleStartMeeting = async () => {
          try {
            await call.getOrCreate({
              data: {
                members: participants.map((participant) => ({
                  user_id: participant.id.toString(),
                  role:
                    participant.accountType === ROLES.ADMIN ? "admin" : "user",
                })),
                starts_at: new Date(Number(startsAt)).toISOString(),
                custom: {
                  title: title || "Interview Meeting",
                },
              },
            });

            await meetingApi.startMeeting(meetingId);

            router.push(`/meeting/${cid}`);

            toast({
              title: "Success",
              description: "Meeting started successfully!",
            });
          } catch (error) {
            console.error({ error });

            toast({
              title: "Error",
              description: "Failed to start meeting!",
              variant: "destructive",
            });
          }
        };

        const handleJoinMeeting = () => {
          router.push(`/meeting/${cid}`);
        };

        const handleEndMeeting = async () => {
          try {
            await meetingApi.endMeeting(meetingId);

            await call.endCall();

            toast({
              title: "Success",
              description: "Meeting ended successfully!",
            });

            router.refresh();
          } catch (error) {
            console.error({ error });

            toast({
              title: "Error",
              description: "Failed to end meeting!",
              variant: "destructive",
            });
          }
        };

        return (
          <>
            {row.getValue("status") === MEETING_STATUS.SCHEDULED && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <DropdownMenuItem
                    onClick={handleStartMeeting}
                    className="flex items-center gap-2"
                  >
                    <PlayIcon size={16} />
                    Start Meeting
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {}}
                    className="flex items-center gap-2"
                    disabled
                  >
                    <XIcon size={16} />
                    Cancel Meeting
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {row.getValue("status") === MEETING_STATUS.ONGOING && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <DropdownMenuItem
                    onClick={handleJoinMeeting}
                    className="flex items-center gap-2"
                  >
                    <LogInIcon size={16} />
                    Join Meeting
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleEndMeeting}
                    className="flex items-center gap-2"
                  >
                    <XIcon size={16} />
                    End Meeting
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data.sort((a, b) => Number(a.startsAt) - Number(b.startsAt))}
        searchBy="title"
        filterBy="status"
        filterOptions={Object.values(MEETING_STATUS)}
      />
    </>
  );
};
export default MeetingTable;
