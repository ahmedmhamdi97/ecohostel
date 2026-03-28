import { getTutorials, parseSteps, getYouTubeEmbedUrl } from "@/lib/sheets";
import Link from "next/link";
import { ArrowLeft, Play, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 300;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GuideDetailPage({ params }: Props) {
  const [tutorials, { id }] = await Promise.all([getTutorials(), params]);
  const idx = parseInt(id, 10);

  if (isNaN(idx) || idx < 0 || idx >= tutorials.length) notFound();

  const tutorial = tutorials[idx];
  const steps = parseSteps(tutorial.steps);
  const embedUrl = getYouTubeEmbedUrl(tutorial.video);

  return (
    <div className="min-h-screen bg-zinc-50 animate-fade-up">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-zinc-100 px-5 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/guides"
            className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center
                       active:bg-zinc-200 transition-colors"
          >
            <ArrowLeft size={18} className="text-zinc-700" strokeWidth={2} />
          </Link>
          <p className="text-sm font-bold text-zinc-900 max-w-[60%] truncate text-center">
            {tutorial.title}
          </p>
          <div className="w-9" />
        </div>
      </div>

      <div className="px-5 pt-6 pb-10 space-y-7">
        {/* Title block */}
        <div>
          {tutorial.category && (
            <span className="inline-block bg-zinc-100 text-zinc-600 text-[10px] font-bold
                             uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
              {tutorial.category}
            </span>
          )}
          <h1 className="text-2xl font-extrabold text-zinc-900 leading-snug tracking-tight">
            {tutorial.title || "Untitled guide"}
          </h1>
        </div>

        {/* Video */}
        {embedUrl && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center">
                <Play size={10} className="text-white ml-0.5" fill="white" />
              </div>
              <h2 className="text-sm font-bold text-zinc-900">Video Tutorial</h2>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-video bg-zinc-100 shadow-card">
              <iframe
                src={embedUrl}
                title={tutorial.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {tutorial.video && !embedUrl && (
          <a
            href={tutorial.video}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-zinc-900 rounded-2xl p-4
                       active:opacity-80 transition-opacity"
          >
            <Play size={18} className="text-white shrink-0" fill="white" />
            <span className="text-sm font-bold text-white">Watch video tutorial</span>
          </a>
        )}

        {/* Steps */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <BookOpen size={16} className="text-zinc-900" strokeWidth={2} />
            <h2 className="text-sm font-bold text-zinc-900">Steps</h2>
            {steps.length > 0 && (
              <span className="ml-auto text-xs font-semibold text-zinc-400">
                {steps.length} steps
              </span>
            )}
          </div>

          {steps.length === 0 ? (
            <p className="text-zinc-400 text-sm font-medium">No steps added yet.</p>
          ) : (
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-2xl bg-zinc-900 text-white
                                   text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1 bg-white rounded-2xl border border-zinc-100 shadow-card p-3.5">
                    <p className="text-zinc-700 text-sm leading-relaxed font-medium">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
