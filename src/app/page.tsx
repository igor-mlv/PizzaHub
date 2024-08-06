import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="A Slice of Everything" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">

          {/* left panel - filter */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* right panel - list of products */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={"Pizza"}
                items={[
                  { id: 1, name: "Pizza 1", imageUrl: "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif", items: [{ price: 10 }] },
                  { id: 2, name: "Pizza 2", imageUrl: "https://cdn.pixabay.com/photo/2017/12/05/20/10/pizza-3000285_1280.png", items: [{ price: 20 }] },
                  { id: 3, name: "Pizza 3", imageUrl: "https://cdn.pixabay.com/photo/2017/12/05/20/10/pizza-3000285_1280.png", items: [{ price: 30 }] },
                ]}
                categoryId={1} />

              <ProductsGroupList
                title={"Coffee"}
                items={[
                  { id: 1, name: "Pizza 1", imageUrl: "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif", items: [{ price: 10 }] },
                  { id: 2, name: "Pizza 2", imageUrl: "https://cdn.pixabay.com/photo/2017/12/05/20/10/pizza-3000285_1280.png", items: [{ price: 20 }] },
                  { id: 3, name: "Pizza 3", imageUrl: "https://cdn.pixabay.com/photo/2017/12/05/20/10/pizza-3000285_1280.png", items: [{ price: 30 }] },
                ]}
                categoryId={2} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
