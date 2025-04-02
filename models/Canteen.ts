import mongoose from 'mongoose'

export interface ICanteen extends mongoose.Document {
  name: string
  description: string
  image: string
  cuisine: string[]
  rating: number
  reviews: number
  waitTime: string
  priceRange: 'Budget' | 'Medium' | 'Premium'
  menu: Array<{
    category: string
    items: Array<{
      name: string
      description: string
      price: number
      image: string
      isVeg: boolean
      customization?: string[]
      status: 'available' | 'out_of_stock'
    }>
  }>
  operatingHours: {
    open: string
    close: string
  }
  location: string
}

const canteenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a canteen name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    cuisine: {
      type: [String],
      required: [true, 'Please provide cuisine types'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    reviews: {
      type: Number,
      default: 0,
    },
    waitTime: {
      type: String,
      required: [true, 'Please provide estimated wait time'],
    },
    priceRange: {
      type: String,
      enum: ['Budget', 'Medium', 'Premium'],
      required: [true, 'Please provide price range'],
    },
    menu: [
      {
        category: {
          type: String,
          required: [true, 'Please provide menu category'],
        },
        items: [
          {
            name: {
              type: String,
              required: [true, 'Please provide item name'],
            },
            description: {
              type: String,
              required: [true, 'Please provide item description'],
            },
            price: {
              type: Number,
              required: [true, 'Please provide item price'],
              min: [0, 'Price cannot be negative'],
            },
            image: {
              type: String,
              required: [true, 'Please provide item image URL'],
            },
            isVeg: {
              type: Boolean,
              required: [true, 'Please specify if item is vegetarian'],
            },
            customization: {
              type: [String],
              default: [],
            },
            status: {
              type: String,
              enum: ['available', 'out_of_stock'],
              default: 'available',
            },
          },
        ],
      },
    ],
    operatingHours: {
      open: {
        type: String,
        required: [true, 'Please provide opening time'],
      },
      close: {
        type: String,
        required: [true, 'Please provide closing time'],
      },
    },
    location: {
      type: String,
      required: [true, 'Please provide canteen location'],
    },
  },
  {
    timestamps: true,
  }
)

// Add index for search functionality
canteenSchema.index({ name: 'text', cuisine: 'text', 'menu.items.name': 'text' })

export default mongoose.models.Canteen || mongoose.model<ICanteen>('Canteen', canteenSchema) 