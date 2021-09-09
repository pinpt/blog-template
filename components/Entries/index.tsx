import router from 'next/router';
import { IContent } from '@pinpt/react';
import Metadata from '../Metadata';

export interface IEntriesProps {
	entries: IContent[];
}

const Entries = ({ entries }: IEntriesProps) => (
	<div className="Pinpoint Blog_Entries">
		{entries.map((entry) => (
			<a key={entry.id} onClick={() => router.push(new URL(entry.url).pathname)} className="entry">
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
		))}
	</div>
);

export default Entries;
