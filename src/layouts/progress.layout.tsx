import { Dispatch, PropsWithChildren, SetStateAction } from "react";

import ProgressFooter from "@/components/footer/progress-footer";
import ProgressHeader from "@/components/header/progress-header";

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  totalSteps: number;
  handleFinish: () => void;
  exitLink: string;
  isLoading?: boolean;
  isDisabledNext?: () => boolean;
}

const ProgressLayout = ({
  step,
  setStep,
  totalSteps,
  handleFinish,
  exitLink,
  isLoading,
  isDisabledNext,
  children,
}: PropsWithChildren<IProps>) => {
  return (
    <main className="h-screen">
      <ProgressHeader step={step} totalSteps={totalSteps} exitLink={exitLink} />

      {children}

      <ProgressFooter
        step={step}
        totalSteps={totalSteps}
        isLoading={isLoading}
        isDisabledNext={isDisabledNext}
        handleBack={() => setStep((prev) => prev - 1)}
        handleNext={() => setStep((prev) => prev + 1)}
        handleFinish={handleFinish}
      />
    </main>
  );
};
export default ProgressLayout;
