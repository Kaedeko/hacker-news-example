import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { IBestStories } from "./data.types";

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
	private _storyList = new Subject<any>();
	private _storyData = new Subject<any>();

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
					this._storyList.next(data);
				})
			)
			.subscribe();
	}

	/**
	 * Fetches an array of story IDs from the best stories endpoint
	 * of the Hacker News API
	 *
	 * @returns {Observable<IBestStories>}
	 * @memberof DataService
	 */
	public fetchBestStories(): Observable<IBestStories> {
		return this._http.get<IBestStories>(
			`${environment.restUri}/beststories.json`
		);
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
			.get<Observable<any>>(`${environment.restUri}item/${id}.json`)
			.pipe(tap(value => console.log(value)))
			.subscribe();
	}

	/**
	 * The list of ID numbers to be displayed
	 *
	 * @readonly
	 * @type {Observable<any>}
	 * @memberof DataService
	 */
	get storyList$(): Observable<any> {
		return this._storyList;
	}
}
