import { HTMLAttributes } from "react";
import { twMerge } from "tw-merge";
import { clsx, ClassValue } from "clsx";
interface ClassName extends HTMLAttributes<HTMLHeadingElement> {}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Incognitalk({ className }: ClassName) {
  return (
    <h1 className={cn("font-black text-4xl text-primary", className)}>
      incognitalk.
    </h1>
  );
}
