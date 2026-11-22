export default function Loading() {
  return (
    <div className="container-digi space-y-3 py-3">
      <div className="skeleton h-20 rounded-2xl" />
      <div className="skeleton h-48 w-full rounded-2xl md:h-72" />
      <div className="skeleton h-36 rounded-2xl" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
