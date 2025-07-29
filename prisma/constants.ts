export const seedCategories = [
    {
        name: "Пиццы",
    },
    {
        name: "Завтрак",
    },
    {
        name: "Закуски",
    },
    {
        name: "Коктейли",
    },
    {
        name: "Напитки",
    },
]

export const seedIngredients = [
    {
        name: 'Сырный бортик',
        price: 179,
        imageUrl: '/images/ingredients/cheeseBorder.png',
    },
    {
        name: 'Сливочная моцарелла',
        price: 79,
        imageUrl: '/images/ingredients/creamyMozzarella.png',
    },
    {
        name: 'Сыры чеддер и пармезан',
        price: 79,
        imageUrl: '/images/ingredients/cheddarAndParmesanCheeses.png',
    },
    {
        name: 'Острый перец халапеньо',
        price: 59,
        imageUrl: '/images/ingredients/jalapeno.png',
    },
    {
        name: 'Нежный цыпленок',
        price: 79,
        imageUrl: '/images/ingredients/chicken.png',
    },
    {
        name: 'Шампиньоны',
        price: 59,
        imageUrl: '/images/ingredients/champions.png',
    },
    {
        name: 'Ветчина',
        price: 79,
        imageUrl: '/images/ingredients/ham.png',
    },
    {
        name: 'Пикантная пепперони',
        price: 79,
        imageUrl: '/images/ingredients/pepperoni.png',
    },
    {
        name: 'Острая чоризо',
        price: 79,
        imageUrl: '/images/ingredients/chorizo.png',
    },
    {
        name: 'Маринованные огурчики',
        price: 59,
        imageUrl: '/images/ingredients/cucumber.png',
    },
    {
        name: 'Свежие томаты',
        price: 59,
        imageUrl: '/images/ingredients/tomato.png',
    },
    {
        name: 'Красный лук',
        price: 59,
        imageUrl: '/images/ingredients/onion.png',
    },
    {
        name: 'Сочные ананасы',
        price: 59,
        imageUrl: '/images/ingredients/pineapple.png',
    },
    {
        name: 'Итальянские травы',
        price: 39,
        imageUrl: '/images/ingredients/italianHerbs.png',
    },
    {
        name: 'Сладкий перец',
        price: 59,
        imageUrl: '/images/ingredients/sweetPepper.png',
    },
    {
        name: 'Кубики брынзы',
        price: 79,
        imageUrl: '/images/ingredients/cheeseСubes.png',
    },
    {
        name: 'Митболы',
        price: 79,
        imageUrl: '/images/ingredients/meatball.png',
    },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const seedProducts = [
    {
        name: 'Омлет с ветчиной и грибами',
        imageUrl: '/images/products/omeletteWithHamAndMushrooms.webp',
        categoryId: 2,
    },
    {
        name: 'Омлет с пепперони',
        imageUrl: '/images/products/omeletteWithPepperoni.webp',
        categoryId: 2,
    },
    {
        name: 'Кофе Латте',
        imageUrl: '/images/products/coffeeLatte.webp',
        categoryId: 2,
    },
    {
        name: 'Дэнвич ветчина и сыр',
        imageUrl: '/images/products/sandwichHamAndCheese.webp',
        categoryId: 3,
    },
    {
        name: 'Куриные наггетсы',
        imageUrl: '/images/products/chickenNuggets.webp',
        categoryId: 3,
    },
    {
        name: 'Картофель из печи с соусом 🌱',
        imageUrl: '/images/products/ovenBakedPotatoesWithSauce.webp',
        categoryId: 3,
    },
    {
        name: 'Додстер',
        imageUrl: '/images/products/dodster.webp',
        categoryId: 3,
    },
    {
        name: 'Острый Додстер 🌶️🌶️',
        imageUrl: '/images/products/hotDodster.webp',
        categoryId: 3,
    },
    {
        name: 'Банановый молочный коктейль',
        imageUrl: '/images/products/bananaMilkshake.webp',
        categoryId: 4,
    },
    {
        name: 'Карамельное яблоко молочный коктейль',
        imageUrl: '/images/products/caramelAppleMilkshake.webp',
        categoryId: 4,
    },
    {
        name: 'Молочный коктейль с печеньем Орео',
        imageUrl: '/images/products/oreoCookieMilkshake.webp',
        categoryId: 4,
    },
    {
        name: 'Классический молочный коктейль 👶',
        imageUrl: '/images/products/classicMilkshake.webp',
        categoryId: 4,
    },
    {
        name: 'Ирландский Капучино',
        imageUrl: '/images/products/irishCappuccino.webp',
        categoryId: 5,
    },
    {
        name: 'Кофе Карамельный капучино',
        imageUrl: '/images/products/coffeeCaramelCappuccino.webp',
        categoryId: 5,
    },
    {
        name: 'Кофе Кокосовый латте',
        imageUrl: '/images/products/coffeeCoconutLatte.webp',
        categoryId: 5,
    },
    {
        name: 'Кофе Американо',
        imageUrl: '/images/products/americanoCoffee.webp',
        categoryId: 5,
    },
]