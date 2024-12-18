// app/routes/user+/_settings+/settings.two-factor.index.tsx

import { type SEOHandle } from '@nasa-gcn/remix-seo'
import {
	json,
	redirect,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { Icon } from '#app/interface/foundations/icons/icon'
import { StatusButton } from '#app/interface/shared/status-button'
import { requireUserId } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'
import { generateTOTP } from '#app/utils/totp.server.js'
import { twoFAVerificationType } from './settings.two-factor.tsx'
import { twoFAVerifyVerificationType } from './settings.two-factor.verify.tsx'

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const verification = await prisma.verification.findUnique({
		where: { target_type: { type: twoFAVerificationType, target: userId } },
		select: { id: true },
	})
	return json({ is2FAEnabled: Boolean(verification) })
}

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const { otp: _otp, ...config } = generateTOTP()
	const verificationData = {
		...config,
		type: twoFAVerifyVerificationType,
		target: userId,
	}
	await prisma.verification.upsert({
		where: {
			target_type: { target: userId, type: twoFAVerifyVerificationType },
		},
		create: verificationData,
		update: verificationData,
	})
	return redirect('/user/settings/two-factor/verify')
}

export default function TwoFactorRoute() {
	const data = useLoaderData<typeof loader>()
	const enable2FAFetcher = useFetcher<typeof action>()

	return (
		<div className="flex flex-col justify-start gap-4">
			{data.is2FAEnabled ? (
				<>
					<p className="text-lg">
						<Icon name="check">
							You have enabled two-factor authentication.
						</Icon>
					</p>
					<Link to="disable">
						<Icon name="lock-open-1">Disable 2FA</Icon>
					</Link>
				</>
			) : (
				<>
					<p>
						<Icon name="lock-open-1">
							You have not enabled two-factor authentication yet.
						</Icon>
					</p>
					<p className="text-sm">
						Two factor authentication adds an extra layer of security to your
						account. You will need to enter a code from an authenticator app
						like{' '}
						<a className="underline" href="https://1password.com/">
							1Password
						</a>{' '}
						to log in.
					</p>
					<enable2FAFetcher.Form method="POST">
						<StatusButton
							type="submit"
							name="intent"
							value="enable"
							status={enable2FAFetcher.state === 'loading' ? 'pending' : 'idle'}
							className="flex justify-start"
						>
							Enable 2FA
						</StatusButton>
					</enable2FAFetcher.Form>
				</>
			)}
		</div>
	)
}
