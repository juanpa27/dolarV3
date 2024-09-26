import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonDollarQuoteCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2 flex flex-col items-center justify-center">
        <CardTitle className="text-3xl font-bold flex justify-center w-full">
          <Skeleton className="h-9 w-48" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          {/* Graph skeleton */}
          <div className="mt-4">
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}