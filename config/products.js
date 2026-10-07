/**
 * Food Expert - Centralized Product Catalog
 * This file serves as the single source of truth for all menu and offer items.
 */

export const products = [
  // --- BUCKET OFFERS ---
  {
    id: "prod-bucket-1",
    name: "Crispy Family Mega Bucket",
    slug: "crispy-family-mega-bucket",
    category: "bucket-offer",
    description: "12 pcs secret-recipe spiced crispy chicken drumsticks & thighs, served with 2 artisan garlic dips and seasoned fries.",
    image: "/images/products/bucket_crispy_feast.jpg",
    price: 34.99,
    offerPrice: 27.99,
    discount: 20,
    available: true,
    featured: true,
    displayOrder: 1
  },
  {
    id: "prod-bucket-2",
    name: "Golden Duo Feast Bucket",
    slug: "golden-duo-feast-bucket",
    category: "bucket-offer",
    description: "6 pcs golden crispy chicken, 1 large Cajun potato wedges, 2 soft brioche dinner rolls, and signature smoky BBQ sauce.",
    image: "/images/products/bucket_crispy_feast.jpg",
    price: 21.99,
    offerPrice: 17.50,
    discount: 20,
    available: true,
    featured: true,
    displayOrder: 2
  },
  {
    id: "prod-bucket-3",
    name: "Supreme Tenders & Wings Bucket",
    slug: "supreme-tenders-wings-bucket",
    category: "bucket-offer",
    description: "10 pcs crunchy buttermilk chicken tenders, 8 fiery glazed wings, with ranch, honey mustard, and sweet chili sauces.",
    image: "/images/products/bucket_crispy_feast.jpg",
    price: 29.99,
    offerPrice: 24.99,
    discount: 17,
    available: true,
    featured: false,
    displayOrder: 3
  },
  {
    id: "prod-bucket-4",
    name: "Party Crunch Bonanza Bucket",
    slug: "party-crunch-bonanza-bucket",
    category: "bucket-offer",
    description: "18 pcs mixed crispy pieces, double fries, 4 dipping sauces, and 4 refreshing juices. Perfect for game nights and gatherings.",
    image: "/images/banners/hero_food_expert_spread.jpg",
    price: 48.00,
    offerPrice: 39.99,
    discount: 16,
    available: true,
    featured: true,
    displayOrder: 4
  },

  // --- JUICE ITEMS ---
  {
    id: "prod-juice-1",
    name: "Tropical Mango Passion Breeze",
    slug: "tropical-mango-passion-breeze",
    category: "juice-items",
    description: "Hand-pulped Alphonso mangoes, fresh tangy passion fruit, wild mint leaves, and a splash of natural lime juice over crushed ice.",
    image: "/images/products/juice_fresh_tropical.jpg",
    price: 5.99,
    offerPrice: 4.99,
    discount: 17,
    available: true,
    featured: true,
    displayOrder: 1
  },
  {
    id: "prod-juice-2",
    name: "Citrus Sunrise Burst",
    slug: "citrus-sunrise-burst",
    category: "juice-items",
    description: "Freshly cold-pressed Valencia oranges, Ruby Red grapefruit, lemon nectar, and crushed ice for an electrifying morning lift.",
    image: "/images/products/juice_fresh_tropical.jpg",
    price: 4.99,
    offerPrice: null,
    discount: 0,
    available: true,
    featured: false,
    displayOrder: 2
  },
  {
    id: "prod-juice-3",
    name: "Wild Berry Cooler",
    slug: "wild-berry-cooler",
    category: "juice-items",
    description: "Muddled ripe blackberries, mountain blueberries, strawberries, and sparkling mineral water with fresh basil garnish.",
    image: "/images/products/juice_fresh_tropical.jpg",
    price: 5.49,
    offerPrice: null,
    discount: 0,
    available: true,
    featured: true,
    displayOrder: 3
  },
  {
    id: "prod-juice-4",
    name: "Emerald Crisp Green Detox",
    slug: "emerald-crisp-green-detox",
    category: "juice-items",
    description: "Crisp Granny Smith apples, garden cucumber, baby spinach, fresh root ginger, and zesty Key lime.",
    image: "/images/products/juice_fresh_tropical.jpg",
    price: 5.25,
    offerPrice: null,
    discount: 0,
    available: true,
    featured: false,
    displayOrder: 4
  },

  // --- SNACKS ITEMS ---
  {
    id: "prod-snack-1",
    name: "Truffle & Herb Loaded Fries",
    slug: "truffle-herb-loaded-fries",
    category: "snacks-items",
    description: "Crispy double-cooked skin-on potatoes dusted with Italian white truffle oil, rosemary sea salt, and parmesan garlic aioli.",
    image: "/images/products/snacks_loaded_bites.jpg",
    price: 7.99,
    offerPrice: 6.49,
    discount: 18,
    available: true,
    featured: true,
    displayOrder: 1
  },
  {
    id: "prod-snack-2",
    name: "Crispy Buttermilk Slider Trio",
    slug: "crispy-buttermilk-slider-trio",
    category: "snacks-items",
    description: "Three toasted brioche mini buns filled with spiced buttermilk chicken breast, dill pickles, and creamy house slaw.",
    image: "/images/products/snacks_loaded_bites.jpg",
    price: 11.99,
    offerPrice: 9.99,
    discount: 16,
    available: true,
    featured: true,
    displayOrder: 2
  },
  {
    id: "prod-snack-3",
    name: "Golden Smoked Mozzarella Sticks",
    slug: "golden-smoked-mozzarella-sticks",
    category: "snacks-items",
    description: "Six hand-breaded artisan mozzarella sticks with herbs, deep-fried to stretchy perfection, served with warm marinara.",
    image: "/images/products/snacks_loaded_bites.jpg",
    price: 6.99,
    offerPrice: null,
    discount: 0,
    available: true,
    featured: false,
    displayOrder: 3
  },
  {
    id: "prod-snack-4",
    name: "Fiery Buffalo Popcorn Crunch",
    slug: "fiery-buffalo-popcorn-crunch",
    category: "snacks-items",
    description: "Bite-sized marinated chicken tenders tossed in tangy cayenne buffalo sauce, paired with buttermilk herb dip.",
    image: "/images/products/snacks_loaded_bites.jpg",
    price: 8.49,
    offerPrice: null,
    discount: 0,
    available: true,
    featured: false,
    displayOrder: 4
  }
];

export const categories = [
  {
    id: "bucket-offer",
    name: "Bucket Offer",
    slug: "bucket-offer",
    description: "Generous crispy golden chicken buckets and feast combos designed for sharing.",
    image: "/images/products/bucket_crispy_feast.jpg",
    active: true,
    displayOrder: 1
  },
  {
    id: "juice-items",
    name: "Juice Items",
    slug: "juice-items",
    description: "Freshly pressed natural fruit juices, iced coolers, and tropical refreshers.",
    image: "/images/products/juice_fresh_tropical.jpg",
    active: true,
    displayOrder: 2
  },
  {
    id: "snacks-items",
    name: "Snacks Items",
    slug: "snacks-items",
    description: "Crisp hand-cut fries, savory sliders, cheese sticks, and spicy tender bites.",
    image: "/images/products/snacks_loaded_bites.jpg",
    active: true,
    displayOrder: 3
  }
];
