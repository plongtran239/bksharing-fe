import { LoaderCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const Loader = ({ description }: { description?: string }) => {
  const t = useTranslations("common");

  return (
    <div className="flex-center h-full gap-2">
      <LoaderCircleIcon
        size={16}
        className="animate-spin transition-transform duration-1000 ease-in-out"
      />
      {description || t("loading")}...
    </div>
  );
};
export default Loader;
