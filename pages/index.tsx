import NextHead from 'next/head';
import { useRouter } from 'next/router';
import {
	Analytics,
	DateLabel,
	fetchAnalytics,
	fetchContentPaginated,
	fetchSiteWithContentCount,
	Head,
	IContent,
	ISite,
	Pagination,
	titleCase,
} from '@pinpt/react';
import config from '../pinpoint.config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Signup from '../components/Signup';
import Group from '../components/Group';
import Metadata from '../components/Metadata';

interface HomeProps {
	site: ISite;
	content: IContent[];
	after?: IContent;
	analytics: Analytics;
	// pageCount: number;
	groups?: {
		path: string;
		title: string;
		content: IContent[];
	}[];
}

export default function Home(props: HomeProps) {
	const { site, content, after, analytics, groups } = props;
	const router = useRouter();
	const title = site.theme?.description ? `${site.theme.description} - ${site.name}` : site.name;

	const latest = content?.[0];

	const recent = content?.slice(1, 7);

	return (
		<>
			<NextHead>
				<title>{title}</title>
				<Head site={site} />
			</NextHead>

			<div className="Pinpoint Blog_Page">
				<Header site={site} />

				<div className="Pinpoint Blog_Hero">
					<div className="constraint">
						<a onClick={() => router.push(new URL(latest.url).pathname)} className="entry">
							{latest.coverMedia?.placeholderImage ? (
								<img src={latest.coverMedia.placeholderImage} alt={latest.headline} />
							) : (
								<div className="no-image" />
							)}

							<div className="content">
								<Metadata entry={latest} />

								<h2>{latest.title}</h2>

								<p>{latest.headline}</p>
							</div>
						</a>
					</div>
				</div>

				<Signup />

				<Group title="Recent Posts" entries={recent} className="recent" viewAllHref="/entries/1" />

				{groups?.map((group) => (
					<Group key={group.title} title={group.title} entries={group.content} viewAllHref={`${group.path}/1`} />
				))}

				<Footer site={site} />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const { site, content, after } = await fetchContentPaginated(config, {
		limit: config.recentSize + 1,
		after: true,
		site: true,
	});

	const [analytics] = await Promise.all([
		fetchAnalytics(
			config,
			content.map((e) => e.id)
		),
	]);

	const tagsEntries = await Promise.all(
		config.tags.map((tag) =>
			fetchContentPaginated(config, {
				limit: config.groupSize,
				tag,
			})
		)
	);

	const groups = config.tags.map((tag, index) => ({
		title: titleCase(tag),
		path: `/tag/${tag}`,
		content: tagsEntries[index].content,
	}));

	// const pageCount = Math.ceil(count / config.pageSize);

	return {
		props: {
			site,
			content,
			after,
			analytics,
			groups,
		},
		revalidate: 60, // TODO: set low and cache on proxy
	};
}
