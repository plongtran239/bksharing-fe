"use client";

import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import recommandationApi from "@/apis/recommandation.api";
import userApi from "@/apis/user.api";
import FileInput from "@/components/file-input";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FOLDER, RESOURCE_TYPE } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { useUploadFile } from "@/hooks/use-upload-file";
import { useAppContext } from "@/providers/app.provider";

const ProfileHeading = ({
  name,
  avatarUrl,
  accountId,
  mentorId,
}: {
  name: string;
  avatarUrl: string | undefined;
  accountId: number;
  mentorId: number;
}) => {
  const {
    file,
    setFile,
    uploadFile,
    isLoading: isUploadFileLoading,
  } = useUploadFile({
    resourceType: RESOURCE_TYPE.IMAGE.toLowerCase(),
    folder: FOLDER.IMAGES.toLowerCase(),
  });

  const [isloading, setIsloading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { user } = useAppContext();

  const isOwnProfile = accountId === user?.id;

  useEffect(() => {
    async function viewCount() {
      try {
        await recommandationApi.mentorViewCount(mentorId);
      } catch (error) {
        console.error({ error });
      }
    }

    if (user && !isOwnProfile) {
      viewCount();
    }
  }, [isOwnProfile, mentorId, user]);

  const handleOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleUpdateAvatar = async () => {
    if (!file) {
      toast({
        title: "Lỗi",
        description: "Chọn một tấm ảnh",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsloading(true);
      const createdSignedUrl = await uploadFile(file);

      if (!createdSignedUrl) {
        return;
      }

      await userApi.updateMe({
        avatarId: createdSignedUrl?.fileId,
      });

      router.refresh();

      setFile(undefined);

      toast({
        title: "Thành công",
        description: "Cập nhật ảnh đại diện thành công",
      });
    } catch (error) {
      console.error({ error });
      toast({
        title: "Thất bại",
        description: "Cập nhật ảnh đại diện thất bại",
        variant: "destructive",
      });
    } finally {
      setIsloading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <TooltipProvider>
        <div className="relative">
          {/* Background */}
          <div className="relative h-60 w-full">
            <Image
              src="/images/default-background.png"
              alt=""
              fill
              className="group-hover rounded-xl brightness-75"
              sizes="(max-width: 640px) 100px,"
              priority
            />

            <div className="absolute bottom-2 left-44 z-10 text-2xl font-semibold text-white">
              {name}
            </div>

            {/* <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute right-5 top-5 rounded-full bg-white p-2">
                  <PencilIcon
                    size={16}
                    className="text-primary hover:text-primary/50"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent align="center">
                <p className="text-xs">Edit background</p>
              </TooltipContent>
            </Tooltip> */}
          </div>

          {/* Avatar */}
          <div className="absolute">
            {!isOwnProfile && (
              <div className="relative bottom-20 left-12 h-[100px] w-[100px]">
                <Image
                  src={avatarUrl || "/images/default-user.png"}
                  alt="Avatar"
                  className="rounded-full outline outline-2 outline-primary"
                  priority
                  fill
                  sizes="(max-width: 640px) 100px,"
                />
              </div>
            )}

            {isOwnProfile && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="group" onClick={handleOpenDialog}>
                    <div className="relative bottom-20 left-12 h-[100px] w-[100px]">
                      <Image
                        src={avatarUrl || "/images/default-user.png"}
                        alt="Avatar"
                        className="rounded-full outline outline-2 outline-primary group-hover:opacity-30"
                        priority
                        fill
                        sizes="(max-width: 640px) 100px,"
                      />
                      <div className="absolute bottom-10 left-11">
                        <PencilIcon
                          size={16}
                          className="hidden text-white group-hover:block"
                        />
                      </div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  className="-translate-x-14 -translate-y-4"
                >
                  <p className="text-xs">Chỉnh ảnh đại diện</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </TooltipProvider>

      <Dialog open={isDialogOpen} onOpenChange={handleOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary">
              Chỉnh ảnh đại diện
            </DialogTitle>
            <DialogDescription>Size: 100 x 100</DialogDescription>
          </DialogHeader>

          <div>
            {/* Image review */}
            <div className="flex-center mb-5">
              <div className="relative h-[200px] w-[200px]">
                <Image
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : avatarUrl || "/images/default-user.png"
                  }
                  alt="Avatar"
                  priority
                  className="rounded-full border border-primary"
                  fill
                />
              </div>
            </div>
          </div>

          <FileInput
            id="cv"
            accept=".png, .jpg, .jpeg, .svg"
            value={file?.name}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              } else {
                setFile(undefined);
              }
            }}
          />

          <DialogFooter>
            <Button
              onClick={handleUpdateAvatar}
              disabled={isUploadFileLoading || isloading}
            >
              {isUploadFileLoading || isloading ? <Loader /> : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ProfileHeading;
