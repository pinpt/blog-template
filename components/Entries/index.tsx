import Link from 'next/link';
import router from 'next/router';
import { getRouterRelativePath } from '@pinpt/react';
import Metadata from '../Metadata';

import type { IContent, ISite } from '@pinpt/react';

export interface IEntriesProps {
	site: ISite;
	entries: IContent[];
}

const Entries = ({ entries, site }: IEntriesProps) => (
	<div className="Pinpoint Blog_Entries">
		{entries.map((entry) => (
			<Link key={entry.id} href={getRouterRelativePath(site, entry.url)}>
				<a className="entry">
					{entry.coverMedia?.placeholderImage ? (
						<img src={entry.coverMedia.placeholderImage} alt={entry.headline} />
					) : (
						<div className="no-image" />
					)}

					<div className="content">
						<Metadata entry={entry} />

						<h2>{entry.title}</h2>

						<p>{entry.headline}</p>
					</div>
				</a>
			</Link>
		))}
	</div>
);

export default Entries;
