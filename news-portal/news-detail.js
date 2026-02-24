document.addEventListener('DOMContentLoaded', async () => {
    const user = checkAuthentication();
    if (!user) return;

    displayLoggedInUser(user);

    const logoutBtn = document.getElementById('logoutBtn');
    const backBtn = document.getElementById('backBtn');
    const newsDetail = document.getElementById('newsDetail');
    const addCommentForm = document.getElementById('addCommentForm');
    const commentText = document.getElementById('commentText');
    const commentError = document.getElementById('commentError');
    const commentMessage = document.getElementById('commentMessage');

    logoutBtn.addEventListener('click', () => {
        logout();
    });

    backBtn.addEventListener('click', () => {
        goToNewsList();
    });

    const newsId = parseInt(getQueryParam('id'));
    if (!newsId) {
        newsDetail.innerHTML = '<p class="error-message">Invalid news ID.</p>';
        return;
    }

    await loadNewsDetail(newsId);

    addCommentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        clearMessage('commentError');
        clearMessage('commentMessage');

        const text = commentText.value.trim();

        if (!validateComment(text)) {
            commentError.textContent = 'Comment cannot be empty.';
            commentError.style.display = 'block';
            return;
        }

        try {
            await addComment(newsId, text);
            commentMessage.textContent = 'Comment added successfully!';
            commentMessage.className = 'message success';
            commentMessage.style.display = 'block';
            commentText.value = '';
            
            setTimeout(async () => {
                await loadNewsDetail(newsId);
                clearMessage('commentMessage');
            }, 1000);
        } catch (error) {
            console.error('Failed to add comment:', error);
            
            let errorMsg = 'Failed to add comment. Please try again.';
            if (error.message) {
                if (error.message.includes('Token has expired') || 
                    error.message.includes('401') || 
                    error.message.includes('Unauthorized')) {
                    errorMsg = 'Your session has expired. Please login again.';
                    setTimeout(() => logout(), 2000);
                } else {
                    errorMsg = error.message;
                }
            }
            
            commentMessage.textContent = errorMsg;
            commentMessage.className = 'message error';
            commentMessage.style.display = 'block';
        }
    });
});

async function loadNewsDetail(newsId) {
    try {
        const news = await getNewsById(newsId);
        const user = getLoggedInUser();
        const newsDetail = document.getElementById('newsDetail');
        const commentsList = document.getElementById('commentsList');
        const commentCount = document.getElementById('commentCount');

        const authorName = news.author?.name || 'Unknown';

        newsDetail.innerHTML = `
            <h2>${escapeHtml(news.title)}</h2>
            <div class="news-meta">
                <strong>Author:</strong> ${escapeHtml(authorName)}<br>
                <strong>Published:</strong> ${formatDate(news.createdAt)}
            </div>
            <div class="news-body">
                ${escapeHtml(news.body)}
            </div>
            <div class="detail-actions">
                ${parseInt(news.authorId) === parseInt(user.id) ? `
                    <button class="btn btn-success" onclick="goToEditNews(${news.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteNewsItem(${news.id})">Delete</button>
                ` : ''}
                <button class="btn btn-secondary" onclick="goToNewsList()">← Back to News List</button>
            </div>
        `;

        commentCount.textContent = news.comments ? news.comments.length : 0;

        if (!news.comments || news.comments.length === 0) {
            commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
        } else {
            commentsList.innerHTML = '';
            console.log('Loading comments:', news.comments);
            for (const comment of news.comments) {
                const commenterName = comment.user?.name || 'Unknown';
                const commentText = comment.text || '';
                console.log('Rendering comment:', { commenterName, commentText });
                
                const commentElement = document.createElement('div');
                commentElement.className = 'comment-item';
                commentElement.innerHTML = `
                    <div class="comment-author">${escapeHtml(commenterName)}</div>
                    <div class="comment-text">${escapeHtml(commentText)}</div>
                `;
                commentsList.appendChild(commentElement);
            }
        }
    } catch (error) {
        console.error('Failed to load news detail:', error);
        document.getElementById('newsDetail').innerHTML = '<p class="error-message">Failed to load news.</p>';
    }
}

async function deleteNewsItem(newsId) {
    const user = getLoggedInUser();
    const news = await getNewsById(newsId);

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
        goToNewsList();
    } catch (error) {
        console.error('Failed to delete news:', error);
        alert('Failed to delete news.');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
