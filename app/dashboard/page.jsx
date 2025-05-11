import auth from "@/config/firebase";
import Link from "next/link";

export default function Page() {
  // Placeholder stats
  const captionsToday = 3;
  const captionsWeek = 15;
  const remainingCredits = 7;
  const recentCaptions = [
    "Sunsets are proof that endings can be beautiful too.",
    "Chasing dreams, not people.",
    "Less perfection, more authenticity.",
    "Stay close to people who feel like sunlight.",
    "Create your own sunshine.",
  ];
  const proTip =
    "Pro Tip: Use trending hashtags to boost your caption's reach!";

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
      <h2 className="mb-4 text-3xl font-bold text-[var(--color-primary)] flex items-center gap-2">
        Hey {auth?.currentUser?.displayName|| auth?.currentUser?.email?.split("@")[0] || "Guest"}{" "}
        <span role="img" aria-label="wave">
          👋
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--color-card)] rounded-xl p-6 shadow border border-[var(--color-border)] flex flex-col items-center">
          <div className="font-semibold text-[var(--color-muted-foreground)] mb-1">
            Captions Today
          </div>
          <div className="text-3xl font-extrabold text-[var(--color-primary)]">
            {captionsToday}
          </div>
        </div>
        <div className="bg-[var(--color-card)] rounded-xl p-6 shadow border border-[var(--color-border)] flex flex-col items-center">
          <div className="font-semibold text-[var(--color-muted-foreground)] mb-1">
            This Week
          </div>
          <div className="text-3xl font-extrabold text-[var(--color-primary)]">
            {captionsWeek}
          </div>
        </div>
        <div className="bg-[var(--color-card)] rounded-xl p-6 shadow border border-[var(--color-border)] flex flex-col items-center">
          <div className="font-semibold text-[var(--color-muted-foreground)] mb-1">
            Credits Left
          </div>
          <div className="text-3xl font-extrabold text-[var(--color-accent)]">
            {remainingCredits}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <Link href="/dashboard/generate" legacyBehavior>
          <a className="flex-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg p-4 text-center font-semibold hover:bg-[var(--color-accent)] transition-colors shadow-md">
            Generate Caption
          </a>
        </Link>
        <Link href="/dashboard/pricing" legacyBehavior>
          <a className="flex-1 bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] rounded-lg p-4 text-center font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] transition-colors shadow-md">
            Upgrade Plan
          </a>
        </Link>
      </div>
      <div className="mb-10 bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-border)] shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-[var(--color-foreground)]">
          Recent Captions
        </h3>
        <ul className="pl-5 list-disc text-[var(--color-muted-foreground)] space-y-1">
          {recentCaptions.map((caption, idx) => (
            <li key={idx} className="mb-1 text-base">
              {caption}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[var(--color-popover)] border border-[var(--color-border)] rounded-xl p-5 italic text-[var(--color-accent)] text-center shadow-sm">
        {proTip}
      </div>
    </div>
  );
}
