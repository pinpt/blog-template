import {
	FacebookLink, getSiteRSSURL, GithubLink, InstagramLink, ISite, LinkedInLink, Logo,
	PoweredByPinpoint, RSSLink, SocialMediaBar, TwitterLink
} from '@pinpt/react';

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
							<Logo src={site.logoUrl} href={site.theme?.logoLink ?? site.url} />
							<div>
								<h1 className="title">{site.theme?.title ?? site.name}</h1>
							</div>
						</div>

						<SocialMediaBar>
							{site.theme?.social?.facebook && (
								<FacebookLink className="Prebuilt" href={site.theme.social?.facebook} newTab />
							)}
							{site.theme?.social?.instagram && (
								<InstagramLink className="Prebuilt" href={site.theme.social?.instagram} newTab />
							)}
							{site.theme?.social?.twitter && (
								<TwitterLink className="Prebuilt" href={site.theme.social?.twitter} newTab />
							)}
							{site.theme?.social?.github && (
								<GithubLink className="Prebuilt" href={site.theme.social?.github} newTab />
							)}
							{site.theme?.social?.linkedin && (
								<LinkedInLink className="Prebuilt" href={site.theme.social?.linkedin} newTab />
							)}
							<RSSLink className="Prebuilt" href={getSiteRSSURL(site)} newTab />
						</SocialMediaBar>
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
