/// <reference lib="webworker" />

const CACHE_NAME = 'sw-cache';
const CACHE_NAME_DYNAMIC = 'sw-cache-dynamic';
const CACHE_URLS = ['/'];
const CACHE_FIRST_AND_UPDATE_REGEX = /\.webp|\.svg|\.jpg|\.jpeg|\.gif|\.png|\.css|\.js|\.ttf|\.woff2/;

const deleteOldCaches = async (): Promise<void> => {
	const keys = await caches.keys();
	await Promise.all(keys.map((key) => {
		if (key !== CACHE_NAME && key !== CACHE_NAME_DYNAMIC) {
			return caches.delete(key);
		}
		return Promise.resolve();
	}));
};

const fromCache = async (request: Request | string, cacheName: string): Promise<Response> => {
	const cache = await caches.open(cacheName);
	const cachedResponse = await cache.match(request);
	if (!cachedResponse) {
		throw new Error('no response in cache');
	}
	return cachedResponse;
};

const update = async (request: Request): Promise<void> => {
	const cache = await caches.open(CACHE_NAME);
	const response = await fetch(request);
	await cache.put(request, response);
};

const cacheFirstAndUpdate = (event: FetchEvent) => {
	const url = new URL(event.request.url);

	if (!['http:', 'https:'].includes(url.protocol)) {
		return fetch(event.request);
	}

	event.respondWith((async () => {
		try {
			const cachedResponse = await fromCache(event.request, CACHE_NAME);
			event.waitUntil(update(event.request));
			return cachedResponse;
		} catch (e) {
			const response = await fetch(event.request);
			const cache = await caches.open(CACHE_NAME);
			await cache.put(event.request, response.clone());
			return response;
		}
	})());
};

const networkFirst = (event: FetchEvent): void => {
	event.respondWith((async () => {
		const cache = await caches.open(CACHE_NAME);
		try {
			const response = await fetch(event.request);
			event.waitUntil(cache.put(event.request, response.clone()));
			return response;
		} catch (e) {
			return fromCache(event.request, CACHE_NAME);
		}
	})());
};

const nonGetRequestNetworkFirst = (event: FetchEvent): void => {
	event.respondWith((async () => {
		const cache = await caches.open(CACHE_NAME_DYNAMIC);
		try {
			const response = await fetch(event.request);
			event.waitUntil(cache.put(event.request.url, response.clone()));
			return response;
		} catch (e) {
			return fromCache(event.request.url, CACHE_NAME_DYNAMIC);
		}
	})());
};

const _self = self as unknown as ServiceWorkerGlobalScope;

_self.addEventListener('install', (e: ExtendableEvent) => {
	_self.skipWaiting();
	e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_URLS)));
});

_self.addEventListener('activate', (e: ExtendableEvent) => {
	e.waitUntil(deleteOldCaches());
});

_self.addEventListener('fetch', (e: FetchEvent) => {
	if (e.request.method !== 'GET') {
		nonGetRequestNetworkFirst(e);
		return;
	}

	if (CACHE_FIRST_AND_UPDATE_REGEX.test(e.request.url)) {
		cacheFirstAndUpdate(e);
	} else {
		networkFirst(e);
	}
});
