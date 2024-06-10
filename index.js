document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registration");
    const loginForm = document.getElementById("login");
    const errorDisplay = document.getElementById("errorDisplay");
  
    const displayError = (message) => {
      errorDisplay.innerHTML = message;
      errorDisplay.style.display = "block";
    };
  
    const hideError = () => {
      errorDisplay.style.display = "none";
    };
  
    const validateUsername = (username) => {
      const validNamePattern = /^[a-zA-Z0-9]+$/;
  
      if (username.length < 4) return "Username needs to be at least 4 characters long.";
      if (!validNamePattern.test(username)) return "Username should not contain special characters.";
    };
  
    const validateEmail = (email) => {
      const validEmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const domainPattern = /@example\.com$/;
  
      if (!validEmailPattern.test(email)) return "Email format is invalid.";
      if (domainPattern.test(email)) return "Email should not be from example.com domain.";
    };
  
    const validatePassword = (password, username) => {
      const validPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{12,}$/i;
  
      if (password.length < 12) return "Password should be at least 12 characters long.";
      if (!validPasswordPattern.test(password)) return "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.";
      if (password.toLowerCase().includes("password")) return "Password should not be 'password'.";
      if (password.toLowerCase().includes(username.toLowerCase())) return "Password should not contain username.";
    };
  
    const validateRegistrationForm = (event) => {
      event.preventDefault();
      hideError();
  
      const username = registrationForm.username.value.trim();
      const email = registrationForm.email.value.trim();
      const password = registrationForm.password.value.trim();
      const passwordCheck = registrationForm.passwordCheck.value.trim();
      const terms = registrationForm.terms.checked;
  
      let error = validateUsername(username);
      if (error) {
        displayError(error);
        registrationForm.username.focus();
        return;
      }
  
      error = validateEmail(email);
      if (error) {
        displayError(error);
        registrationForm.email.focus();
        return;
      }
  
      error = validatePassword(password, username);
      if (error) {
        displayError(error);
        registrationForm.password.focus();
        return;
      }
  
      if (password !== passwordCheck) {
        displayError("Passwords do not match.");
        registrationForm.passwordCheck.focus();
        return;
      }
  
      if (!terms) {
        displayError("You must agree to the Terms of Use.");
        registrationForm.terms.focus();
        return;
      }
  
      const storedUsernames = localStorage.getItem("usernames") || "";
      const lowerUsername = username.toLowerCase();
      const usernamesArray = storedUsernames ? storedUsernames.split(",") : [];
      const usernameExists = usernamesArray.includes(lowerUsername);
  
      if (usernameExists) {
        displayError("That username is already taken.");
        registrationForm.username.focus();
        return;
      }
  
      localStorage.setItem(lowerUsername + "_email", email.toLowerCase());
      localStorage.setItem(lowerUsername + "_password", password);
      usernamesArray.push(lowerUsername);
      localStorage.setItem("usernames", usernamesArray.join(","));
  
      alert("Registration successful!");
      registrationForm.reset();
    };
  
    const validateLoginForm = (event) => {
      event.preventDefault();
      hideError();
  
      const username = loginForm.username.value.trim().toLowerCase();
      const password = loginForm.password.value.trim();
  
      const storedEmail = localStorage.getItem(username + "_email");
      const storedPassword = localStorage.getItem(username + "_password");
  
      alert("Login successful!");
      loginForm.reset();
    };
  
    registrationForm.addEventListener("submit", validateRegistrationForm);
    loginForm.addEventListener("submit", validateLoginForm);
  });
  