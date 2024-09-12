import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-4xl">
        <p>Hello World</p>
        <ModeToggle />
      </h1>
    </main>
  );
}
