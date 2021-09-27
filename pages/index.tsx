import NextHead from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	fetchContentPaginated, getRouterRelativePath, Head, IContent, ISite, slugifyString, titleCase
} from '@pinpt/react';
import Footer from '../components/Footer';
import Group from '../components/Group';
import Header from '../components/Header';
import Metadata from '../components/Metadata';
import Signup from '../components/Signup';
import config from '../pinpoint.config';

interface HomeProps {
	site: ISite;
	content: IContent[];
	after?: IContent;
	groups?: {
		path: string;
		title: string;
		content: IContent[];
	}[];
}

export default function Home(props: HomeProps) {
	const { site, content, groups } = props;
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

				{latest && (
					<div className="Pinpoint Blog_Hero">
						<div className="constraint">
							<Link href={getRouterRelativePath(site, latest.url)}>
								<a className="entry">
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
							</Link>
						</div>
					</div>
				)}

				<Signup />

				<Group
					title="Recent Posts"
					entries={recent}
					className="recent"
					viewAllHref={getRouterRelativePath(site, '/entries/1')}
					site={site}
				/>

				{groups?.map((group) => (
					<Group
						key={group.title}
						title={group.title}
						entries={group.content}
						viewAllHref={getRouterRelativePath(site, `${group.path}/1`)}
						site={site}
					/>
				))}

				<Footer site={site} />
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const { site, content, after } = await fetchContentPaginated(config, {
		limit: (config.recentSize ?? 6) + 1,
		after: true,
		site: true,
	});

	const tags = site?.theme?.homepage?.tags ?? [];

	const tagsEntries = await Promise.all(
		tags.map((tag) =>
			fetchContentPaginated(config, {
				limit: config.groupSize ?? 3,
				tag,
			})
		)
	);

	const groups = tags.map((tag, index) => ({
		title: titleCase(tag),
		path: getRouterRelativePath(site!, `/tag/${slugifyString(tag)}`),
		content: tagsEntries[index].content,
	}));

	return {
		props: {
			site,
			content,
			after,
			groups,
		},
	};
}
