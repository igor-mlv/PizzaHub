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
            '/assets/images/ingredients/cheese-stuffed-crust.png',
    },
    {
        name: 'Creamy Mozzarella',
        price: 1,
        imageUrl:
            '/assets/images/ingredients/creamy-mozzarella.png',
    },
    {
        name: 'Cheddar and Parmesan Cheese',
        price: 1,
        imageUrl: '/assets/images/ingredients/cheddar-and-parmesan-cheese.png',
    },
    {
        name: 'Spicy Jalapeño',
        price: 1,
        imageUrl:
            '/assets/images/ingredients/spicy-jalapeno.png',
    },
    {
        name: 'Tender Chicken',
        price: 1,
        imageUrl: '/assets/images/ingredients/tender-chicken.png',
    },
    {
        name: 'Mushrooms',
        price: 1,
        imageUrl: '/assets/images/ingredients/mushrooms.png',
    },
    {
        name: 'Ham',
        price: 1,
        imageUrl: '/assets/images/ingredients/ham.png',
    },
    {
        name: 'Spicy Pepperoni',
        price: 1,
        imageUrl: '/assets/images/ingredients/spicy-pepperoni.png',
    },
    {
        name: 'Spicy Chorizo',
        price: 1,
        imageUrl: '/assets/images/ingredients/spicy-chorizo.png',
    },
    {
        name: 'Pickles',
        price: 2,
        imageUrl: '/assets/images/ingredients/pickles.png',
    },
    {
        name: 'Fresh Tomatoes',
        price: 2,
        imageUrl: '/assets/images/ingredients/fresh-tomatoes.png',
    },
    {
        name: 'Red Onion',
        price: 1,
        imageUrl: '/assets/images/ingredients/red-onion.png',
    },
    {
        name: 'Juicy Pineapples',
        price: 2,
        imageUrl: '/assets/images/ingredients/juicy-pineapples.png',
    },
    {
        name: 'Italian Herbs',
        price: 1,
        imageUrl:
            '/assets/images/ingredients/italian-herbs.png',
    },
    {
        name: 'Sweet Peppers',
        price: 1,
        imageUrl: '/assets/images/ingredients/sweet-peppers.png',
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
