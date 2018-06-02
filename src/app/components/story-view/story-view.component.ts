import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import * as timeago from "time-ago";

import { DataService } from "../../services/data.service";
import { IApiItem } from "../../services/data.types";

@Component({
	selector: "app-story-view",
	templateUrl: "./story-view.component.html",
	styleUrls: ["./story-view.component.scss"]
})
export class StoryViewComponent implements OnInit {
	/**
	 * The story being displayed on this page
	 *
	 * @private
	 * @type {IApiItem}
	 * @memberof StoryViewComponent
	 */
	private _story: IApiItem;
	/**
	 * The first level of comments on the story.
	 * The sub comments are not included
	 *
	 * @private
	 * @type {IApiItem[]}
	 * @memberof StoryViewComponent
	 */
	private _comments: IApiItem[] = [];

	/**
	 * Creates an instance of StoryViewComponent.
	 * @param {DataService} _data
	 * @param {ActivatedRoute} _route
	 * @param {Router} _router
	 * @memberof StoryViewComponent
	 */
	constructor(
		private _data: DataService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this._route.paramMap
			.pipe(
				switchMap(params => {
					const paramId = Number(params.get("id"));
					if (typeof paramId !== "number") {
						this._router.navigate(["/"]);
						throw new Error("ID value is not a number");
					}
					return this._data.fetchItem(<number>paramId);
				}),
				tap(item => {
					this._story = item;
					this._story.kids.forEach(id => this.fetchComment(id).subscribe());
				})
			)
			.subscribe();
	}

	/**
	 * Fetches the top level of comments on the story.
	 *
	 * @readonly
	 * @type {IApiItem[]}
	 * @memberof StoryViewComponent
	 */
	get comments(): IApiItem[] {
		return this._comments;
	}

	/**
	 * Fetches the story object for this page
	 *
	 * @readonly
	 * @type {IApiItem}
	 * @memberof StoryViewComponent
	 */
	get story(): IApiItem {
		return this._story;
	}

	/**
	 * Return the amount of time in words
	 *
	 * @param {number} timestamp Timestamp in ms
	 * @returns {string} The time passed in words
	 * @memberof StoryViewComponent
	 */
	public getTime(timestamp: number): string {
		return timeago.ago(timestamp);
	}

	/**
	 * Downloads the comment with the provided ID
	 *
	 * @private
	 * @param {number} id The ID of the comment to be downloaded
	 * @returns {Observable<IApiItem>}
	 * @memberof StoryViewComponent
	 */
	private fetchComment(id: number): Observable<IApiItem> {
		return this._data.fetchItem(id).pipe(
			tap(item => {
				const itemIndex = this._comments.findIndex(comment => {
					return comment.id === id;
				});
				if (itemIndex !== -1) {
					this._comments[itemIndex] = item;
				} else {
					this._comments.push(item);
				}
				this._comments.sort((a, b) => {
					return a.score > b.score ? -1 : 1;
				});
			})
		);
	}
}
