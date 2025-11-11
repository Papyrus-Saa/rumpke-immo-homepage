import Image from "next/image";

export default function AboutPortrait() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-md border-3 border-amber-400">
        <Image
          src="/imgs/ann-christin.png"
          alt="Ann-Christin Rumpke Portrait"
          fill
          sizes="(max-width: 768px) 128px, 160px"
          className="object-cover"
          priority
        />
      </div>
      <div className="mt-4 text-center">
        <div className="font-semibold text-lg md:text-xl text-gray-900 dark:text-gray-100">Ann-Christin Rumpke</div>
        <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300 tracking-wide">Immobilienmaklerin & Wertermittlerin</div>
      </div>
    </div>
  );
}
