// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function BannerSkeleton() {
  return (
    <div className={"lg:h-40 h-24"}>
      <div className={`${shimmer} h-full flex items-center text-white bg-gray-200`}>
          <div className="ml-3 p-2">
            <div className="ml-2 h-12 w-36 rounded-md bg-gray-300 text-sm font-medium" />
          </div>
      </div>
    </div>
  );
}