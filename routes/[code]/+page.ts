import { redirect } from '@sveltejs/kit'

import type { PageLoad } from './$types'

import HttpCode from '../../shared/http/code.js'

export const load: PageLoad = async ({ params, fetch }) => {
	const response = await fetch(
		`/games/${encodeURIComponent(params.code)}/exists`
	)

	const exists = (await response.json()) as boolean
	if (!exists) throw redirect(HttpCode.TemporaryRedirect, '/')

	return {}
}
