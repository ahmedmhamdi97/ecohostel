import { PhoneCall, AlertTriangle } from "lucide-react";

export default function SosPage() {
  return (
    <div className="animate-fade-up px-5 pt-14">
      <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Emergency</h1>
      <p className="text-zinc-400 text-sm font-medium mt-0.5 mb-8">SOS contacts &amp; emergency info</p>

      <div className="space-y-3">
        {/* Emergency services */}
        <a href="tel:112" className="flex items-center gap-4 bg-red-500 rounded-3xl p-5 active:scale-[0.98] transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <PhoneCall size={22} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-white font-bold text-base">Emergency Services</p>
            <p className="text-white/70 text-sm">112 — Police / Fire / Ambulance</p>
          </div>
        </a>

        {/* Manager */}
        <a href="tel:+1234567890" className="flex items-center gap-4 bg-white rounded-3xl border border-zinc-100 shadow-sm p-5 active:scale-[0.98] transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center shrink-0">
            <PhoneCall size={20} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-zinc-900 font-bold text-base">Hostel Manager</p>
            <p className="text-zinc-400 text-sm">Tap to call</p>
          </div>
        </a>

        {/* Important notice */}
        <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-3xl p-5 mt-6">
          <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-amber-800 text-sm font-medium leading-relaxed">
            In case of fire, evacuate immediately. Assembly point is at the main entrance. Do not use elevators.
          </p>
        </div>
      </div>
    </div>
  );
}
