import authConfig from "../auth.config";
import NextAuth from "next-auth";
import {
  AdminRoutes,
  DEFAULT_LOGIN_REDIRECT,
  LoginOrRegisterRoutes,
  authRoutes,
} from "./utils/routes";
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isUserAdmin = isLoggedIn ? req.auth?.user.isAdmin : false;
  const isOnAdminRoutes = AdminRoutes.some((pattern) =>
    pattern.test(nextUrl.pathname)
  );
  // console.log(req.auth?.user);
  // console.log(isUserAdmin);
  // console.log(isOnAdminRoutes);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isLoginOrRegisterRoute = LoginOrRegisterRoutes.includes(
    nextUrl.pathname
  );

  if (isLoggedIn && isLoginOrRegisterRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (isAuthRoute && !isLoggedIn) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isOnAdminRoutes && !isUserAdmin) {
    return Response.redirect(new URL("/", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
