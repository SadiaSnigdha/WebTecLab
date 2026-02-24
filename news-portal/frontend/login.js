document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Check if user is already logged in
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        goToNewsList();
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        console.log('Login form submitted');
        
        clearMessage('errorMessage');
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        console.log('Login attempt with email:', email);

        if (!email || !password) {
            errorMessage.textContent = 'Please enter both email and password.';
            errorMessage.style.display = 'block';
            return;
        }

        try {
            // Disable submit button
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Logging in...';

            console.log('Calling login function...');
            const result = await login(email, password);
            console.log('Login successful:', result);
            
            goToNewsList();
        } catch (error) {
            console.error('Login error details:', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            
            let errorMsg = 'An error occurred during login.';
            if (error.message) {
                if (error.message.includes('fetch')) {
                    errorMsg = 'Cannot connect to server. Please ensure the backend is running on http://localhost:5000';
                } else {
                    errorMsg = error.message;
                }
            }
            
            errorMessage.textContent = errorMsg;
            errorMessage.style.display = 'block';
            
            // Re-enable submit button
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.textContent = 'Login';
        }
    });
});
