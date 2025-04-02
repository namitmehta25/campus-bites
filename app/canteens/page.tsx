import { FunnelIcon, StarIcon } from '@heroicons/react/24/outline'

const cuisineTypes = [
  'All',
  'North Indian',
  'South Indian',
  'Chinese',
  'Fast Food',
  'Beverages',
]

const priceRanges = [
  { id: 'all', name: 'All' },
  { id: 'budget', name: 'Budget (₹0-100)' },
  { id: 'medium', name: 'Medium (₹100-200)' },
  { id: 'premium', name: 'Premium (₹200+)' },
]

const waitTimes = [
  { id: 'all', name: 'All' },
  { id: '0-10', name: '0-10 mins' },
  { id: '10-20', name: '10-20 mins' },
  { id: '20+', name: '20+ mins' },
]

const canteens = [
  {
    id: 1,
    name: 'Central Cafe',
    image: '/placeholder.jpg',
    cuisine: 'Multi Cuisine',
    rating: 4.5,
    reviews: 128,
    waitTime: '10-15',
    priceRange: 'Medium',
  },
  {
    id: 2,
    name: 'Tech Hub Bites',
    image: '/placeholder.jpg',
    cuisine: 'Fast Food',
    rating: 4.2,
    reviews: 89,
    waitTime: '5-10',
    priceRange: 'Budget',
  },
  {
    id: 3,
    name: 'Garden Court',
    image: '/placeholder.jpg',
    cuisine: 'North Indian',
    rating: 4.7,
    reviews: 156,
    waitTime: '15-20',
    priceRange: 'Premium',
  },
]

export default function CanteensPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Filters Section */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Canteens</h1>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              Filters
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <select className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-purple-600 sm:text-sm sm:leading-6">
              {cuisineTypes.map((cuisine) => (
                <option key={cuisine}>{cuisine}</option>
              ))}
            </select>
            <select className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-purple-600 sm:text-sm sm:leading-6">
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
            <select className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-purple-600 sm:text-sm sm:leading-6">
              {waitTimes.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Canteens Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {canteens.map((canteen) => (
            <div
              key={canteen.id}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{canteen.name}</h3>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium">{canteen.rating}</span>
                    <span className="text-sm text-gray-500">({canteen.reviews})</span>
                  </div>
                </div>
                <p className="mb-4 text-gray-600">
                  {canteen.cuisine} • {canteen.priceRange} • {canteen.waitTime} mins
                </p>
                <button className="w-full rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 