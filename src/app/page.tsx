import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl text-center">
        <p>Hello World</p>
        <ModeToggle />
      </h1>
    </main>
  );
}
