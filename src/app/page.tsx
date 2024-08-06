import { Container, Filters, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="A Slice of Everything" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">

          {/* left panel - filter */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* right panel - list of products */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              List of items
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
