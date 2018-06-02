import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { IStory } from "./data.types";

/**
 * Service responsible for fetching and updating the data
 * from the Hacker News API
 *
 * @export
 * @class DataService
 * @implements {OnInit}
 */
@Injectable({
	providedIn: "root"
})
export class DataService {
	private _storyList$ = new Subject<number[]>();
	private _storyData$ = new Subject<IStory[]>();
	private _storyDataArray: IStory[] = [];

	/**
	 * Creates an instance of DataService.
	 * @param {HttpClient} _http
	 * @memberof DataService
	 */
	constructor(private _http: HttpClient) {
		// Starts by fetching the list of stories in the "best" list
		this.fetchBestStories()
			.pipe(
				tap(data => {
					// For every story, get the rest of the data about it
					data.forEach(index => this._fetchStory(index));
					this._storyList$.next(data);
				})
			)
			.subscribe();
	}

	/**
	 * Fetches an array of story IDs from the best stories endpoint
	 * of the Hacker News API
	 *
	 * @returns {Observable<number[]>}
	 * @memberof DataService
	 */
	public fetchBestStories(): Observable<number[]> {
		return this._http.get<number[]>(`${environment.restUri}/beststories.json`);
	}

	/**
	 * Fetches all the data about a given story from the Hacker News
	 * API
	 *
	 * @private
	 * @param {number} id The ID of the story you want to fetch
	 * @memberof DataService
	 */
	private _fetchStory(id: number): void {
		this._http
			.get<IStory>(`${environment.restUri}item/${id}.json`)
			.pipe(
				tap(value => {
					const storyIndex = this._storyDataArray.findIndex(story => {
						return story.id === id;
					});
					if (storyIndex !== -1) {
						this._storyDataArray[storyIndex] = value;
					} else {
						this._storyDataArray.push(value);
					}
					this._storyData$.next(this._storyDataArray);
				})
			)
			.subscribe();
	}

	/**
	 * The list of ID numbers to be displayed
	 *
	 * @readonly
	 * @type {Observable<number[]>}
	 * @memberof DataService
	 */
	get storyList$(): Observable<number[]> {
		return this._storyList$;
	}

	/**
	 * The array of story data objects, keyed by their ID
	 *
	 * @readonly
	 * @type {Observable<IStory[]>}
	 * @memberof DataService
	 */
	get storyData$(): Observable<IStory[]> {
		return this._storyData$;
	}
}
