import { fetchAnalytics, fetchContentPaginated, fetchSite, fetchSiteWithContentCount, titleCase } from '@pinpt/react';
import config from '../../pinpoint.config';
import EntriesPage, { IEntriesPageProps } from '../../components/EntriesPage';

const Page = (props: IEntriesPageProps) => <EntriesPage {...props} />;

export default Page;

const getPathsForTag = async (tag: string) => {
	const { count } = await fetchSiteWithContentCount(config, tag);
	const pages = Math.ceil(count / config.pageSize);
	const paths = [];

	let next = 0;

	for (let i = 1; i <= pages; i++) {
		const res = await fetchContentPaginated(config, {
			tag,
			offset: next,
			limit: config.pageSize,
			after: true,
			projection: ['id', 'dateAt'],
		});
		paths.push({
			params: {
				id: [tag, String(i), String(next), String(pages)],
			},
		});
		next = res.after?.dateAt ?? 0;
	}

	return paths;
}

export async function getStaticPaths() {
	const site = await fetchSite(config);
	const tags = site?.theme?.homepage?.tags ?? [];

	const tagPaths = await Promise.all(
		tags.map((tag) => getPathsForTag(tag))	
	);

	return {
		paths: tagPaths.flatMap((paths) => paths),
		fallback: 'blocking', // server render on-demand if page doesn't exist
	};
}

export async function getStaticProps({ params }: { params: { id: [string, string, string, string] } }) {
	const tag = params.id[0];
	const pageNumber = parseInt(params.id[1]);
	const offset = parseInt(params.id[2] ?? '0');

	const { count } = await fetchSiteWithContentCount(config, tag);

	const pageCount = Math.ceil(count / config.pageSize);

	const res = await fetchContentPaginated(config, {
		tag,
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
			path: `/tag/${tag}`,
			title: titleCase(tag),
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
