import { useState } from 'react';
import router from 'next/router';
import { ISite, Logo, Search, ThemeToggle } from '@pinpt/react';

export interface HeaderProps {
	site: ISite;
	searchTerm?: string;
}

const Header = (props: HeaderProps) => {
	const { site, searchTerm } = props;
	const [showActions, setShowActions] = useState(false);

	return (
		<div className="Pinpoint Blog_Header">
			<div className="constraint">
				<div className="content">
					<div className="static">
						<div className="logo">
							<Logo
								className="flex-shrink-0"
								src={site.logoUrl}
								href={site.theme?.logoLink ?? site.url}
								title="Footer Logo Home Page"
							/>
							<div className="ml-4">
								<h1 className="text-2xl md:!text-3xl">{site.theme?.title ?? site.name}</h1>
							</div>
						</div>

						<button className="md:hidden" onClick={() => setShowActions((val) => !val)}>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="bars"
								className="h-6 w-6"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
								></path>
							</svg>
						</button>

						<div className="actions">
							<Search.Bar defaultValue={searchTerm} onSubmit={(value) => router.push(`/search?term=${value}`)} />

							<ThemeToggle />

							<a href="/subscription/subscribe" className="button">
								Sign-up
							</a>
						</div>
					</div>

					<div className={`small-screen ${showActions ? 'visible' : ''}`}>
						<div className="left">
							<Search.Bar className="mr-4 flex-grow" />

							<ThemeToggle />
						</div>

						<a href="/subscription/subscribe" className="button sign-up">
							Sign-up
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
