import {
  ChartBarIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  ListBulletIcon,
  PlusIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Orders',
    value: '156',
    change: '+12%',
    changeType: 'positive',
    icon: ListBulletIcon,
  },
  {
    name: 'Revenue',
    value: '₹12,450',
    change: '+8%',
    changeType: 'positive',
    icon: CurrencyRupeeIcon,
  },
  {
    name: 'Avg. Preparation Time',
    value: '12 mins',
    change: '-2 mins',
    changeType: 'positive',
    icon: ClockIcon,
  },
  {
    name: 'Active Customers',
    value: '89',
    change: '+15%',
    changeType: 'positive',
    icon: UserGroupIcon,
  },
]

const activeOrders = [
  {
    id: '123456',
    customer: 'John Doe',
    items: ['2x Masala Dosa', '1x Paneer Butter Masala'],
    total: '₹280',
    status: 'preparing',
    time: '10:30 AM',
    type: 'takeaway',
  },
  {
    id: '123457',
    customer: 'Jane Smith',
    items: ['1x Chicken Biryani', '2x Lassi'],
    total: '₹220',
    status: 'ready',
    time: '10:45 AM',
    type: 'dine-in',
  },
]

const menuItems = [
  {
    id: 1,
    name: 'Masala Dosa',
    category: 'Breakfast',
    price: '₹60',
    status: 'available',
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    price: '₹160',
    status: 'available',
  },
  {
    id: 3,
    name: 'Chicken Biryani',
    category: 'Main Course',
    price: '₹180',
    status: 'out_of_stock',
  },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-x-2 rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Add Menu Item
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="rounded-lg bg-white p-6 shadow-lg">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <stat.icon className="h-6 w-6 text-purple-600" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                  <p
                    className={`text-sm ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Active Orders */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900">Active Orders</h2>
            <div className="mt-6 space-y-6">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Order #{order.id}</div>
                      <div className="text-sm text-gray-500">{order.customer}</div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === 'ready'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-600">{order.items.join(', ')}</div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {order.time} • {order.type}
                      </span>
                      <span className="font-medium">{order.total}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    {order.status === 'preparing' ? (
                      <button className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                        Mark as Ready
                      </button>
                    ) : (
                      <button className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500">
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Management */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900">Menu Items</h2>
            <div className="mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-3.5 text-left text-sm font-semibold text-gray-900">Item</th>
                    <th className="py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {menuItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4">
                        <div className="font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="py-4">
                        <div className="text-gray-500">{item.category}</div>
                      </td>
                      <td className="py-4">
                        <div className="text-gray-900">{item.price}</div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.status === 'available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.status === 'available' ? 'Available' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-sm font-medium text-purple-600 hover:text-purple-500">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 