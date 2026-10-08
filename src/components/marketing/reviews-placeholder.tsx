export function ReviewsPlaceholder() {
  return (
    <section aria-labelledby="reviews-title" className="content-shell py-16">
      <p className="bd-fresh-eyebrow">Trust, with permission</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight" id="reviews-title">Client stories will appear here.</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">We only publish real feedback after the customer approves the wording, name, company, and any image.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Customer review pending", "Customer review pending", "Customer review pending"].map((label, index) => (
          <article className="rounded-xl border border-border bg-card p-5 text-card-foreground" key={`${label}-${index}`}>
            <p className="text-sm font-medium">{label}</p>
            <p className="mt-3 text-sm text-muted-foreground">Add approved customer words here before launch.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
