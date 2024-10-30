export default function NotFound() {
  return (
    <div className="flex-center h-screen flex-col space-y-10">
      <h2 className="text-xl text-primary">
        <span className="text-black">404 </span>
        Not Found!
      </h2>
      <p>Could not find requested resource</p>
    </div>
  );
}
