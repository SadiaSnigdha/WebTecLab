// Edit News Page Script
document.addEventListener('DOMContentLoaded', async () => {
    const user = checkAuthentication();
    if (!user) return;

    displayLoggedInUser(user);

    const logoutBtn = document.getElementById('logoutBtn');
    const editNewsForm = document.getElementById('editNewsForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const newsTitle = document.getElementById('newsTitle');
    const newsBody = document.getElementById('newsBody');
    const titleError = document.getElementById('titleError');
    const bodyError = document.getElementById('bodyError');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    const newsId = parseInt(getQueryParam('id'));
    if (!newsId) {
        errorMessage.textContent = 'Invalid news ID.';
        errorMessage.style.display = 'block';
        return;
    }

    // Load news
    try {
        const news = await getNewsById(newsId);

        // Check if user is the author
        if (parseInt(news.author_id) !== parseInt(user.id)) {
            errorMessage.textContent = 'You are not authorized to edit this news.';
            errorMessage.style.display = 'block';
            editNewsForm.style.display = 'none';
            return;
        }

        // Pre-fill form
        newsTitle.value = news.title;
        newsBody.value = news.body;
    } catch (error) {
        console.error('Failed to load news:', error);
        errorMessage.textContent = 'Failed to load news.';
        errorMessage.style.display = 'block';
    }

    logoutBtn.addEventListener('click', () => {
        removeLoggedInUser();
        goToLogin();
    });

    cancelBtn.addEventListener('click', () => {
        goToNewsList();
    });

    editNewsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        clearMessage('titleError');
        clearMessage('bodyError');
        clearMessage('errorMessage');
        clearMessage('successMessage');

        const title = newsTitle.value.trim();
        const body = newsBody.value.trim();

        // Validate
        let isValid = true;

        if (!validateNewsTitle(title)) {
            titleError.textContent = 'Title cannot be empty.';
            titleError.style.display = 'block';
            isValid = false;
        }

        if (!validateNewsBody(body)) {
            bodyError.textContent = 'Body must be at least 20 characters.';
            bodyError.style.display = 'block';
            isValid = false;
        }

        if (!isValid) return;

        try {
            await updateNews(newsId, {
                title: title,
                body: body
            });
            successMessage.textContent = 'News updated successfully!';
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                goToNewsDetail(newsId);
            }, 1500);
        } catch (error) {
            console.error('Failed to update news:', error);
            errorMessage.textContent = 'Failed to update news. Please try again.';
            errorMessage.style.display = 'block';
        }
    });
});
