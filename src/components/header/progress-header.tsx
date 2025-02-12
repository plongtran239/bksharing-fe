import Image from "next/image";
import { useRouter } from "next/navigation";

import { Progress } from "@/components/ui/progress";

const ProgressHeader = ({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) => {
  const router = useRouter();

  return (
    <>
      <header className="flex-between">
        <div className="flex-center">
          <div className="flex-center gap-2 border-r p-5">
            <Image
              src="/images/logo-icon.png"
              alt="logo"
              width={35}
              height={35}
              priority
            />

            <span className="text-xl font-semibold text-secondary-foreground dark:text-white">
              BK Sharing
            </span>
          </div>

          {totalSteps !== 1 && (
            <div className="p-5">
              Bước {step} trên {totalSteps}
            </div>
          )}
        </div>

        <button
          onClick={() => router.back()}
          className="p-5 font-semibold text-primary"
        >
          Thoát
        </button>
      </header>
      <Progress value={(step / totalSteps) * 100} className="h-1" />
    </>
  );
};
export default ProgressHeader;
