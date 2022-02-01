import Image from "next/image";

function Property(props) {
  const property = props.property;
  // console.log(property);
  return (
    <div className=" flex cursor-pointer py-7 px-2 pr-4 hover:opacity-80 hover:shadow-lg border-b transition duration-200 ease-out first:border-t bg-gradient-to-t from-purple-800 to-blue-900 p-3 ">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex flex-shrink-0">
        {property.images.map((image) => (
          <Image
            src={image}
            key={image}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            priority={true}
          />
        ))}
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{property.address.city}</p>
        </div>
        <h4 className="text-xl" id="title">{property.title}</h4>
        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow">
          {property.description}
        </p>

        <div className="flex justify-between items-end pt-5">
          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl">Price</p>
            <p className="text-right font-extralight">Total</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
