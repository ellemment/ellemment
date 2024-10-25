// #app/utils/editor/data/useRootData.ts

import { json } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import { getUserInfo, type UserSession } from "#app/utils/editor/utils/session.server";

export type AppRootData = {
  title: string;
  userSession: UserSession;
  debug: boolean;
};

export function useRootData(): AppRootData {
  return (useMatches().find((f) => f.pathname === "/" || f.pathname === "")?.data ?? {}) as AppRootData;
}

export async function loadRootData(request: Request) {
  const userInfo = await getUserInfo(request);

  const data: AppRootData = {
    title: `${process.env.APP_NAME}`,
    userSession: userInfo,
    debug: process.env.NODE_ENV === "development",
  };

  return json(data);
}
