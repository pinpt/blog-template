import { fetchAnalytics, fetchContentPaginated, fetchSiteWithContentCount } from '@pinpt/react';
import config from '../../pinpoint.config';
import EntriesPage, { IEntriesPageProps } from '../../components/EntriesPage';

const Page = (props: IEntriesPageProps) => <EntriesPage {...props} />;

export default Page;

export async function getStaticPaths() {
	const { count } = await fetchSiteWithContentCount(config);
	const pages = Math.ceil(count / config.pageSize);
	const paths = [];

	let next = 0;

	for (let i = 1; i <= pages; i++) {
		const res = await fetchContentPaginated(config, {
			offset: next,
			limit: config.pageSize,
			after: true,
			projection: ['id'],
		});
		paths.push({
			params: {
				id: [`${i + 1}`, String(next), String(pages)],
			},
		});
		next = res.after?.dateAt ?? 0;
	}

	return {
		paths,
		fallback: 'blocking', // server render on-demand if page doesn't exist
	};
}

export async function getStaticProps({ params }: { params: { id: [string, string, string] } }) {
	const pageNumber = parseInt(params.id[0]);
	const offset = parseInt(params.id[1] ?? '0');

	const { count } = await fetchSiteWithContentCount(config);

	const pageCount = Math.ceil(count / config.pageSize);

	const res = await fetchContentPaginated(config, {
		offset,
		limit: config.pageSize,
		before: true,
		after: true,
		site: true,
	});

	const analytics = await fetchAnalytics(
		config,
		res.content.map((e) => e.id)
	);

	return {
		props: {
			path: '/entries',
			title: 'Recent Posts',
			site: res.site,
			content: res.content,
			before: res.before,
			after: res.after,
			pageNumber,
			pageCount,
			analytics,
		},
		revalidate: 1,
	};
}
