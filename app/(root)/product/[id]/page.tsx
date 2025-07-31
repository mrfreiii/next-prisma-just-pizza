import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container, PizzaImage, Title } from "@/shared/components/shared";
import { GroupVariants } from "@/shared/components/shared/group-variants";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            variants: true,
                        }
                    }
                }
            },
            variants: true,
        }
    });

    if(!product){
        return notFound()
    }

    return (
        <Container className={"flex flex-col my-10"}>
            <div className={"flex flex-1"}>
                <PizzaImage imageUrl={product.imageUrl} size={20}/>

                <div className={"w-[490px] bg-[#F7F6F5] p-7"}>
                    <Title text={product.name} size={"md"} className={"font-extrabold mb-1"}/>

                    <p className={"text-gray-400"}>Описание состава продукта</p>

                    <GroupVariants
                        value={"2"}
                        items={[
                            { name: "Маленькая", value: "1" },
                            { name: "Средняя", value: "2" },
                            { name: "Большая", value: "3", disabled: true },
                        ]}
                    />
                </div>
            </div>
        </Container>
    )
}