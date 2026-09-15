// app/components/ListSkeleton.tsx
export default function ListSkeleton() {
  // Create an array placeholder to map multiple rows
  const skeletonRows = Array.from({ length: 3 });

  return (
    <div className="space-y-4">
      {skeletonRows.map((_, index) => (
        <div 
          key={index} 
          className="p-4 border rounded bg-white shadow-xs animate-pulse space-y-3"
        >
          {/* Movie Title Placeholder Row */}
          <div className="h-5 bg-gray-200 rounded w-1/3" />
          
          {/* Review Text Placeholder Rows */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}