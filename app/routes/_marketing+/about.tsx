import { ScrollExperience } from '#app/ellemment-ui/composite/keynote/scroll-ux.js'
import { type Sequence } from '#app/utils/md/scroll/mdslides.server.js'

export default function AboutRoute() {
	const mutations = {
		type: 'sequence',
			slides: [
				{
					type: 'slide',
					subject: `<div>Example mutation slide 1</div>`,
					html: `<div>Example mutation slide 1</div>`,
				},
				{
					type: 'slide',
					subject: `<div>Example mutation slide 2</div>`,
					html: `<div>Example mutation slide 2</div>`,
				},
			],
	} satisfies Sequence

	const errors = {
		type: 'sequence',
			slides: [
				{
					type: 'slide',
					subject: `<div>Example error slide 1</div>`,
					html: `<div>Example error slide 1</div>`,
				},
				{
					type: 'slide',
					subject: `<div>Example error slide 2</div>`,
					html: `<div>Example error slide 2</div>`,
				},
			],
	} satisfies Sequence

	return (
		<div className="min-h-screen bg-background">
			<ScrollExperience
				mutations={mutations}
				errors={errors}
			/>
		</div>
	)
}
