/**
 * Daily Manfaat — API Client
 * 
 * Handles JWT token injection, automated refresh flow, and
 * standardizes API requests.
 */

const API_BASE_URL = 'http://localhost:8080/api';

class ApiClient {
    constructor() {
        this.accessToken = localStorage.getItem('access_token');
        this.refreshToken = localStorage.getItem('refresh_token');
    }

    setTokens(access, refresh) {
        this.accessToken = access;
        this.refreshToken = refresh;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    }

    clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    async _fetch(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.accessToken) {
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }

        const config = {
            ...options,
            headers
        };

        let response = await fetch(url, config);

        // Handle 401 Unauthorized (Token expired)
        if (response.status === 401 && this.refreshToken) {
            const refreshed = await this._doRefresh();
            if (refreshed) {
                // Retry original request with new token
                headers['Authorization'] = `Bearer ${this.accessToken}`;
                response = await fetch(url, { ...config, headers });
            } else {
                this.clearTokens();
                window.location.href = 'sign-up.html';
                return null;
            }
        }

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMsg = data?.error?.message || response.statusText;
            throw new Error(errorMsg);
        }

        return data;
    }

    async _doRefresh() {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh_token: this.refreshToken })
            });

            if (!res.ok) return false;

            const data = await res.json();
            this.accessToken = data.access_token;
            localStorage.setItem('access_token', data.access_token);
            return true;
        } catch (e) {
            return false;
        }
    }

    // ── Public Methods ──────────────────────────────

    get(endpoint, options = {}) {
        return this._fetch(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, body, options = {}) {
        return this._fetch(endpoint, { 
            ...options, 
            method: 'POST',
            body: JSON.stringify(body) 
        });
    }

    put(endpoint, body, options = {}) {
        return this._fetch(endpoint, { 
            ...options, 
            method: 'PUT',
            body: JSON.stringify(body) 
        });
    }

    patch(endpoint, body, options = {}) {
        return this._fetch(endpoint, { 
            ...options, 
            method: 'PATCH',
            body: JSON.stringify(body) 
        });
    }

    delete(endpoint, options = {}) {
        return this._fetch(endpoint, { ...options, method: 'DELETE' });
    }
}

// Export singleton
window.api = new ApiClient();
