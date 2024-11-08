import Image from "next/image";
import Link from "next/link";

import { Progress } from "@/components/ui/progress";

const ProgressHeader = ({
  step,
  totalSteps,
  exitLink,
}: {
  step: number;
  totalSteps: number;
  exitLink: string;
}) => {
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

            <span className="text-xl text-secondary-foreground dark:text-white">
              BK Sharing
            </span>
          </div>

          {totalSteps !== 1 && (
            <div className="p-5">
              Step {step} of {totalSteps}
            </div>
          )}
        </div>

        <Link href={exitLink} className="p-5 font-semibold text-primary">
          Exit
        </Link>
      </header>
      <Progress value={(step / totalSteps) * 100} className="h-1" />
    </>
  );
};
export default ProgressHeader;
