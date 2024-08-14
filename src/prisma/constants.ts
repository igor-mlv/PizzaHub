export const categories = [
    {
        name: 'Pizzas',
    },
    {
        name: 'Breakfast',
    },
    {
        name: 'Snacks',
    },
    {
        name: 'Cocktails',
    },
    {
        name: 'Drinks',
    },
];

export const ingredients = [
    {
        name: 'Cheese Stuffed Crust',
        price: 4,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    },
    {
        name: 'Creamy Mozzarella',
        price: 1,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    },
    {
        name: 'Cheddar and Parmesan Cheese',
        price: 1,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
    },
    {
        name: 'Spicy Jalapeño',
        price: 1,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
    },
    {
        name: 'Tender Chicken',
        price: 1,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    },
    {
        name: 'Mushrooms',
        price: 1,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    },
    {
        name: 'Ham',
        price: 1,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    },
    {
        name: 'Spicy Pepperoni',
        price: 1,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
    },
    {
        name: 'Spicy Chorizo',
        price: 1,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    },
    {
        name: 'Pickles',
        price: 2,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    },
    {
        name: 'Fresh Tomatoes',
        price: 2,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    },
    {
        name: 'Red Onion',
        price: 1,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    },
    {
        name: 'Juicy Pineapples',
        price: 2,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
    },
    {
        name: 'Italian Herbs',
        price: 1,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    },
    {
        name: 'Sweet Peppers',
        price: 1,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
    },
    {
        name: 'Feta Cheese Cubes',
        price: 1,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
    },
    {
        name: 'Meatballs',
        price: 3,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
    },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
    {
        name: 'Triple Chocolate Muffin',
        imageUrl: '/assets/images/categories/breakfast/triple-chocolate-muffin.png',
        categoryId: 2,
    },
    {
        name: 'Ham and Cheese Sandwich',
        imageUrl: '/assets/images/categories/breakfast/ham-and-cheese-sandwich.png',
        categoryId: 2,
    },
    {
        name: 'Coconut Latte',
        imageUrl: '/assets/images/categories/breakfast/coconut-latte.png',
        categoryId: 2,
    },
    {
        name: 'French Fries',
        imageUrl: '/assets/images/categories/snacks/french-fries.png',
        categoryId: 3,
    },
    {
        name: 'BBQ Chicken Wings',
        imageUrl: '/assets/images/categories/snacks/bbq-chicken-wings.png',
        categoryId: 3,
    },
    {
        name: 'Chicken Nuggets',
        imageUrl: '/assets/images/categories/snacks/chicken-nuggets.png',
        categoryId: 3,
    },
    {
        name: 'Meat Pasta',
        imageUrl: '/assets/images/categories/snacks/meat-pasta.png',
        categoryId: 3,
    },
    {
        name: 'Carbonara Pasta',
        imageUrl: '/assets/images/categories/snacks/carbonara-pasta.png',
        categoryId: 3,
    },
    {
        name: 'Chocolate Milkshake',
        imageUrl: '/assets/images/categories/cocktails/chocolate-milkshake.png',
        categoryId: 4,
    },
    {
        name: 'Strawberry Milkshake',
        imageUrl: '/assets/images/categories/cocktails/strawberry-milkshake.png',
        categoryId: 4,
    },
    {
        name: 'Oreo Cookie Milkshake',
        imageUrl: '/assets/images/categories/cocktails/oreo-cookie-milkshake.png',
        categoryId: 4,
    },
    {
        name: 'Cappuccino',
        imageUrl: '/assets/images/categories/drinks/cappuccino.png',
        categoryId: 5,
    },
    {
        name: 'Hazelnut Latte',
        imageUrl: '/assets/images/categories/drinks/hazelnut-latte.png',
        categoryId: 5,
    },
    {
        name: 'Caramel Cappuccino',
        imageUrl: '/assets/images/categories/drinks/caramel-cappuccino.png',
        categoryId: 5,
    },

];
