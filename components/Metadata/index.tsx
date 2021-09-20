import { DateLabel } from '@pinpt/react';

import type { ISite, IContent } from '@pinpt/react';

export interface IMetadataProps {
	className?: string;
	entry: IContent;
	site: ISite;
}

const Metadata = ({ className = '', entry, site }: IMetadataProps) => (
	<div className={`Pinpoint Blog_Metadata ${className}`}>
		<DateLabel ts={entry?.publishedAt} format={{ month: 'long', day: 'numeric', year: 'numeric' }} />

		{(site.theme?.homepage?.tags?.length ?? 0) > 0 && (
			<>
				<span className="separator">&bull;</span>

				<span>
					{(site.theme?.homepage?.tags ?? []).map((tag, tagIndex) => (
						<>
							<span key={tag}>{tag}</span>
							{tagIndex < entry.tags!.length - 1 && <span className="separator">&bull;</span>}
						</>
					))}
				</span>
			</>
		)}
	</div>
);

export default Metadata;
