/**
 * @BASE_URL
 * @description Base URL
 * @type {string}
 * @example
 * BASE_URL
 * @returns {string}
 */
const APP_MODE = 'development'

export const BASE_URL = APP_MODE === "development"
    ? 'http://localhost:9000'
    : 'https://benji-api.vercel.app'