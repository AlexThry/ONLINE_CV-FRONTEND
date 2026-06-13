/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL?: string;
	readonly VITE_USERNAME?: string;
	readonly VITE_PAGE_DESCRIPTION?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
