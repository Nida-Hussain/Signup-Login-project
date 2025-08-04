let userData = [];

function getData() {
    return userData;
}

function showSignup() {
    document.getElementById('signup-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
    document.querySelectorAll('.toggle-btn')[0].classList.add('active');
    document.querySelectorAll('.toggle-btn')[1].classList.remove('active');
    clearErrors();
}

function showLogin() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('signup-form').classList.remove('active');
    document.querySelectorAll('.toggle-btn')[1].classList.add('active');
    document.querySelectorAll('.toggle-btn')[0].classList.remove('active');
    clearErrors();
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function signUp() {
    clearErrors();

    const nameVal = document.getElementById("name");
    const emailVal = document.getElementById("email");
    const passwordVal = document.getElementById("password");

    let hasError = false;


    if (!nameVal.value.trim()) {
        showError('name', 'Name is required');
        hasError = true;
    }

    if (!emailVal.value.trim()) {
        showError('email', 'Email is required');
        hasError = true;
    } else if (!validateEmail(emailVal.value)) {
        showError('email', 'Please enter a valid email');
        hasError = true;
    }

    if (!passwordVal.value) {
        showError('password', 'Password is required');
        hasError = true;
    } else if (passwordVal.value.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        hasError = true;
    }

    if (hasError) return;


    const users = getData();
    const existingUser = users.find(user => user.email === emailVal.value);
    if (existingUser) {
        showError('email', 'Email already registered');
        return;
    }

    const details = {
        name: nameVal.value.trim(),
        email: emailVal.value.trim(),
        password: passwordVal.value
    };

    userData.push(details);

    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Account created successfully',
        confirmButtonColor: '#667eea'
    }).then(() => {

        nameVal.value = '';
        emailVal.value = '';
        passwordVal.value = '';
        showLogin();
    });
}

function login() {
    clearErrors();

    const emailVal = document.getElementById("l-email");
    const passwordVal = document.getElementById("l-password");

    let hasError = false;


    if (!emailVal.value.trim()) {
        showError('l-email', 'Email is required');
        hasError = true;
    }

    if (!passwordVal.value) {
        showError('l-password', 'Password is required');
        hasError = true;
    }

    if (hasError) return;

    const users = getData();
    const userFound = users.find(user => user.email === emailVal.value.trim());

    if (userFound) {
        if (userFound.password === passwordVal.value) {
            Swal.fire({
                icon: 'success',
                title: 'Welcome back!',
                text: `Hello ${userFound.name}, login successful`,
                confirmButtonColor: '#667eea'
            }).then(() => {
                emailVal.value = '';
                passwordVal.value = '';
            });
        } else {
            showError('l-password', 'Invalid password');
        }
    } else {
        showError('l-email', 'User not found. Please sign up first.');
    }
}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const activeForm = document.querySelector('.form-section.active');
        if (activeForm.id === 'signup-form') {
            signUp();
        } else {
            login();
        }
    }
});