import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
	/**
	 * Creates an instance of DataService.
	 * @param {HttpClient} _http
	 * @memberof DataService
	 */
	constructor(private _http: HttpClient) {}

	/**
	 * Function to fetch the entirey of a given item from
	 * the Hacker News API
	 *
	 * @private
	 * @param {number} id The item ID to fetch
	 * @returns {Observable<IApiItem>} The observable of the request
	 * @memberof DataService
	 */
	public fetchItem(id: number): Observable<IApiItem> {
		return this._http.get<IApiItem>(`${environment.restUri}item/${id}.json`);
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
}
