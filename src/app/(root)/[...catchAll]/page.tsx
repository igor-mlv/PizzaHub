import { Container, Title } from "@/shared/components";
import Image from "next/image";

export default function NotFound() {
    return (
        <Container className="mt-10 flex flex-col items-center gap-[100px]">
            <Title text="404 - Page Not Found" size="lg" className="font-extrabold" />

            <Image src="/assets/images/not-found.png" alt="Empty cart" width={300} height={600} />
        </Container>
    )
}