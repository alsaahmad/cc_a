/* ================================
   CAMPUSCONNECT – LOCAL STORAGE JS
   ================================ */

/* ========= SIGNUP ========= */
function signupUser() {
    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert("User already exists!");
        return;
    }

    let newUser = {
        name,
        email,
        password,
        skills: [],
        groups: [],
        profile: {}
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now login.");
    window.location.href = "login.html";
}

/* ========= LOGIN ========= */
function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Invalid email or password!");
        return;
    }

    localStorage.setItem("loggedInUser", email);
    window.location.href = "dashboard.html";
}

/* ========= CHECK LOGIN ========= */
function getLoggedInUser() {
    let email = localStorage.getItem("loggedInUser");
    if (!email) return null;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(u => u.email === email);
}

/* ========= LOGOUT ========= */
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

/* ========= LOAD DASHBOARD ========= */
function loadDashboard() {
    let user = getLoggedInUser();
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("userName").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;

    loadSkills();
    loadGroups();
}

/* ========= SKILLS: ADD ========= */
function addSkill() {
    let user = getLoggedInUser();
    let skill = document.getElementById("skillInput").value;

    if (skill === "") {
        alert("Enter a skill!");
        return;
    }

    user.skills.push(skill);

    updateUser(user);
    loadSkills();

    document.getElementById("skillInput").value = "";
}

/* ========= SKILLS: LOAD ========= */
function loadSkills() {
    let user = getLoggedInUser();
    let box = document.getElementById("skillsList");

    if (!box) return;

    box.innerHTML = "";

    user.skills.forEach((skill, index) => {
        box.innerHTML += `
            <div class="skill-item">
                ${skill}
                <button onclick="deleteSkill(${index})">X</button>
            </div>
        `;
    });
}

/* ========= SKILLS: DELETE ========= */
function deleteSkill(index) {
    let user = getLoggedInUser();
    user.skills.splice(index, 1);
    updateUser(user);
    loadSkills();
}

/* ========= GROUPS: ADD ========= */
function addGroup() {
    let user = getLoggedInUser();
    let gname = document.getElementById("groupInput").value;

    if (gname === "") {
        alert("Enter group name!");
        return;
    }

    user.groups.push(gname);

    updateUser(user);
    loadGroups();

    document.getElementById("groupInput").value = "";
}

/* ========= GROUPS: LOAD ========= */
function loadGroups() {
    let user = getLoggedInUser();
    let box = document.getElementById("groupsList");

    if (!box) return;

    box.innerHTML = "";

    user.groups.forEach((g, index) => {
        box.innerHTML += `
            <div class="group-item">
                ${g}
                <button onclick="deleteGroup(${index})">X</button>
            </div>
        `;
    });
}

/* ========= GROUPS: DELETE ========= */
function deleteGroup(i) {
    let user = getLoggedInUser();
    user.groups.splice(i, 1);
    updateUser(user);
    loadGroups();
}

/* ========= STUDENT DIRECTORY ========= */
function loadDirectory() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let box = document.getElementById("studentsBox");

    if (!box) return;

    box.innerHTML = "";

    users.forEach(u => {
        box.innerHTML += `
            <div class="student-card">
                <h3>${u.name}</h3>
                <p>Email: ${u.email}</p>
                <p>Skills: ${u.skills.join(", ") || "No skills added"}</p>
            </div>
        `;
    });
}

/* ========= UPDATE USER ========= */
function updateUser(updatedUser) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let index = users.findIndex(u => u.email === updatedUser.email);
    users[index] = updatedUser;

    localStorage.setItem("users", JSON.stringify(users));
}
