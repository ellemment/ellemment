import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react';
import { AccountLayout } from '#app/ellemment-ui/components/account/account-layout';
import { checkAdminStatus } from '#app/utils/adminstatus.js'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { getTheme } from '#app/utils/theme.server.js'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  const { isAdmin } = await checkAdminStatus(request)
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: { select: { id: true } },
      createdAt: true,
      content: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  })
  const userPreference = getTheme(request)
  return json({ user, isAdmin, userPreference })
}

export default function AccountLayoutRoute() {
  const data = useLoaderData<typeof loader>()
  const { user, userPreference } = data
  return (
    <AccountLayout user={user} userPreference={userPreference}>
      <Outlet />
    </AccountLayout>
  );
}