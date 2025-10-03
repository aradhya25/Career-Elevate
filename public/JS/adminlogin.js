document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const rememberCheckbox = document.getElementById('remember');

    // Function to validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to show error
    const showError = (input, errorElement, message) => {
        input.classList.add('error');
        errorElement.textContent = message;
    };

    // Function to clear error
    const clearError = (input, errorElement) => {
        input.classList.remove('error');
        errorElement.textContent = '';
    };

    // Email validation
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Email is required');
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else {
            clearError(emailInput, emailError);
        }
    });

    // Password validation
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, passwordError, 'Password is required');
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
        } else {
            clearError(passwordInput, passwordError);
        }
    });

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.src = type === 'password'
            ? 'https://raw.githubusercontent.com/stackblitz/stackblitz-icons/master/files/eye.svg'
            : 'https://raw.githubusercontent.com/stackblitz/stackblitz-icons/master/files/eye-off.svg';
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        let isValid = true;

        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        // Validate password
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, passwordError, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError(passwordInput, passwordError);
        }

        if (!isValid) {
            e.preventDefault(); // 🚨 Prevent submission only if invalid
        } else {
            // Optional: console log for debugging
            console.log('Form submitted:', {
                email: emailInput.value,
                password: passwordInput.value,
                remember: rememberCheckbox.checked
            });
            // ✅ Let the form submit naturally to the backend
        }
    });
});
