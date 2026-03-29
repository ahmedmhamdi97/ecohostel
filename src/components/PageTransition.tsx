"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.animation = "none";
    // force reflow
    void el.offsetHeight;
    el.style.animation = "";
  }, [pathname]);

  return (
    <div ref={ref} className="animate-fade-up">
      {children}
    </div>
  );
}
