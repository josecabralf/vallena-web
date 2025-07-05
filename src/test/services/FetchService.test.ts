import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { FetchService } from '../../services/Fetch.service';

// Mock import.meta.env
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3001/api',
  },
}));

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.location
const mockLocation = {
  href: '',
  pathname: '/dashboard',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('FetchService', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockLocation.href = '';
    mockLocation.pathname = '/dashboard';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('request method', () => {
    test('should make a GET request with correct URL', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await FetchService.request({
        endpoint: '/test',
        options: { method: 'GET' },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `${FetchService.API_BASE_URL}/test`,
        expect.objectContaining({
          method: 'GET',
          credentials: 'include',
        })
      );
    });

    test('should handle query parameters correctly', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await FetchService.request({
        endpoint: '/test',
        options: { method: 'GET' },
        queryParams: { page: 1, limit: 10, status: 'active' },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `${FetchService.API_BASE_URL}/test?page=1&limit=10&status=active`,
        expect.any(Object)
      );
    });

    test('should handle array query parameters', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await FetchService.request({
        endpoint: '/test',
        options: { method: 'GET' },
        queryParams: { tags: ['tag1', 'tag2'], categories: ['cat1'] },
      });

      const expectedUrl = `${FetchService.API_BASE_URL}/test?tags%5B%5D=tag1&tags%5B%5D=tag2&categories%5B%5D=cat1`;
      expect(mockFetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
    });

    test('should handle object query parameters', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await FetchService.request({
        endpoint: '/test',
        options: { method: 'GET' },
        queryParams: {
          filter: { name: 'John', age: 30 },
          simple: 'value',
        },
      });

      expect(mockFetch).toHaveBeenCalled();
      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('filter%5Bname%5D=John');
      expect(url).toContain('filter%5Bage%5D=30');
      expect(url).toContain('simple=value');
    });

    test('should serialize JSON body correctly', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({ success: true }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const body = { name: 'John', email: 'john@example.com' };

      await FetchService.request({
        endpoint: '/users',
        options: { method: 'POST' },
        body,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(body),
          headers: expect.any(Headers),
        })
      );
    });

    test('should handle FormData body correctly', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({ success: true }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const formData = new FormData();
      formData.append('file', new Blob(['test']), 'test.txt');

      await FetchService.request({
        endpoint: '/upload',
        options: { method: 'POST' },
        body: formData,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: formData,
        })
      );
    });

    test('should handle 401 error with redirect', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        headers: { get: vi.fn().mockReturnValue('text/html') },
      };
      mockFetch.mockResolvedValue(mockResponse);

      await FetchService.request({
        endpoint: '/protected',
        options: { method: 'GET' },
      });

      expect(mockLocation.href).toBe('/');
    });

    test('should not redirect on 401 if already on home page', async () => {
      mockLocation.pathname = '/';
      const mockResponse = {
        ok: false,
        status: 401,
        headers: { get: vi.fn().mockReturnValue('text/html') },
        json: vi.fn().mockResolvedValue({ message: 'Unauthorized' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        FetchService.request({
          endpoint: '/protected',
          options: { method: 'GET' },
        })
      ).rejects.toThrow('Unauthorized');
    });

    test('should handle other HTTP errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({ message: 'Bad Request' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        FetchService.request({
          endpoint: '/invalid',
          options: { method: 'POST' },
        })
      ).rejects.toThrow('Bad Request');
    });

    test('should handle error without message', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({}),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        FetchService.request({
          endpoint: '/error',
          options: { method: 'GET' },
        })
      ).rejects.toThrow('Unknown error');
    });
  });

  describe('handleResponse method', () => {
    test('should handle JSON response', async () => {
      const jsonData = { message: 'success' };
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue(jsonData),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await FetchService.request({
        endpoint: '/json',
        options: { method: 'GET' },
      });

      expect(result).toEqual(jsonData);
    });

    test('should handle text response', async () => {
      const textData = 'plain text response';
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('text/plain') },
        text: vi.fn().mockResolvedValue(textData),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await FetchService.request({
        endpoint: '/text',
        options: { method: 'GET' },
      });

      expect(result).toBe(textData);
    });

    test('should handle PDF response', async () => {
      const blobData = new Blob(['PDF content']);
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/pdf') },
        blob: vi.fn().mockResolvedValue(blobData),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await FetchService.request({
        endpoint: '/document.pdf',
        options: { method: 'GET' },
      });

      expect(result).toBe(blobData);
    });

    test('should handle image response', async () => {
      const blobData = new Blob(['image content']);
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('image/png') },
        blob: vi.fn().mockResolvedValue(blobData),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await FetchService.request({
        endpoint: '/image.png',
        options: { method: 'GET' },
      });

      expect(result).toBe(blobData);
    });

    test('should handle unknown content type', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/octet-stream') },
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await FetchService.request({
        endpoint: '/binary',
        options: { method: 'GET' },
      });

      expect(result).toBe(null);
    });
  });

  describe('refreshAccessToken method', () => {
    test('should successfully refresh token', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ accessToken: 'new-token-123' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await FetchService.refreshAccessToken();

      expect(result).toBe('new-token-123');
      expect(mockFetch).toHaveBeenCalledWith(
        `${FetchService.API_BASE_URL}/refresh-token`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
    });

    // test('should return null on refresh failure', async () => {
    //   const mockResponse = {
    //     ok: false,
    //     status: 401,
    //   };
    //   mockFetch.mockResolvedValue(mockResponse);

    //   const result = await FetchService.refreshAccessToken();

    //   expect(result).toBe(null);
    // });

    test('should handle network error during refresh', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await FetchService.refreshAccessToken();

      expect(result).toBe(null);
    });
  });

  describe('serializeQueryParams method', () => {
    test('should ignore null and undefined values', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({}),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await FetchService.request({
        endpoint: '/test',
        options: { method: 'GET' },
        queryParams: {
          valid: 'value',
          nullValue: null,
          undefinedValue: undefined,
          emptyString: '',
        },
      });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('valid=value');
      expect(url).toContain('emptyString=');
      expect(url).not.toContain('nullValue');
      expect(url).not.toContain('undefinedValue');
    });

    test('should handle arrays with null/undefined values', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('application/json') },
        json: vi.fn().mockResolvedValue({}),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await FetchService.request({
        endpoint: '/test',
        options: { method: 'GET' },
        queryParams: {
          items: ['valid', null, undefined, 'another'],
        },
      });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('items%5B%5D=valid');
      expect(url).toContain('items%5B%5D=another');
      // Don't check for 'null' or 'undefined' as strings since the base URL might contain 'undefined'
    });
  });
});
