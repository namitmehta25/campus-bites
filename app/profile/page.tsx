import { CreditCardIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder-avatar.jpg',
  loyaltyPoints: 150,
}

const orderHistory = [
  {
    id: '123456',
    date: '2024-02-20T10:30:00Z',
    canteen: 'Central Cafe',
    items: ['2x Masala Dosa', '1x Paneer Butter Masala'],
    total: 280,
    status: 'completed',
  },
  {
    id: '123455',
    date: '2024-02-19T12:45:00Z',
    canteen: 'Tech Hub Bites',
    items: ['1x Chicken Biryani', '2x Lassi'],
    total: 220,
    status: 'completed',
  },
]

const savedPaymentMethods = [
  {
    id: 1,
    type: 'UPI',
    details: 'john.doe@upi',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Card',
    details: '**** **** **** 1234',
    isDefault: false,
  },
]

const notificationPreferences = [
  {
    id: 'order_updates',
    name: 'Order Updates',
    description: 'Get notified about your order status',
    enabled: true,
  },
  {
    id: 'offers',
    name: 'Offers & Promotions',
    description: 'Receive updates about special offers and discounts',
    enabled: true,
  },
  {
    id: 'loyalty',
    name: 'Loyalty Program',
    description: 'Get updates about your loyalty points and rewards',
    enabled: false,
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2 inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                {user.loyaltyPoints} Loyalty Points
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
              <div className="mt-6 space-y-6">
                {orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Order #{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleString()}
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-600">{order.canteen}</div>
                      <div className="mt-1 text-sm text-gray-500">{order.items.join(', ')}</div>
                    </div>
                    <div className="mt-2 text-sm font-medium">₹{order.total}</div>
                    <button className="mt-2 text-sm font-medium text-purple-600 hover:text-purple-500">
                      Reorder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-8">
            {/* Payment Methods */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                <button className="text-sm font-medium text-purple-600 hover:text-purple-500">
                  Add New
                </button>
              </div>
              <div className="mt-6 space-y-4">
                {savedPaymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCardIcon className="h-6 w-6 text-gray-400" />
                      <div>
                        <div className="font-medium">{method.type}</div>
                        <div className="text-sm text-gray-500">{method.details}</div>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="text-xs text-gray-500">Default</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <div className="mt-6 space-y-4">
                {notificationPreferences.map((pref) => (
                  <div key={pref.id} className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{pref.name}</div>
                      <div className="text-sm text-gray-500">{pref.description}</div>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        defaultChecked={pref.enabled}
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 