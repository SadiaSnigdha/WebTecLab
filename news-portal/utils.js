const API_BASE_URL = 'http://localhost:5000/api';

async function fetchAPI(endpoint, options = {}) {
    console.log('Fetching:', API_BASE_URL + endpoint, options);
    try {
        const token = getAuthToken();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        console.log('Request headers:', headers);
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers,
            ...options
        });

        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
            throw new Error(data.message || `HTTP Error: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('Fetch API Error Details:', {
            message: error.message,
            endpoint: endpoint,
            fullUrl: API_BASE_URL + endpoint,
            error: error
        });
        throw error;
    }
}

// Authentication functions
async function login(email, password) {
    const response = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    
    if (response.success && response.data) {
        saveAuthToken(response.data.token);
        saveLoggedInUser(response.data.user);
        return response.data;
    }
    throw new Error(response.message || 'Login failed');
}

async function register(name, email, password) {
    const response = await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
    });
    
    if (response.success && response.data) {
        saveAuthToken(response.data.token);
        saveLoggedInUser(response.data.user);
        return response.data;
    }
    throw new Error(response.message || 'Registration failed');
}

async function getMe() {
    const response = await fetchAPI('/auth/me');
    if (response.success && response.data) {
        saveLoggedInUser(response.data);
        return response.data;
    }
    return null;
}

function saveAuthToken(token) {
    localStorage.setItem('authToken', token);
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

function removeAuthToken() {
    localStorage.removeItem('authToken');
}

function logout() {
    removeAuthToken();
    removeLoggedInUser();
    goToLogin();
}

async function getAllUsers() {
    const response = await fetchAPI('/users');
    return response.data || [];
}

async function getUserById(id) {
    const response = await fetchAPI(`/users/${id}`);
    return response.data;
}

async function getUserName(userId) {
    const user = await getUserById(userId);
    return user.name;
}

async function getAllNews() {
    const response = await fetchAPI('/news');
    console.log('getAllNews - Full response:', response);
    console.log('getAllNews - response.data:', response.data);
    console.log('getAllNews - response.data?.news:', response.data?.news);
    const newsArray = response.data?.news || [];
    console.log('getAllNews - Returning array:', newsArray, 'Length:', newsArray.length);
    return newsArray;
}

async function getNewsById(id) {
    const response = await fetchAPI(`/news/${id}`);
    console.log('getNewsById - Full response:', response);
    console.log('getNewsById - response.data:', response.data);
    console.log('getNewsById - response.data.news:', response.data.news);
    return response.data.news;
}

async function createNews(title, body) {
    const response = await fetchAPI('/news', {
        method: 'POST',
        body: JSON.stringify({ title, body })
    });
    return response.data;
}

async function updateNews(id, updates) {
    const response = await fetchAPI(`/news/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
    });
    return response.data;
}

async function deleteNews(id) {
    const response = await fetchAPI(`/news/${id}`, {
        method: 'DELETE'
    });
    return response.data;
}

async function addComment(newsId, content) {
    const response = await fetchAPI(`/news/${newsId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text: content })
    });
    return response.data;
}

function saveLoggedInUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}

function removeLoggedInUser() {
    localStorage.removeItem('loggedInUser');
}


function validateNewsTitle(title) {
    const trimmed = title ? title.trim() : '';
    return trimmed.length >= 5 && trimmed.length <= 255;
}

function validateNewsBody(body) {
    const trimmed = body ? body.trim() : '';
    return trimmed.length >= 10;
}

function validateComment(text) {
    return text && text.trim().length > 0;
}


function showMessage(elementId, message, type = 'error') {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = type === 'success' ? 'success-message' : 'error-message';
        element.style.display = 'block';
        if (type === 'success') {
            setTimeout(() => {
                element.style.display = 'none';
            }, 3000);
        }
    }
}

function clearMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

function displayLoggedInUser(user) {
    const element = document.getElementById('loggedInUser');
    if (element) {
        element.textContent = `Logged in as: ${user.name}`;
    }
}


function goToLogin() {
    window.location.href = 'index.html';
}

function goToNewsList() {
    window.location.href = 'news-list.html';
}

function goToCreateNews() {
    window.location.href = 'create-news.html';
}

function goToNewsDetail(newsId) {
    window.location.href = `news-detail.html?id=${newsId}`;
}

function goToEditNews(newsId) {
    window.location.href = `edit-news.html?id=${newsId}`;
}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


function checkAuthentication() {
    const user = getLoggedInUser();
    if (!user) {
        goToLogin();
        return null;
    }
    return user;
}
