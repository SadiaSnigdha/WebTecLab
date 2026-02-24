
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
        logout();
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
            titleError.textContent = 'Title must be between 5 and 255 characters.';
            titleError.style.display = 'block';
            isValid = false;
        }

        if (!validateNewsBody(body)) {
            bodyError.textContent = 'Body must be at least 10 characters.';
            bodyError.style.display = 'block';
            isValid = false;
        }

        if (!isValid) return;

        try {
            console.log('Creating news with:', { title, body });
            const result = await createNews(title, body);
            console.log('News created successfully:', result);
            
            successMessage.textContent = 'News created successfully!';
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                goToNewsList();
            }, 1500);
        } catch (error) {
            console.error('Failed to create news - Full error:', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            
            let errorMsg = 'Failed to create news. Please try again.';
            if (error.message) {
                if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                    errorMsg = 'Session expired. Please login again.';
                    setTimeout(() => logout(), 2000);
                } else if (error.message.includes('fetch')) {
                    errorMsg = 'Cannot connect to server. Please ensure backend is running.';
                } else {
                    errorMsg = error.message;
                }
            }
            
            errorMessage.textContent = errorMsg;
            errorMessage.style.display = 'block';
        }
    });
});
