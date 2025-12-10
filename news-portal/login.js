// Login Page Script
document.addEventListener('DOMContentLoaded', async () => {
    const userSelect = document.getElementById('userSelect');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Check if user already logged in
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        goToNewsList();
        return;
    }

    // Load users from API
    try {
        const users = await getAllUsers();
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = JSON.stringify(user);
            option.textContent = user.name;
            userSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to load users:', error);
        errorMessage.textContent = 'Failed to load users. Please try again.';
        errorMessage.style.display = 'block';
    }

    // Handle login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        clearMessage('errorMessage');
        
        const selectedValue = userSelect.value;
        if (!selectedValue) {
            errorMessage.textContent = 'Please select a user.';
            errorMessage.style.display = 'block';
            return;
        }

        try {
            const user = JSON.parse(selectedValue);
            saveLoggedInUser(user);
            goToNewsList();
        } catch (error) {
            console.error('Login error:', error);
            errorMessage.textContent = 'An error occurred during login.';
            errorMessage.style.display = 'block';
        }
    });
});
