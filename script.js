document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const passwordInput = document.getElementById("password");
    const strengthMeter = document.getElementById("strengthMeter");

    // 1. Password Strength Logic
    passwordInput.addEventListener("input", function() {
        let value = passwordInput.value;
        let strength = 0;
        
        strengthMeter.className = "";
        if (value.length === 0) {
            strengthMeter.style.width = "0%";
            return;
        }

        if (value.length >= 8) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[@$!%*?&]/.test(value)) strength++;
        
        if (strength <= 1) strengthMeter.classList.add("weak");
        else if (strength <= 3) strengthMeter.classList.add("medium");
        else strengthMeter.classList.add("strong");
    });

    // 2. Auto-format names (Title Case)
    function formatName(input) {
        input.value = input.value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    }

    ["firstName", "middleName", "lastName"].forEach(id => {
        document.getElementById(id).addEventListener("blur", function() {
            formatName(this);
        });
    });

    // 3. Form Submission
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let isValid = true;

        const firstName = document.getElementById("firstName");
        const middleName = document.getElementById("middleName");
        const lastName = document.getElementById("lastName");
        const course = document.getElementById("course");
        const password = document.getElementById("password");
        const gender = document.getElementsByName("gender");
        const terms = document.getElementById("terms");

        const nameRegex = /^[A-Za-z\s]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        
        document.querySelectorAll(".error").forEach(el => el.textContent = "");

        if (!nameRegex.test(firstName.value.trim())) { 
            showError(firstName, "Only letters allowed"); isValid = false; 
        }
        if (middleName.value && !nameRegex.test(middleName.value.trim())) { 
            showError(middleName, "Only letters allowed"); isValid = false; 
        }
        if (!nameRegex.test(lastName.value.trim())) { 
            showError(lastName, "Only letters allowed"); isValid = false; 
        }
        if (course.value === "") { 
            showError(course, "Please select a course"); isValid = false; 
        }
        if (!passwordRegex.test(password.value)) { 
            showError(password, "Does not meet complexity rules"); isValid = false; 
        }
        
        let genderSelected = false; 
        gender.forEach(g => { if(g.checked) genderSelected = true; });
        if (!genderSelected) { 
            showError(gender[0], "Please select gender"); isValid = false; 
        }
        
        if (!terms.checked) { 
            showError(terms, "You must accept terms"); isValid = false; 
        }

        if (isValid) { 
            alert("Registration Successful!"); 
            form.reset(); 
            strengthMeter.className = ""; 
            strengthMeter.style.width = "0%";
        }
    });

    function showError(input, message) {
        const container = input.closest('div[class^="form-group"]');
        const errorElement = container.querySelector(".error");
        if (errorElement) errorElement.textContent = message;
    }
});