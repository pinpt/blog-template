import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { Error, fetchSite, getRouterRelativePath, Head, ISite } from '@pinpt/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import config from '../pinpoint.config';

export interface NotFoundErrorProps {
	site: ISite;
}

const NotFoundError = (props: NotFoundErrorProps) => {
	const { site } = props;
	const router = useRouter();

	return (
		<>
			<NextHead>
				<title>404 Not Found</title>
				<Head site={site} />
			</NextHead>

			<div className="Pinpoint Blog_Page">
				<Header site={site} />

				<div className="Pinpoint Blog_Error">
					<Error
						className="Error 404"
						error="404 Error"
						title="Page Not Found"
						description="Sorry, we couldn’t find the page you’re looking for."
						onClick={() => router.push(getRouterRelativePath(site, '/'))}
					/>
				</div>

				<Footer site={site} />
			</div>
		</>
	);
};

export async function getStaticProps() {
	const site = await fetchSite(config);

	return {
		props: {
			site,
		},
	};
}

export default NotFoundError;
