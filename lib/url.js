/**
 * @BASE_URL
 * @description Base URL
 * @type {string}
 * @example
 * BASE_URL
 * @returns {string}
 */
const APP_MODE = 'dev'

export const BASE_URL = APP_MODE === "dev"
    ? 'http://192.168.100.159:5000/api'
    : 'https://benji-api.vercel.app'

export const DOMAIN_URL = APP_MODE === "dev"
    ? 'http://localhost:3000'
    : 'https://benji.vercel.app'