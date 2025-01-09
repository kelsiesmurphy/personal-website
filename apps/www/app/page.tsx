import { Button } from "@ui/components/ui/button";

export default function Home() {
  return (
    <main className="flex bg-background items-center justify-center min-h-screen p-24">
      <div className="space-y-8 text-center">
        <p className="text-foreground">Kelsie Murphy</p>
        <Button>Hello</Button>
      </div>
    </main>
  );
}
