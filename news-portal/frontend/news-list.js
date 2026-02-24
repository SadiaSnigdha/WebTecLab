
let allNews = [];
let filteredNews = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 5;

document.addEventListener('DOMContentLoaded', async () => {
    const user = checkAuthentication();
    if (!user) return;

    displayLoggedInUser(user);

    const logoutBtn = document.getElementById('logoutBtn');
    const createNewsBtn = document.getElementById('createNewsBtn');
    const searchInput = document.getElementById('searchInput');
    const newsList = document.getElementById('newsList');

    logoutBtn.addEventListener('click', () => {
        logout();
    });

    createNewsBtn.addEventListener('click', () => {
        goToCreateNews();
    });

    searchInput.addEventListener('input', (e) => {
        filterNews(e.target.value);
        currentPage = 1;
        displayNews();
    });

   
    await loadNews();
});

async function loadNews() {
    try {
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '<p class="loading">Loading news...</p>';
        
        console.log('loadNews - Starting to fetch news...');
        allNews = await getAllNews();
        console.log('loadNews - allNews received:', allNews, 'Length:', allNews.length);
        filteredNews = [...allNews];
        console.log('loadNews - filteredNews set:', filteredNews, 'Length:', filteredNews.length);
        displayNews();
    } catch (error) {
        console.error('Failed to load news:', error);
        document.getElementById('newsList').innerHTML = '<p class="error-message">Failed to load news.</p>';
    }
}

function filterNews(searchTerm) {
    filteredNews = allNews.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

async function displayNews() {
    const newsList = document.getElementById('newsList');
    const user = getLoggedInUser();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    if (filteredNews.length === 0) {
        newsList.innerHTML = '<p class="loading">No news found.</p>';
        updatePagination();
        return;
    }

    newsList.innerHTML = '';

    for (const news of paginatedNews) {
        const authorName = news.author?.name || 'Unknown';
        const isAuthor = parseInt(news.authorId) === parseInt(user.id);

        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';

        let actionsHTML = `
            <div class="news-actions">
                <button class="btn btn-primary" onclick="goToNewsDetail(${news.id})">View Details</button>
                <span class="comment-count">${news.comments ? news.comments.length : 0} comments</span>
        `;

        if (isAuthor) {
            actionsHTML += `
                <button class="btn btn-success" onclick="goToEditNews(${news.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteNewsItem(${news.id})">Delete</button>
            `;
        }

        actionsHTML += '</div>';

        newsElement.innerHTML = `
            <h3 onclick="goToNewsDetail(${news.id})">${escapeHtml(news.title)}</h3>
            <div class="news-meta">
                <strong>By:</strong> ${escapeHtml(authorName)} | 
                <strong>Date:</strong> ${formatDate(news.createdAt)}
            </div>
            <p class="news-preview">${escapeHtml(truncateText(news.body, 150))}</p>
            ${actionsHTML}
        `;

        newsList.appendChild(newsElement);
    }

    updatePagination();
}

function updatePagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage ? 'btn active' : 'btn';
        button.onclick = () => {
            currentPage = i;
            displayNews();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        pagination.appendChild(button);
    }
}

async function deleteNewsItem(newsId) {
    const user = getLoggedInUser();
    const news = allNews.find(n => n.id === newsId);

    if (parseInt(news.authorId) !== parseInt(user.id)) {
        alert('You can only delete news you created.');
        return;
    }

    if (!confirm('Are you sure you want to delete this news?')) {
        return;
    }

    try {
        await deleteNews(newsId);
        alert('News deleted successfully.');
        await loadNews();
    } catch (error) {
        console.error('Failed to delete news:', error);
        alert('Failed to delete news.');
    }
}

function truncateText(text, length) {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
