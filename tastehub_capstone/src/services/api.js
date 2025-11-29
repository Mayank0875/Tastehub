// API base URL - use environment variable or default to localhost
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Financial API
export const financialAPI = {
  generate: async (profile) => {
    return apiCall('/financial/generate', {
      method: 'POST',
      body: JSON.stringify({ profile }),
    });
  },

  getFRSBreakdown: async (vasooliScore, transactions, rentSecured) => {
    return apiCall('/financial/frs-breakdown', {
      method: 'POST',
      body: JSON.stringify({ vasooliScore, transactions, rentSecured }),
    });
  },

  analyzeIrregularity: async (transactions) => {
    return apiCall('/financial/analyze-irregularity', {
      method: 'POST',
      body: JSON.stringify({ transactions }),
    });
  },
};

// Transactions API
export const transactionsAPI = {
  getAll: async (userId) => {
    return apiCall(`/transactions/${userId}`);
  },

  add: async (userId, transaction) => {
    return apiCall(`/transactions/${userId}`, {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  },

  update: async (userId, transactionId, updates) => {
    return apiCall(`/transactions/${userId}/${transactionId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  delete: async (userId, transactionId) => {
    return apiCall(`/transactions/${userId}/${transactionId}`, {
      method: 'DELETE',
    });
  },
};

// User State API
export const userAPI = {
  getState: async (userId) => {
    return apiCall(`/users/${userId}/state`);
  },

  updateState: async (userId, state) => {
    return apiCall(`/users/${userId}/state`, {
      method: 'POST',
      body: JSON.stringify(state),
    });
  },

  reset: async (userId) => {
    return apiCall(`/users/${userId}/reset`, {
      method: 'POST',
    });
  },
};

// Health check
export const healthCheck = async () => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  try {
    const response = await fetch(`${base}/health`);
    return response.ok;
  } catch {
    return false;
  }
};

