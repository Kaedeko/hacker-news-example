import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as timeago from "time-ago";

import { listLoadAnimation } from "../../animations";
import { DataService } from "../../services/data.service";
import { IApiItem } from "../../services/data.types";

@Component({
	selector: "app-landing-screen",
	templateUrl: "./landing-screen.component.html",
	styleUrls: ["./landing-screen.component.scss"],
	animations: [listLoadAnimation]
})
export class LandingScreenComponent implements OnInit {
	/**
	 * The array of stories
	 */
	private _storyData: IApiItem[] = [];

	/**
	 * Creates an instance of LandingScreenComponent.
	 * @param {DataService} _data
	 * @memberof LandingScreenComponent
	 */
	constructor(private _data: DataService) {}

	ngOnInit() {
		this._data
			.fetchBestStories()
			.pipe(
				tap(data => {
					// For every story, get the rest of the data about it
					data.forEach(id => this.fetchStory(id).subscribe());
				})
			)
			.subscribe();
	}

	/**
	 * The array of story data objects
	 *
	 * @readonly
	 * @type {Observable<IApiItem[]>}
	 * @memberof DataService
	 */
	get storyData(): IApiItem[] {
		return this._storyData;
	}

	/**
	 * Return the amount of time in words
	 *
	 * @param {number} timestamp Timestamp in ms
	 * @returns {string} The time passed in words
	 * @memberof LandingScreenComponent
	 */
	public getTime(timestamp: number): string {
		return timeago.ago(timestamp);
	}

	/**
	 * Fetch a specific story item from the Hacker News API
	 *
	 * @private
	 * @param {number} id The id of the story to fetch
	 * @returns {Observable<IApiItem>}
	 * @memberof LandingScreenComponent
	 */
	private fetchStory(id: number): Observable<IApiItem> {
		return this._data.fetchItem(id).pipe(
			tap(item => {
				const itemIndex = this._storyData.findIndex(comment => {
					return comment.id === id;
				});
				if (itemIndex !== -1) {
					this._storyData[itemIndex] = item;
				} else {
					this._storyData.push(item);
				}
				this._storyData.sort((a, b) => {
					if (a.score > b.score) {
						return -1;
					}
					if (b.score > a.score) {
						return 1;
					}
					if (a.id > b.id) {
						return -1;
					}
					return 1;
				});
			})
		);
	}
}
