import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IProps {
  step: number;
  totalSteps: number;
  isLoading?: boolean;
  isDisabledNext?: () => boolean;
  handleBack: () => void;
  handleNext: () => void;
  handleFinish: () => void;
}

const ProgressFooter = ({
  step,
  totalSteps,
  isLoading,
  isDisabledNext,
  handleBack,
  handleNext,
  handleFinish,
}: IProps) => {
  return (
    <footer className="flex-between border-t p-5 shadow-inner">
      <Button
        className={cn({
          hidden: step === 1,
        })}
        disabled={isLoading}
        onClick={handleBack}
      >
        Quay lại
      </Button>

      <Button
        className={cn({
          hidden: step === totalSteps,
        })}
        disabled={isDisabledNext && isDisabledNext()}
        onClick={handleNext}
      >
        Tiếp theo
      </Button>

      <Button
        className={cn({
          hidden: step !== totalSteps,
        })}
        disabled={(isDisabledNext && isDisabledNext()) || isLoading}
        onClick={handleFinish}
      >
        {isLoading ? <Loader /> : "Hoàn thành"}
      </Button>
    </footer>
  );
};
export default ProgressFooter;
