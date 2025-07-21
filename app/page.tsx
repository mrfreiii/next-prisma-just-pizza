import {
    Container,
    Title,
    TopBar,
    Filters,
    ProductsGroupList
} from "@/components/shared";

export default function Home() {
    return (
        <>
            <Container className={"mt-10"}>
                <Title text={"Все пиццы"} size={"lg"} className={"font-extrabold"}/>
            </Container>

            <TopBar/>

            <Container className={"mt-10 pb-14"}>
                <div className={"flex gap-[80px]"}>

                    {/*Фильтрация*/}
                    <div className={"w-[250px]"}>
                        <Filters/>
                    </div>

                    {/*Список товаров*/}
                    <div className={"flex-1"}>
                        <div className={"flex flex-col gap-16"}>
                            <ProductsGroupList
                                title={"Пиццы"}
                                categoryId={1}
                                items={[
                                    {
                                        id: 1,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 2,

                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 3,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 4,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 5,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 6,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 7,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                ]}
                            />

                            <ProductsGroupList
                                title={"Комбо"}
                                categoryId={2}
                                items={[
                                    {
                                        id: 1,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 2,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 3,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 4,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 5,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 6,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                    {
                                        id: 7,
                                        name: "Цыпленок Ранч",
                                        items: [{price: 479}],
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11ef4feddf588b4ea7493ba40fdf934c.avif"
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
