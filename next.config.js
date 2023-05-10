/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // BASE_URL: "",
    //MONGODB_URL:YOUR MONGODB URL,
    //TOKEN_SECRET: YOUR TOKEN SECRET,
    //STRIPE_PUBLISHABLE_KEY:YOUR STRIPE PUBLISHABLE KEY,
    //STRIPE_SECRET_KEY: YOUR STRIPE SECRET KEY,
    //STRIPE_ENDPOINT_SECRET:YOUR STRIPE ENDPOINT SECRET FOR WEBHOOK,
    //CLOUD_NAME: YOUR CLOUDINARY NAME,
    //CLOUD_API_KEY: YOUR CLOUDINARY API KEY,
    //CLOUD_API_SECRET: YOUR CLOUDINARY API SECRET,
    //CLOUD_PRESET_UPDATE: YOUR CLOUDINARY PRESET,
    //CLOUD_API: YOUR CLOUDINARY API NAME,
  },
  images: {
    domains: ["res.cloudinary.com", "img.freepik.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
