export default function FeedCard({
  title,
  tag,
  body,
  image,
}: {
  title: string;
  tag?: string;
  body: string;
  image: string;
}) {
  return (
    <article className="rounded-xl border overflow-hidden bg-white">
      <img src={image} alt="" className="h-44 w-full object-cover" />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          {tag && <span className="rounded bg-muted px-2 py-0.5 text-xs">{tag}</span>}
        </div>
        <p className="mt-1 text-sm text-gray-600">{body}</p>
      </div>
    </article>
  );
}
