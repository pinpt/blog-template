import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { Error, Head, fetchSite, ISite } from '@pinpt/react';
import config from '../pinpoint.config';
import Header from '../components/Header';
import Footer from '../components/Footer';

export interface NotFoundErrorProps {
	site: ISite;
}

const InternalServerError = (props: NotFoundErrorProps) => {
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
						className="Error 500"
						error="500 Error"
						title="Internal Server Error"
						onClick={() => router.push('/')}
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

export default InternalServerError;
