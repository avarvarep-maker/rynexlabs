"use client";

import { usePathname } from "next/navigation";
import AnimatedBackground from "./AnimatedBackground";

export default function ClientBackground() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <AnimatedBackground />;
}
