/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  experimental: {
    typedRoutes: false
  }
};

export default nextConfig;
