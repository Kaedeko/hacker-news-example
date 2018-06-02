export interface IApiItem {
	id: number;
	by?: string;
	descendants?: number;
	kids?: number[];
	score?: number;
	time?: number;
	title?: string;
	type?: string;
	url?: string;
	deleted?: boolean;
	text?: string;
	dead?: boolean;
	parent?: number;
	poll?: number;
	parts?: number[];
}
