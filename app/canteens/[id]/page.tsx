import { StarIcon, ClockIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline'

const canteen = {
  id: 1,
  name: 'Central Cafe',
  image: '/placeholder.jpg',
  cuisine: 'Multi Cuisine',
  rating: 4.5,
  reviews: 128,
  waitTime: '10-15',
  priceRange: 'Medium',
  description: 'Serving delicious multi-cuisine food with a focus on quality and taste.',
}

const categories = [
  {
    id: 1,
    name: 'Breakfast',
    items: [
      {
        id: 1,
        name: 'Masala Dosa',
        description: 'Crispy dosa served with sambar and chutney',
        price: 60,
        image: '/placeholder.jpg',
        isVeg: true,
        customization: ['Extra Chutney', 'Extra Sambar'],
      },
      {
        id: 2,
        name: 'Poha',
        description: 'Light and fluffy flattened rice with peanuts and herbs',
        price: 40,
        image: '/placeholder.jpg',
        isVeg: true,
        customization: ['Extra Peanuts', 'Spicy'],
      },
    ],
  },
  {
    id: 2,
    name: 'Main Course',
    items: [
      {
        id: 3,
        name: 'Paneer Butter Masala',
        description: 'Rich and creamy paneer curry',
        price: 160,
        image: '/placeholder.jpg',
        isVeg: true,
        customization: ['Extra Gravy', 'Spicy', 'Extra Paneer'],
      },
      {
        id: 4,
        name: 'Chicken Biryani',
        description: 'Aromatic rice dish with tender chicken pieces',
        price: 180,
        image: '/placeholder.jpg',
        isVeg: false,
        customization: ['Extra Raita', 'Extra Spicy', 'Boneless'],
      },
    ],
  },
]

export default function CanteenMenuPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Canteen Header */}
      <div className="relative h-64 bg-gray-900">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="relative text-white">
              <h1 className="text-3xl font-bold">{canteen.name}</h1>
              <p className="mt-2 text-lg">{canteen.description}</p>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span>{canteen.rating}</span>
                  <span className="text-gray-300">({canteen.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-5 w-5" />
                  <span>{canteen.waitTime} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <CurrencyRupeeIcon className="h-5 w-5" />
                  <span>{canteen.priceRange}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id}>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">{category.name}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1"
                  >
                    <div className="h-48 bg-gray-200" />
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div
                          className={`h-4 w-4 rounded-full border ${
                            item.isVeg ? 'border-green-500' : 'border-red-500'
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full ${
                              item.isVeg ? 'bg-green-500' : 'bg-red-500'
                            } m-0.5`}
                          />
                        </div>
                      </div>
                      <p className="mb-2 text-sm text-gray-600">{item.description}</p>
                      <div className="mb-4 flex items-center gap-2">
                        <CurrencyRupeeIcon className="h-4 w-4" />
                        <span className="font-semibold">₹{item.price}</span>
                      </div>
                      <button className="w-full rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                        Add to Cart
                      </button>
                      {item.customization && item.customization.length > 0 && (
                        <div className="mt-2">
                          <select className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-purple-600 sm:text-sm sm:leading-6">
                            <option value="">Customize</option>
                            {item.customization.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 