export const categories = [
	{
		name: 'Fruits & vegetables',
		primeCategory: 'fruits-vegetables',
		subCategories: {
			parentCategory: 'fruits-vegetables',
			items: [
				{
					name: 'Fruits',
					subCategory: 'fruits',
					basicCategories: [
						{ name: 'Tropical Fruits', basicCategory: 'tropical-fruits' },
						{ name: 'Apples & Pears', basicCategory: 'apples-pears' },
						{ name: 'Citrus Fruits', basicCategory: 'citrus-fruits' },
					],
				},
				{
					name: 'Vegetables',
					subCategory: 'vegetables',
					basicCategories: [
						{ name: 'Stone fruits', basicCategory: 'stone-fruits' },
						{ name: 'Tomatoes', basicCategory: 'tomatoes' },
						{ name: 'Cabbages & Lettuces', basicCategory: 'cabbages-lettuces' },
						{ name: 'Broccoli & Cauliflowers', basicCategory: 'broccoli-cauliflowers' },
						{ name: 'Garlic, Ginger & Onions', basicCategory: 'garlic-ginger-onions' },
						{ name: 'Beans & Peas', basicCategory: 'beans-peas' },
						{ name: 'Brinjals & Gourds', basicCategory: 'brinjals-gourds' },
						{ name: 'Cucumbers & Lady Fingers', basicCategory: 'cucumbers-lady-fingers' },
						{ name: 'Potatoes & Roots', basicCategory: 'potatoes-roots' },
						{ name: 'Corns', basicCategory: 'corns' },
						{ name: 'Frozen vegetables', basicCategory: 'frozen-vegetables' },
					],
				},
			],
		},
	},
	{
		name: 'Drinks',
		primeCategory: 'drinks',
		subCategories: {
			parentCategory: 'drinks',
			items: [
				{
					name: 'Juices',
					subCategory: 'juices',
					basicCategories: [
						{ name: 'Apple juice', basicCategory: 'apple-juice' },
						{ name: 'Orange juice', basicCategory: 'orange-juice' },
					],
				},
			],
		},
	},
	{
		name: 'Rice, noodles & cooking ingredients',
		primeCategory: 'rice-noodles-cooking-ingredients',
		subCategories: {
			parentCategory: 'rice-noodles-cooking-ingredients',
			items: [
				{
					name: 'Dried food',
					subCategory: 'dried-food',
					basicCategories: [{ name: 'Beans, Seeds & Nuts', basicCategory: 'beans-seeds-nuts' }],
				},
				{
					name: 'Oil',
					subCategory: 'oil',
					basicCategories: [{ name: 'Olive oil', basicCategory: 'olive-oil' }],
				},
			],
		},
	},
	{
		name: 'Food cupboard',
		primeCategory: 'food-cupboard',
		subCategories: {
			parentCategory: 'food-cupboard',
			items: [
				{
					name: 'Canned food',
					subCategory: 'canned-food',
					basicCategories: [{ name: 'Canned Vegetables', basicCategory: 'canned-vegetables' }],
				},
			],
		},
	},
	{
		name: 'Meat & seafood',
		primeCategory: 'meat-seafood',
		subCategories: {
			parentCategory: 'meat-seafood',
			items: [
				{
					name: 'Beef & Lamb',
					subCategory: 'beef-lamb',
					basicCategories: [{ name: 'Fresh Beef & Lamb', basicCategory: 'fresh-beef-lamb' }],
				},
				{
					name: 'Fish & Seafood',
					subCategory: 'fish-seafood',
					basicCategories: [{ name: 'Fresh fish & seafood', basicCategory: 'fresh-fish-seafood' }],
				},
			],
		},
	},
	{
		name: 'Dairy, chilled & eggs',
		primeCategory: 'dairy-chilled-eggs',
		subCategories: {
			parentCategory: 'dairy-chilled-eggs',
			items: [
				{
					name: 'Eggs',
					subCategory: 'eggs',
					basicCategories: [{ name: 'Fresh eggs', basicCategory: 'fresh-eggs' }],
				},
			],
		},
	},
	{
		name: 'Beer, wine & spirits',
		primeCategory: 'beer-wine-spirits',
		subCategories: {
			parentCategory: 'beer-wine-spirits',
			items: [
				{
					name: 'Beer',
					subCategory: 'beer',
					basicCategories: [{ name: 'Lager &  pilsner', basicCategory: 'lager-and-pilsner' }],
				},
			],
		},
	},
	{
		name: 'Bakery',
		primeCategory: 'bakery',
		subCategories: {
			parentCategory: 'bakery',
			items: [
				{
					name: 'Breads',
					subCategory: 'breads',
					basicCategories: [{ name: 'Bread slice', basicCategory: 'bread-slice' }],
				},
			],
		},
	},
	{
		name: 'Frozen',
		primeCategory: 'frozen',
		subCategories: {
			parentCategory: 'frozen',
			items: [
				{
					name: 'Frozen food',
					subCategory: 'frozen-food',
					basicCategories: [{ name: 'Frozen vegetables', basicCategory: 'frozen-vegetables' }],
				},
				{
					name: 'Frozen seafood',
					subCategory: 'frozen-seafood',
					basicCategories: [{ name: 'Fresh fish seafood', basicCategory: 'fresh-fish-seafood' }],
				},
			],
		},
	},
]
