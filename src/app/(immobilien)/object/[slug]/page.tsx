import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import ObjectSlideshow from "../../../../components/slideshow/ObjectSlideshow";
import ObjectMobileSlideshow from "@/components/slideshow/ObjectMobileSlideshow";

interface Props {
  params: {
    slug: string;
  }
}


export default async function ({ params }: Props) {

  const { slug } = await params;

  const object = initialData.properties.find(prop => prop.slug === slug);

  if (!object) {
    notFound();
  }

  return (
    <div className="mb-20 grid grid-cols-1 md:grid-cols-4 gap-1">

      <div className="col-span-4 xl:col-span-3">

        {/* Mobile Slideshow */}

        <ObjectMobileSlideshow
          title={object.title}
          images={object.images}
          className="block md:hidden"
        />


        {/* Desktop Slideshow */}
        <ObjectSlideshow
          images={object.images}
          title={object.title}
          className="hidden md:block"
        />
      </div>
      <div className="col-span-1 md:col-span-2  xl:col-span-1">
        <h1 className="font-bold mb-5">
          {object.title}
        </h1>

        <h3 className="text-sm font-bold">Beschreibung</h3>
        <p className="text-sm">{object.description}</p>
        <div className="flex justify-between items-center p-2">
          <p>Kaufpreis {object.price}€</p>
          {/* <p>{object.squareMeters} m²</p> */}
          {/* Wohnfläche ca. */}
          {/* <p>{object.location}</p> */}
        </div>


      </div>

    </div>
  );
}
