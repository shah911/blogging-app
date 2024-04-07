/**
 *an array of routes that can be accessed by the user without authentication.
 * @type {string[]}
 */

export const publicRoutes = ["/", "/about", "/blog"];

/**
 *an array of routes that can't be accessed by the user without authentication and they will be redirected to /login
 * @type {string[]}
 */

export const authRoutes = ["/post"];

/**
 *The prefix for API authentication routes
 *routes that start with this prefix are used for authentication purpose
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 *The default route where the user will be redirected after successfull login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/post";

/**
 *an array of routes that can't be accessed by the user after authentication.
 * @type {string[]}
 */

export const LoginOrRegisterRoutes = ["/login", "/register"];

/**
 *an array of routes that can't be accessed by the user even after authentication, it require admin previliges.
 * @type {string[]}
 */

export const AdminRoutes = [/^\/edit\/.*/];
