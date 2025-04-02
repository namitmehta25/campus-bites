import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'

const order = {
  id: '123456',
  status: 'preparing', // 'placed', 'preparing', 'ready', 'completed'
  placedAt: '2024-02-20T10:30:00Z',
  estimatedTime: '15',
  items: [
    {
      id: 1,
      name: 'Masala Dosa',
      quantity: 2,
      price: 60,
      customization: 'Extra Chutney',
    },
    {
      id: 2,
      name: 'Paneer Butter Masala',
      quantity: 1,
      price: 160,
      customization: 'Extra Spicy',
    },
  ],
  total: 280,
  canteen: 'Central Cafe',
  orderType: 'takeaway',
  paymentMethod: 'UPI',
  paymentStatus: 'paid',
}

const steps = [
  { id: 1, name: 'Order Placed', status: 'complete' },
  { id: 2, name: 'Preparing', status: 'current' },
  { id: 3, name: 'Ready for Pickup', status: 'upcoming' },
  { id: 4, name: 'Completed', status: 'upcoming' },
]

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          {/* Order Header */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
              <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Placed on {new Date(order.placedAt).toLocaleString()}
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="mt-8">
            <div className="overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-purple-600 transition-all duration-500"
                style={{
                  width:
                    order.status === 'placed'
                      ? '25%'
                      : order.status === 'preparing'
                      ? '50%'
                      : order.status === 'ready'
                      ? '75%'
                      : '100%',
                }}
              />
            </div>
            <div className="mt-6 grid grid-cols-4">
              {steps.map((step) => (
                <div key={step.id} className="text-center">
                  <div className="mb-2 flex justify-center">
                    {step.status === 'complete' ? (
                      <CheckCircleIcon className="h-6 w-6 text-purple-600" />
                    ) : step.status === 'current' ? (
                      <div className="h-6 w-6 rounded-full border-2 border-purple-600 bg-white" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300 bg-white" />
                    )}
                  </div>
                  <div
                    className={`text-sm ${
                      step.status === 'complete' || step.status === 'current'
                        ? 'font-medium text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Time */}
          <div className="mt-8 rounded-lg bg-purple-50 p-4">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-purple-600" />
              <div>
                <div className="font-medium text-purple-900">Estimated Time</div>
                <div className="text-sm text-purple-700">
                  Your order will be ready in approximately {order.estimatedTime} minutes
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Instructions */}
          <div className="mt-4 rounded-lg bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900">Pickup Location</div>
                <div className="text-sm text-blue-700">
                  {order.canteen} - Please show your order ID at the counter
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <div className="font-medium">
                      {item.quantity}x {item.name}
                    </div>
                    {item.customization && (
                      <div className="text-sm text-gray-500">{item.customization}</div>
                    )}
                  </div>
                  <div className="font-medium">₹{item.price * item.quantity}</div>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)} •{' '}
                  {order.paymentMethod} • {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 