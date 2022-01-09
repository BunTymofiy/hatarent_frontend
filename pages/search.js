import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Property from "../components/Property";
import PropertyService from "../services/PropertyService";

function Search({ propertiesFound }) {
  const router = new useRouter();
  return (
    <div className="h-screen">
      <Header />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <div className="flex flex-col">
            {propertiesFound?.map((propertyFound) => (
              <div
              key={propertyFound.uuid}
                onClick={() => {
                  router.push({
                    pathname: "/info", 
                    query: { uuid: propertyFound.uuid }},
                    );
                }}
              >
                <Property key={propertyFound.uuid} property={propertyFound} />
              </div>
            ))}
          </div>
          {propertiesFound?.length === 0 && (
            <div class="flex items-center justify-center space-x-2 animate-bounce">
              <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
              <div class="w-8 h-8 bg-green-400 rounded-full"></div>
              <div class="w-8 h-8 bg-black rounded-full"></div>
            </div>
          )}
        </section>
        <section></section>
      </main>
      <Footer className="" />
    </div>
  );
}

export default Search;

export async function getStaticProps() {
  const res = await PropertyService.getProperties();
  const propertiesFound = await res.data;

  return {
    props: {
      propertiesFound,
    },
  };
}
