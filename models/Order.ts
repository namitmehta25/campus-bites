import mongoose from 'mongoose'

export interface IOrder extends mongoose.Document {
  user: mongoose.Types.ObjectId
  canteen: mongoose.Types.ObjectId
  items: Array<{
    item: mongoose.Types.ObjectId
    name: string
    quantity: number
    price: number
    customization?: string
  }>
  total: number
  status: 'placed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  orderType: 'takeaway' | 'dine-in'
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed'
  estimatedTime: number
  placedAt: Date
  completedAt?: Date
}

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Order must belong to a user'],
    },
    canteen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Canteen',
      required: [true, 'Order must belong to a canteen'],
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, 'Order item must reference a menu item'],
        },
        name: {
          type: String,
          required: [true, 'Please provide item name'],
        },
        quantity: {
          type: Number,
          required: [true, 'Please provide item quantity'],
          min: [1, 'Quantity must be at least 1'],
        },
        price: {
          type: Number,
          required: [true, 'Please provide item price'],
          min: [0, 'Price cannot be negative'],
        },
        customization: {
          type: String,
        },
      },
    ],
    total: {
      type: Number,
      required: [true, 'Please provide order total'],
      min: [0, 'Total cannot be negative'],
    },
    status: {
      type: String,
      enum: ['placed', 'preparing', 'ready', 'completed', 'cancelled'],
      default: 'placed',
    },
    orderType: {
      type: String,
      enum: ['takeaway', 'dine-in'],
      required: [true, 'Please specify order type'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Please provide payment method'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    estimatedTime: {
      type: Number,
      required: [true, 'Please provide estimated preparation time'],
      min: [0, 'Estimated time cannot be negative'],
    },
    placedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Add index for better query performance
orderSchema.index({ user: 1, createdAt: -1 })
orderSchema.index({ canteen: 1, status: 1 })

// Calculate loyalty points after order completion
orderSchema.post('save', async function (doc) {
  if (doc.status === 'completed' && doc.paymentStatus === 'paid') {
    const User = mongoose.model('User')
    const pointsEarned = Math.floor(doc.total / 10) // 1 point for every ₹10 spent
    await User.findByIdAndUpdate(doc.user, {
      $inc: { loyaltyPoints: pointsEarned },
    })
  }
})

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema) 