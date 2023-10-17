export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 bg-background max-h-[100dvh] h-screen w-full overflow-x-hidden overflow-y-auto flex flex-col">
      {children}
    </main>
  );
}
