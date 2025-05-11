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
    <div className="max-w-xl mx-auto p-6">
      <h2 className="mb-2 text-2xl font-semibold text-[var(--color-primary)]">
        Hey Mehboob{" "}
        <span role="img" aria-label="wave">
          👋
        </span>
      </h2>
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-[var(--color-card)] rounded-lg p-4 shadow border border-[var(--color-border)]">
          <div className="font-semibold text-[var(--color-muted-foreground)]">
            Captions Today
          </div>
          <div className="text-2xl font-bold text-[var(--color-primary)]">
            {captionsToday}
          </div>
        </div>
        <div className="flex-1 bg-[var(--color-card)] rounded-lg p-4 shadow border border-[var(--color-border)]">
          <div className="font-semibold text-[var(--color-muted-foreground)]">
            This Week
          </div>
          <div className="text-2xl font-bold text-[var(--color-primary)]">
            {captionsWeek}
          </div>
        </div>
        <div className="flex-1 bg-[var(--color-card)] rounded-lg p-4 shadow border border-[var(--color-border)]">
          <div className="font-semibold text-[var(--color-muted-foreground)]">
            Credits Left
          </div>
          <div className="text-2xl font-bold text-[var(--color-accent)]">
            {remainingCredits}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-8">
        <Link href="/dashboard/generate" legacyBehavior>
          <a className="flex-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg p-4 text-center font-semibold hover:bg-[var(--color-accent)] transition-colors">
            Generate Caption
          </a>
        </Link>
        <Link href="/dashboard/pricing" legacyBehavior>
          <a className="flex-1 bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] rounded-lg p-4 text-center font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] transition-colors">
            Upgrade Plan
          </a>
        </Link>
      </div>
      <div className="mb-8">
        <h3 className="mb-2 text-lg font-semibold text-[var(--color-foreground)]">
          Recent Captions
        </h3>
        <ul className="pl-5 list-disc text-[var(--color-muted-foreground)]">
          {recentCaptions.map((caption, idx) => (
            <li key={idx} className="mb-1">
              {caption}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[var(--color-popover)] border border-[var(--color-border)] rounded-lg p-4 italic text-[var(--color-accent)]">
        {proTip}
      </div>
    </div>
  );
}
