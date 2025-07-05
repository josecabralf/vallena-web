export class FetchService {
  static API_BASE_URL = import.meta.env.VITE_API_URL;

  static async request({
    endpoint,
    options = {},
    queryParams,
    body,
  }: {
    endpoint: string;
    options: RequestInit;
    queryParams?: Record<string, unknown>;
    body?: Record<string, unknown> | FormData | string;
  }) {
    let url = `${this.API_BASE_URL}${endpoint}`;

    if (queryParams) {
      const serializedParams = this.serializeQueryParams(queryParams);
      url += `${url.includes('?') ? '&' : '?'}${serializedParams}`;
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    // Serializar el body si es un objeto y no es FormData
    if (body && typeof body === 'object' && !(body instanceof FormData))
      body = JSON.stringify(body);
    else if (body instanceof FormData) headers.delete('Content-Type');

    const response = await fetch(url, {
      credentials: 'include',
      ...options,
      headers,
      body,
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type') || '';

      if (
        response.status === 401 &&
        !contentType.includes('application/json') &&
        window.location.pathname !== '/'
      ) {
        window.location.href = '/';
        return;
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || 'Unknown error');
    }

    return await this.handleResponse(response);
  }

  /**
   * Maneja la respuesta según su content-type.
   * @param response - La respuesta de la solicitud fetch.
   * @returns El contenido de la respuesta en el formato adecuado (JSON, texto, Blob, etc.).
   */
  private static async handleResponse(response: Response): Promise<unknown> {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return await response.json(); // Devolver JSON
    } else if (contentType?.includes('text/plain')) {
      return await response.text(); // Devolver texto plano
    } else if (
      contentType?.includes('application/pdf') ||
      contentType?.includes('image/')
    ) {
      return await response.blob(); // Devolver archivos (PDF, imágenes, etc.)
    } else {
      return null; // Otros tipos de contenido
    }
  }

  /**
   * Refresca el token de acceso.
   * @returns El nuevo token de acceso o null si falla.
   */
  static async refreshAccessToken(): Promise<string | null> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/refresh-token`, {
        method: 'POST',
        credentials: 'include', // Enviar cookies
      });

      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }

      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  }

  /**
   * Serializa los parámetros de consulta (queryParams) para la URL.
   * @param params - Los parámetros de consulta.
   * @returns Una cadena de parámetros serializados.
   */
  private static serializeQueryParams(params: Record<string, unknown>): string {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // Manejar arrays
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item !== null && item !== undefined) {
            queryParams.append(`${key}[]`, item.toString());
          }
        });
      }
      // Manejar objetos
      else if (typeof value === 'object' && value !== null) {
        Object.entries(value as Record<string, unknown>).forEach(
          ([subKey, subValue]) => {
            if (subValue !== null && subValue !== undefined) {
              queryParams.append(`${key}[${subKey}]`, String(subValue));
            }
          }
        );
      }
      // Manejar tipos primitivos
      else {
        queryParams.append(key, value.toString());
      }
    });

    return queryParams.toString();
  }
}
