import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

const cartItems = [
  {
    id: 1,
    name: 'Masala Dosa',
    price: 60,
    quantity: 2,
    customization: 'Extra Chutney',
    canteen: 'Central Cafe',
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    price: 160,
    quantity: 1,
    customization: 'Extra Spicy',
    canteen: 'Central Cafe',
  },
]

const paymentMethods = [
  { id: 'upi', name: 'UPI', description: 'Pay using any UPI app' },
  { id: 'card', name: 'Card', description: 'Credit or Debit card' },
  { id: 'wallet', name: 'Wallet', description: 'Pay using digital wallet' },
]

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.canteen}</p>
                    {item.customization && (
                      <p className="text-sm text-gray-500">{item.customization}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-full bg-gray-100 p-1 hover:bg-gray-200">
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button className="rounded-full bg-gray-100 p-1 hover:bg-gray-200">
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="w-20 text-right">
                      <div className="font-semibold">₹{item.price * item.quantity}</div>
                      <div className="text-sm text-gray-500">₹{item.price} each</div>
                    </div>
                    <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Order Type */}
              <div className="mt-6">
                <h3 className="font-semibold">Order Type</h3>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="orderType" value="takeaway" className="text-purple-600" />
                    <span>Takeaway</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="orderType" value="dineIn" className="text-purple-600" />
                    <span>Dine-in</span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="font-semibold">Payment Method</h3>
                <div className="mt-2 space-y-2">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        className="text-purple-600"
                      />
                      <div>
                        <div>{method.name}</div>
                        <div className="text-sm text-gray-500">{method.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button className="mt-6 w-full rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 