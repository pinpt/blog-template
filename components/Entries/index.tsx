import router from 'next/router';
import { getRouterRelativePath } from '@pinpt/react';
import { CoverMedia } from '@pinpt/react/dist/cjs/components/Renderer/content';
import Metadata from '../Metadata';

import type { IContent, ISite } from '@pinpt/react';

export interface IEntriesProps {
	site: ISite;
	entries: IContent[];
}

const Entries = ({ site, entries }: IEntriesProps) => (
	<div className="Pinpoint Blog_Entries">
		{entries.map((entry) => (
			<a key={entry.id} onClick={() => router.push(getRouterRelativePath(site, entry.url))} className="entry">
				{entry.coverMedia?.placeholderImage ? (
					<CoverMedia media={entry.coverMedia} title={entry.headline} />
				) : (
					<div className="no-image" />
				)}

				<div className="content">
					<Metadata entry={entry} site={site} />

					<h2>{entry.title}</h2>

					<p>{entry.headline}</p>
				</div>
			</a>
		))}
	</div>
);

export default Entries;
