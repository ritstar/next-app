/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        BEARER_TOKEN: process.env.BEARER_TOKEN
    }
}

module.exports = nextConfig
