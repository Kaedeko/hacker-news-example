export interface IApiItem {
	/** The item's unique id. */
	id: number;
	/** The username of the item's author. */
	by?: string;
	/** In the case of stories or polls, the total comment count. */
	descendants?: number;
	/** The ids of the item's comments, in ranked display order. */
	kids?: number[];
	/** The story's score, or the votes for a pollopt. */
	score?: number;
	/** Creation date of the item, in Unix Time. */
	time?: number;
	/** The title of the story, poll or job. */
	title?: string;
	/** The type of item. One of "job", "story", "comment", "poll", or "pollopt". */
	type?: string;
	/** The URL of the story. */
	url?: string;
	/** true if the item is deleted. */
	deleted?: boolean;
	/** The comment, story or poll text. HTML. */
	text?: string;
	/** true if the item is dead. */
	dead?: boolean;
	/** The comment's parent: either another comment or the relevant story. */
	parent?: number;
	/** The pollopt's associated poll. */
	poll?: number;
	/** A list of related pollopts, in display order. */
	parts?: number[];
}
