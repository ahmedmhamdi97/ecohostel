"use client";

import { useEffect, useState } from "react";

function getGreeting(h: number) {
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function HomeHeader() {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  return (
    <div className="flex items-center justify-between px-5 pt-14 pb-2">
      <div>
        <p className="text-sm font-semibold text-teal-700 mb-0.5 tracking-wide uppercase">{greeting}</p>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
          Volunteer Hub
        </h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Eco Hostel · Granada</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Eco Hostel"
        className="w-12 h-12 rounded-2xl shrink-0 object-cover shadow-md"
      />
    </div>
  );
}
