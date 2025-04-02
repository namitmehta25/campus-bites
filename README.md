# Campus Bites 🍽️

A modern food pre-ordering platform for campus canteens, built with Next.js 13, TypeScript, and Three.js.

## Features 🌟

- **Pre-order System**: Order food in advance from your favorite campus canteens
- **Real-time Updates**: Track your order status and estimated preparation time
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Beautiful UI that works seamlessly across all devices
- **Interactive 3D Elements**: Engaging user experience with Three.js animations
- **Dark Mode Support**: Comfortable viewing experience in any lighting condition

## Tech Stack 💻

- **Frontend**:
  - Next.js 13 (App Router)
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Three.js
  - React Three Fiber

- **Backend**:
  - MongoDB
  - NextAuth.js
  - Node.js

## Getting Started 🚀

### Prerequisites

- Node.js 18.x or later
- MongoDB database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/campus-bites.git
cd campus-bites
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
# Application
NEXT_PUBLIC_APP_NAME="Campus Bites"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_DESCRIPTION="Pre-order food from your favorite campus canteens. Fast, reliable delivery for college students with exclusive deals and loyalty rewards."

# Theme
NEXT_PUBLIC_THEME_COLOR="#7e22ce"

# SEO
NEXT_PUBLIC_TWITTER_HANDLE="@campusbites"
NEXT_PUBLIC_SITE_NAME="Campus Bites"

# Authentication
JWT_SECRET="your-secret-key-change-this-in-production"

# API URLs
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Database
MONGODB_URI="your-mongodb-connection-string"
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure 📁

```
food-preorder/
├── app/                   # Next.js 13 app directory
│   ├── api/              # API routes
│   ├── components/       # Shared components
│   └── ...              # Other app routes
├── components/           # React components
├── lib/                  # Utility functions and libraries
├── public/              # Static assets
└── styles/              # Global styles
```

## Key Features in Detail 🔍

### User Authentication
- Secure JWT-based authentication
- Email verification
- Password reset functionality
- Protected routes

### Canteen Management
- Browse available canteens
- View menus and prices
- Check preparation times
- Real-time availability updates

### Order System
- Place and track orders
- Customize orders
- Schedule pickup times
- Order history

### UI/UX Features
- Smooth animations with Framer Motion
- Interactive 3D elements with Three.js
- Responsive design for all screen sizes
- Loading states and error handling

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Three.js community for 3D graphics support
- All contributors and supporters of the project

## Contact 📧

- Project Link: [https://github.com/yourusername/campus-bites](https://github.com/yourusername/campus-bites)
- Website: [https://campusbites.com](https://campusbites.com)

---

Made with ❤️ for campus communities
