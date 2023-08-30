/** @type {import('next').NextConfig} */

const withShutdown = require('./withShutdown')
const nextConfig = {}

module.exports = withShutdown(nextConfig)
