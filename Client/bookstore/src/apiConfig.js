let base = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';
// normalize: remove trailing slashes
base = base.replace(/\/+$/g, '');
// ensure it ends with /api
if (!base.endsWith('/api')) base = `${base}/api`;

const API_BASE_URL = base;

export default API_BASE_URL;
