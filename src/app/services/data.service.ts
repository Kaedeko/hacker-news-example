import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { IApiItem } from "./data.types";

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
	private _storyData$ = new Subject<IApiItem[]>();
	private _commentData$ = new Subject<IApiItem[]>();
	private _storyDataArray: IApiItem[] = [];
	private _commentDataArray: IApiItem[] = [];

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
		this._fetchItem(id, this._storyDataArray, this._storyData$).subscribe();
	}

	private _fetchComment(id: number): void {
		this._fetchItem(id, this._commentDataArray, this._commentData$).subscribe();
	}

	/**
	 * Function to fetch the entirey of a given item from
	 * the Hacker News API
	 *
	 * @private
	 * @param {number} id The item ID to fetch
	 * @param {IApiItem[]} dataArray The data array to update
	 * @param {Subject<IApiItem[]>} dataSubject$ The data subject to update
	 * @returns {Observable<IApiItem>} The observable of the request
	 * @memberof DataService
	 */
	private _fetchItem(
		id: number,
		dataArray: IApiItem[],
		dataSubject$: Subject<IApiItem[]>
	): Observable<IApiItem> {
		return this._http
			.get<IApiItem>(`${environment.restUri}item/${id}.json`)
			.pipe(
				tap(value => {
					const itemIndex = dataArray.findIndex(comment => {
						return comment.id === id;
					});
					if (itemIndex !== -1) {
						dataArray[itemIndex] = value;
					} else {
						dataArray.push(value);
					}
					dataSubject$.next(dataArray);
				})
			);
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
	 * @type {Observable<IApiItem[]>}
	 * @memberof DataService
	 */
	get storyData$(): Observable<IApiItem[]> {
		return this._storyData$;
	}
}
