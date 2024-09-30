import { Skeleton } from "@/components/ui/skeleton";

const MultiplierInputSkeleton = () => {
  return (
    <div className="flex justify-center mb-4">
      <div className="w-full max-w-xs relative">
               
        <div className="relative mt-2">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
            $
          </span>
          {/* Input skeleton */}
          <Skeleton className="pl-6 w-full h-12 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default MultiplierInputSkeleton;
