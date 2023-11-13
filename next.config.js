/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        BEARER_TOKEN: process.env.BEARER_TOKEN,
        CYCLIC_URL: process.env.CYCLIC_URL
    }
}

module.exports = nextConfig
