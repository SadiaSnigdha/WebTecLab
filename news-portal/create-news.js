
document.addEventListener('DOMContentLoaded', async () => {
    const user = checkAuthentication();
    if (!user) return;

    displayLoggedInUser(user);

    const logoutBtn = document.getElementById('logoutBtn');
    const createNewsForm = document.getElementById('createNewsForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const newsTitle = document.getElementById('newsTitle');
    const newsBody = document.getElementById('newsBody');
    const titleError = document.getElementById('titleError');
    const bodyError = document.getElementById('bodyError');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    logoutBtn.addEventListener('click', () => {
        removeLoggedInUser();
        goToLogin();
    });

    cancelBtn.addEventListener('click', () => {
        goToNewsList();
    });

    createNewsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        clearMessage('titleError');
        clearMessage('bodyError');
        clearMessage('errorMessage');
        clearMessage('successMessage');

        const title = newsTitle.value.trim();
        const body = newsBody.value.trim();

      
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
            await createNews(title, body, user.id);
            successMessage.textContent = 'News created successfully!';
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                goToNewsList();
            }, 1500);
        } catch (error) {
            console.error('Failed to create news:', error);
            errorMessage.textContent = 'Failed to create news. Please try again.';
            errorMessage.style.display = 'block';
        }
    });
});
