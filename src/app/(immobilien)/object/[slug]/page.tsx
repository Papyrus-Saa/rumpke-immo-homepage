import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import ObjectSlideshow from "../../../../components/slideshow/ObjectSlideshow";
import ObjectMobileSlideshow from "@/components/slideshow/ObjectMobileSlideshow";
import { AgentCard } from "@/app/admin/agents/components/AgentCard";
import { useAgents } from "@/hooks/useAgents";
import { Agent } from "http";




interface Props {
  params: {
    slug: string;
  }
}


export default  function ({ params }: Props) {
// const { agents } = useAgents();
  const { slug } =  params;

  const object = initialData.properties.find(prop => prop.slug === slug);

  if (!object) {
    notFound();
  }

  return (
    <div className="mb-20">

      <div className="md:hidden mb-6 -mx-4 md:mx-0">
        <ObjectMobileSlideshow
          title={object.title}
          images={object.images}
          className="w-full"
        />
      </div>

      <div className="">
        <div className="space-y-3 mb-6 lg:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {object.title}
          </h1>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">€{object.price.toLocaleString()}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Kaufpreis</span>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">


          <div className="lg:col-span-8 space-y-6">


            <div className="hidden md:block">
              <ObjectSlideshow
                images={object.images}
                title={object.title}
                className="w-full rounded overflow-hidden"
              />
            </div>


            <div className="space-y-4 px-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Beschreibung
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {object.description}
              </p>
            </div>


            <div className="bg-card-bg-l dark:bg-card-bg-d rounded p-5 md:p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Eigenschaften
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Wohnfläche</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">-- m²</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Zimmer</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">--</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Baujahr</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">--</p>
                </div>
              </div>
            </div>
          </div>


          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-6">
              {/* <AgentCard
               agent={agents[0]}
              /> */}

              <AgentCard
               agent={initialData.agents[0]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
