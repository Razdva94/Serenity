class Api {
	_headers: HeadersInit | undefined;
	_mathURL: string;
	_customURL: string;
	constructor(options: {
		mathURL: string;
		headers: HeadersInit | undefined;
		customURL: string;
	}) {
		this._headers = options.headers;
		this._mathURL = options.mathURL;
		this._customURL = options.customURL;
	}

	getResult(expression: string, apiType: string) {
		const cleanExpression = this._replaceSymbols(expression);
		if (apiType === 'math.js') {
			return this._request(`${this._mathURL}`, {
				method: 'POST',
				headers: this._headers,
				body: JSON.stringify({
					expr: [cleanExpression],
				}),
			});
		}
		if (apiType === 'custom') {
			return this._request(`${this._customURL}`, {
				method: 'POST',
				headers: this._headers,
				body: JSON.stringify({
					expression: cleanExpression,
				}),
			});
		}
	}

	_replaceSymbols(expression: string) {
		return expression.replace(/÷/g, '/').replace(/×/g, '*');
	}

	_checkResponse(res: Response) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка: ${res.statusText}`);
	}

	_request(url: RequestInfo | URL, options: RequestInit | undefined) {
		return fetch(url, options).then((res) => this._checkResponse(res));
	}
}

const api = new Api({
	mathURL: `${import.meta.env.VITE_URL_MATH}`,
	customURL: `${import.meta.env.VITE_URL_CUSTOM}`,
	headers: {
		'Content-Type': 'application/json',
	},
});
export default api;
