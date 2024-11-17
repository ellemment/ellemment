// app/routes/user+/_settings+/settings.two-factor.tsx

import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { Outlet } from '@remix-run/react'
import { Icon } from '#app/ellemment-ui/foundations/icons/icon'
import { type VerificationTypes } from '#app/routes/_auth+/verify.tsx'
import { type BreadcrumbHandle } from './settings.tsx'

export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="lock-closed">2FA</Icon>,
	getSitemapEntries: () => null,
}

export const twoFAVerificationType = '2fa' satisfies VerificationTypes

export default function TwoFactorRoute() {
	return <Outlet />
}
