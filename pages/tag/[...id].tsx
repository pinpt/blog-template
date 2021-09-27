import { fetchContentPaginated, fetchSiteWithContentCount, titleCase } from '@pinpt/react';
import EntriesPage, { IEntriesPageProps } from '../../components/EntriesPage';
import config from '../../pinpoint.config';

const Page = (props: IEntriesPageProps) => <EntriesPage {...props} />;

export default Page;

export async function getServerSideProps({ params }: { params: { id: [string, string, string, string] } }) {
	try {
		const tag = params.id[0];
		const pageNumber = parseInt(params.id[1]);
		const offset = parseInt(params.id[2] ?? '0');
		const pageSize = config.pageSize ?? 12;

		const { count } = await fetchSiteWithContentCount(config, tag);

		const pageCount = Math.ceil(count / pageSize);

		const res = await fetchContentPaginated(config, {
			tag,
			offset,
			limit: pageSize,
			before: true,
			after: true,
			site: true,
		});

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
