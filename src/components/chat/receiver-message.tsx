const ReceiverMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex w-full justify-start">
      <div className="rounded-xl bg-gray-100 px-5 py-2 text-sm">{message}</div>
    </div>
  );
};
export default ReceiverMessage;
