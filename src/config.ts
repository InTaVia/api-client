export let baseUrl: URL | string | null = null

export function configureApiBaseUrl(url: URL | string): void {
  baseUrl = url
}

export const defaultPageSize = 50
