// JavaScript to handle sticky header resize effect
window.addEventListener('scroll', function() {
    var header = document.querySelector('.wrapper');
    if (window.scrollY > 50) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

// Functions to show and hide forms
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
}

function closeLoginForm() {
    document.getElementById('loginForm').style.display = 'none';
}

function showSignupForm() {
    document.getElementById('signupForm').style.display = 'block';
}

function closeSignupForm() {
    document.getElementById('signupForm').style.display = 'none';
}

function login() {
    // Handle login logic here
    alert('Login function not implemented');
}

function signup() {
    // Handle signup logic here
    alert('Signup function not implemented');
}
