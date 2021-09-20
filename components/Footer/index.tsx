import { getSiteRSSURL, ISite, Logo, PoweredByPinpoint, Social } from '@pinpt/react';

export interface FooterProps {
	site: ISite;
}

const Footer = (props: FooterProps) => {
	const { site } = props;
	return (
		<>
			<div className="Pinpoint Blog_Footer">
				<div className="constraint">
					<div className="content">
						<div className="site">
							<Logo src={site.logoUrl} href={site.theme?.logoLink ?? site.url} title="Footer Logo Home Page" />
							<div>
								<h1 className="title">{site.theme?.title ?? site.name}</h1>
							</div>
						</div>

						<Social.Bar>
							{site.theme?.social?.facebook && (
								<Social.Facebook className="Prebuilt" href={site.theme.social?.facebook} newTab />
							)}
							{site.theme?.social?.instagram && (
								<Social.Instagram className="Prebuilt" href={site.theme.social?.instagram} newTab />
							)}
							{site.theme?.social?.twitter && (
								<Social.Twitter className="Prebuilt" href={site.theme.social?.twitter} newTab />
							)}
							{site.theme?.social?.github && (
								<Social.Github className="Prebuilt" href={site.theme.social?.github} newTab />
							)}
							{site.theme?.social?.linkedin && (
								<Social.LinkedIn className="Prebuilt" href={site.theme.social?.linkedin} newTab />
							)}
							<Social.RSS className="Prebuilt" href={getSiteRSSURL(site)} newTab />
						</Social.Bar>
					</div>
				</div>
			</div>

			<div className="PoweredBy">
				<PoweredByPinpoint siteId={site.id} />
			</div>
		</>
	);
};

export default Footer;
