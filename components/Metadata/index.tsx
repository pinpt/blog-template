import { DateLabel, IContent } from '@pinpt/react';
import { Fragment } from 'react';

export interface IMetadataProps {
	className?: string;
	entry: IContent;
}

const Metadata = ({ className = '', entry }: IMetadataProps) => (
	<div className={`Pinpoint Blog_Metadata ${className}`}>
		<DateLabel ts={entry?.publishedAt} format={{ month: 'long', day: 'numeric', year: 'numeric' }} />

		<span className="separator">&bull;</span>

		<span>
			{entry?.tags?.map((tag, tagIndex) => (
				<Fragment key={tag}>
					<span>{tag}</span>
					{tagIndex < entry.tags!.length - 1 && <span className="separator">&bull;</span>}
				</Fragment>
			))}
		</span>
	</div>
);

export default Metadata;
