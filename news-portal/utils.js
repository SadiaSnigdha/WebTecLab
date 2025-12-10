const API_BASE_URL = 'http://localhost:3000';

async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

async function getAllUsers() {
    return await fetchAPI('/users');
}

async function getUserById(id) {
    return await fetchAPI(`/users/${id}`);
}

async function getUserName(userId) {
    const user = await getUserById(userId);
    return user.name;
}

async function getAllNews() {
    return await fetchAPI('/news');
}

async function getNewsById(id) {
    return await fetchAPI(`/news/${id}`);
}

async function createNews(title, body, authorId) {
    return await fetchAPI('/news', {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
            author_id: authorId,
            createdAt: new Date().toISOString(),
            comments: []
        })
    });
}

async function updateNews(id, updates) {
    return await fetchAPI(`/news/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
    });
}

async function deleteNews(id) {
    return await fetchAPI(`/news/${id}`, {
        method: 'DELETE'
    });
}

async function addComment(newsId, userId, text) {
    const news = await getNewsById(newsId);
    const newComment = {
        id: Date.now(),
        user_id: userId,
        text: text
    };
    news.comments.push(newComment);
    return await updateNews(newsId, { comments: news.comments });
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
    return title && title.trim().length > 0;
}

function validateNewsBody(body) {
    return body && body.trim().length >= 20;
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
