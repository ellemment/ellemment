import { createCookieSessionStorage, redirect } from "@remix-run/node";

export type UserSession = {
  lightOrDarkMode: string;
  // Add any other properties that should be part of the user session
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userSession: UserSession, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userSession", userSession);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request): Promise<UserSession | null> {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userSession = session.get("userSession");
  if (!userSession) {
    return null;
  }
  return userSession;
}

export async function getUserInfo(request: Request): Promise<UserSession> {
  const userSession = await getUserSession(request);
  if (userSession) {
    return userSession;
  }
  return {
    lightOrDarkMode: "dark",
    // Set default values for any other properties in UserSession
  };
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
