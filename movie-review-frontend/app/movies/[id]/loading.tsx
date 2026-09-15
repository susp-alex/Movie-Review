export default function MovieLoading() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-400 animate-pulse">
        Loading Movie...
      </h2>
      
      <div className="space-y-2">
        <div className="h-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-16 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}