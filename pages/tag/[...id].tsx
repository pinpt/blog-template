import NextHead from 'next/head';
import { fetchAnalytics, fetchContentPaginated, fetchSiteWithContentCount, titleCase } from '@pinpt/react';
import config from '../../pinpoint.config';
import EntriesPage, { IEntriesPageProps } from '../../components/EntriesPage';

const Page = (props: IEntriesPageProps) => <EntriesPage {...props} />;

export default Page;

export async function getServerSideProps(context: any) {
	const params = context.params;
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
	};
}
