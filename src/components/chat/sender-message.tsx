const SenderMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex w-full justify-end">
      <div className="rounded-xl bg-primary px-5 py-2 text-sm text-white">
        {message}
      </div>
    </div>
  );
};
export default SenderMessage;
