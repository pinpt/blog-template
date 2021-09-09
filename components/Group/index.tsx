import { IContent } from '@pinpt/react';
import Link from 'next/link';
import Entries from '../Entries';

export interface IGroupProps {
	className?: string;
	contentClassName?: string;
	entries: IContent[];
	title: string;
	viewAllHref?: string;
}

const Group = ({ className = '', contentClassName = '', entries, title, viewAllHref = '#' }: IGroupProps) => {
	return (
		<div className={`Pinpoint Blog_Group ${className}`}>
			<div className="constraint">
				<div className={`content ${contentClassName}`}>
					<div className="heading">
						<h2>{title}</h2>
						<Link href={viewAllHref}>
							<a href={viewAllHref}>
								View All
								<svg
									className="icon"
									width={15.75}
									height={18}
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="arrow-right"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
								>
									<path
										fill="currentColor"
										d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
									></path>
								</svg>
							</a>
						</Link>
					</div>

					<Entries entries={entries} />
				</div>
			</div>
		</div>
	);
};

export default Group;
