import {
	fetchContentPaginated, fetchSiteWithContentCount, getRouterRelativePath
} from '@pinpt/react';
import EntriesPage, { IEntriesPageProps } from '../../components/EntriesPage';
import config from '../../pinpoint.config';

const Page = (props: IEntriesPageProps) => <EntriesPage {...props} />;

export default Page;

export async function getServerSideProps({ params }: { params: { id: [string, string, string] } }) {
	try {
		const pageNumber = parseInt(params.id[0]);
		const offset = parseInt(params.id[1] ?? '0');
		const { count } = await fetchSiteWithContentCount(config);
		const pageSize = config.pageSize ?? 12;

		const pageCount = Math.ceil(count / pageSize);

		const res = await fetchContentPaginated(config, {
			offset,
			limit: pageSize,
			before: true,
			after: true,
			site: true,
		});

		return {
			props: {
				path: getRouterRelativePath(res.site!, '/entries'),
				title: 'Recent Posts',
				site: res.site,
				content: res.content,
				before: res.before,
				after: res.after,
				pageNumber,
				pageCount,
			},
		};
	} catch (ex: any) {
		if (ex.code === 404) {
			return {
				notFound: true,
			};
		}
		throw ex;
	}
}
