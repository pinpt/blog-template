import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { fetchSite, Head, Loader, Pagination, Search, useSearch } from '@pinpt/react';
import config from '../pinpoint.config';
import Header from '../components/Header';
import Footer from '../components/Footer';

import type { ISite } from '@pinpt/react';
import Entries from '../components/Entries';
import Signup from '../components/Signup';
import Link from 'next/link';
interface SearchProps {
	site: ISite;
}

export default function SearchPage(props: SearchProps) {
	const { site } = props;
	const router = useRouter();
	const term = (router?.query?.term as string) ?? '';
	const { results, loading } = useSearch(term, [], config.siteId);

	const title = useMemo(() => `Search results for ${term} - ${site.theme?.title ?? site.name}`, [term, site]);

	return (
		<>
			<NextHead>
				<title>{title}</title>
				<Head site={site} />
			</NextHead>

			<div className="Pinpoint Blog_Page">
				<Header site={site} searchTerm={term} />

				<div className="Pinpoint Blog_Search_Results">
					<div className="constraint">
						<div className="content">
							{loading ? (
								<div className="loaderWrapper">
									<Loader />
								</div>
							) : (
								<>
									<div className="heading">
										<h2>
											{results?.length === 0 ? 'No results ' : 'Results '}for{' '}
											<span className="search-term">{term}</span>
										</h2>
										<Link href="/">
											<a>
												<svg
													className="icon"
													width={15.75}
													height={18}
													aria-hidden="true"
													focusable="false"
													data-prefix="fas"
													data-icon="arrow-left"
													role="img"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 448 512"
												>
													<path
														fill="currentColor"
														d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
													></path>
												</svg>
												Back to All Posts
											</a>
										</Link>
									</div>

									{results.length > 0 && <Entries entries={results} />}
								</>
							)}
						</div>
					</div>
				</div>

				<Signup />

				<Footer site={site} />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const site = await fetchSite(config);
	return {
		props: {
			site,
		},
		revalidate: 600 * 5,
	};
}
