/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cho phép load ảnh từ domain bên ngoài trong <Image />
  images: {
    remotePatterns: [
      // Tên domain được phép load ảnh
      { hostname: 'api.mapbox.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'lh3.googleusercontent.com' },
    ],
  },
}

export default nextConfig
