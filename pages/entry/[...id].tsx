import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
	Author,
	Banner,
	Clap,
	createClap,
	Document,
	EmailShare,
	FacebookShare,
	fetchContent,
	fetchContentAnalytics,
	getRouterRelativePath,
	Head,
	IContent,
	ISite,
	LinkedInShare,
	Pagination,
	Pinpoint,
	SocialMediaBar,
	TwitterShare,
} from '@pinpt/react';
import { CoverMedia } from '@pinpt/react/dist/cjs/components/Renderer';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Metadata from '../../components/Metadata';
import Signup from '../../components/Signup';
import config from '../../pinpoint.config';

interface EntryPageProps {
	content: IContent;
	before: IContent;
	after: IContent;
	site: ISite;
	preview?: boolean;
}

const PreviewBanner = () => {
	return <Banner message="You are viewing an unpublished preview of your page" />;
};

export default function EntryPage(props: EntryPageProps) {
	const router = useRouter();
	const { content, site, before, after, preview } = props;
	const [sessionCount, setSessionCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [maxed, setMaxed] = useState(false);
	const contentId = content.id;

	useEffect(() => {
		fetchContentAnalytics(config, contentId).then(({ claps }: { claps: number }) => {
			setTotalCount(claps);
		});
	}, [contentId]);

	const onClap = useCallback(
		(entry: IContent) => {
			if (!maxed) {
				createClap(config, entry.id).then((res: { sessionCount: number; count: number; max: boolean }) => {
					setSessionCount(res.sessionCount);
					setTotalCount(res.count);
					setMaxed(res.max);
				});
			}
		},
		[maxed]
	);

	return (
		<>
			<NextHead>
				<title>
					{content.title} - {site.name}
				</title>
				<Head site={site} content={content} />
			</NextHead>

			<div className="Pinpoint Blog_Page">
				<Header site={site} />

				{preview && <PreviewBanner />}

				<Pinpoint siteId={site.id} contentId={content.id}>
					{(_ready, ref) => (
						<>
							<div className="Pinpoint Blog_Entry">
								<div className="constraint">
									<h1>{content.title}</h1>

									<Metadata entry={content} />

									{content.authors?.[0] && (
										<Author
											avatarUrl={content.authors?.[0]?.avatarUrl ?? ''}
											name={`${content.authors?.[0]?.firstName} ${content.authors?.[0]?.lastName}`}
										/>
									)}

									<div className="actions">
										<SocialMediaBar className="sharing">
											<FacebookShare href={content.url} newTab />
											<TwitterShare text={content.headline} href={content.url} newTab />
											<LinkedInShare
												title={content.title}
												summary={content.headline}
												href={content.url}
												newTab
											/>
											<EmailShare
												subject={content.title}
												body={`${site.name} - ${content.title}\n${content.headline}\n\n${content.url}`}
											/>
										</SocialMediaBar>

										<Clap
											clapCount={totalCount}
											sessionClapCount={sessionCount}
											handleClap={() => onClap(content)}
										/>
									</div>
								</div>

								<section>
									{content.coverMedia && (
										<div className="covermediaWrapper">
											<CoverMedia media={content.coverMedia} title={content.title} />
										</div>
									)}

									<Document ref={ref} node={content.document} />
								</section>
							</div>
						</>
					)}
				</Pinpoint>

				<div className="Pinpoint Blog_Pagination">
					<div className="constraint">
						<Pagination
							goBackText={<Pagination.GoBackWithArrow text={before?.title} />}
							goBack={() => router.push(getRouterRelativePath(site, before.url))}
							goForwardText={<Pagination.GoForwardWithArrow text={after?.title} />}
							goForward={() => router.push(getRouterRelativePath(site, after.url))}
						/>
					</div>
				</div>

				<Signup />

				<Footer site={site} />
			</div>
		</>
	);
}

export async function getServerSideProps({
	params,
	preview,
	previewData,
}: {
	params: { id: string; title?: string };
	preview?: boolean;
	previewData?: any;
}) {
	try {
		const { content, before, after, site } = await fetchContent(config, params.id[0], {
			before: true,
			after: true,
			site: true,
			commit: preview ? previewData?.commit : undefined,
		});

		return {
			props: {
				content,
				site,
				before,
				after,
				preview: !!preview,
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
