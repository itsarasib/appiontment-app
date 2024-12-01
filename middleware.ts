import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession(); //You can get an authorized user’s Kinde Auth data from any server component using the getKindeServerSession helper.
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(
      //This appends post_login_redirect_url to the search params when redirecting to Kinde Auth.
      //<LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink>
      new URL("/api/auth/login?post_login_redirect_url=/dashboard", request.url)
    );
  }
}

// See "Matching Paths" below to learn more
// url that want to be protected
export const config = {
  matcher: ["/dashboard/:path*", "/create-business"],
};
