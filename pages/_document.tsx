import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel="stylesheet"
						crossOrigin="anonymous"
						referrerPolicy="no-referrer"
						href="https://fonts.googleapis.com/css?family=Inter:300,400,500,700&amp;display=swap"
					/>
				</Head>
				<body className="preload Pinpoint">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
