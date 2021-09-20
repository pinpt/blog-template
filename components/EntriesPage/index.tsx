import NextHead from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Analytics, Head, IContent, ISite, Pagination } from '@pinpt/react';
import Entries from '../Entries';
import Footer from '../Footer';
import Header from '../Header';
import Signup from '../Signup';

export interface IEntriesPageProps {
	path: string;
	title: string;
	pageNumber: number;
	pageCount: number;
	site: ISite;
	content: IContent[];
	before?: IContent;
	after?: IContent;
	analytics: Analytics;
}

const EntriesPage = (props: IEntriesPageProps) => {
	const router = useRouter();
	const { path, title, content, site, pageNumber, pageCount, before, after, analytics } = props;

	return (
		<>
			<NextHead>
				<title>{site.theme?.title ?? site.name}</title>
				<Head site={site} />
			</NextHead>

			<div className="Pinpoint Blog_Page">
				<Header site={site} />

				<div className="Pinpoint Blog_Entries_Page">
					<div className="constraint">
						<div className="content">
							<div className="heading">
								<h2>
									{title}
									{pageCount !== 1 && (
										<>
											{' '}
											<span className="page-indicator">
												{pageNumber} of {pageCount}
											</span>
										</>
									)}
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

							<Entries entries={content} site={site} />
						</div>
					</div>
				</div>

				<div className="Pinpoint Blog_Pagination">
					<div className="constraint">
						<Pagination
							goForward={
								after ? () => router.push(`${path}/${pageNumber + 1}/${after.dateAt}/${pageCount}`) : undefined
							}
							goBack={
								pageNumber > 2 && before
									? () => router.push(`${path}/${pageNumber - 1}/${before.dateAt}/${pageCount}`)
									: pageNumber === 2
									? () => router.push(`${path}/1`)
									: undefined
							}
						/>
					</div>
				</div>

				<Signup />

				<Footer site={site} />
			</div>
		</>
	);
};

export default EntriesPage;
