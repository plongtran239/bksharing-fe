import { LoaderCircleIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex-center h-full gap-2">
      <LoaderCircleIcon
        size={16}
        className="animate-spin transition-transform duration-1000 ease-in-out"
      />
      Loading...
    </div>
  );
};
export default Loader;
