// ---------------------------
// Add User to LocalStorage
// ---------------------------
function addUser() {
    const name = document.getElementById("name").value;
    const skill = document.getElementById("skill").value;
    const cgpa = document.getElementById("cgpa")?.value || "";

    if (!name || !skill) {
        alert("Please fill all fields!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({ name, skill, cgpa });
    localStorage.setItem("users", JSON.stringify(users));

    alert("User added successfully!");
    loadUsers();
}


// ---------------------------
// Load Users (Dashboard Page)
// ---------------------------
function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const list = document.getElementById("usersList");

    if (!list) return;

    list.innerHTML = users
        .map(u => `<li><b>${u.name}</b> — ${u.skill} (CGPA: ${u.cgpa || "NA"})</li>`)
        .join("");
}


// ---------------------------
// Create Study Group
// ---------------------------
function createGroup() {
    const groupName = document.getElementById("groupName").value;
    const groupTopic = document.getElementById("groupTopic").value;

    if (!groupName || !groupTopic) {
        alert("Fill all fields!");
        return;
    }

    let groups = JSON.parse(localStorage.getItem("groups")) || [];

    groups.push({ groupName, groupTopic });
    localStorage.setItem("groups", JSON.stringify(groups));

    alert("Group Created!");
    loadGroups();
}


// ---------------------------
// Load Groups
// ---------------------------
function loadGroups() {
    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    const list = document.getElementById("groupsList");

    if (!list) return;

    list.innerHTML = groups
        .map(g => `<li><b>${g.groupName}</b> — ${g.groupTopic}</li>`)
        .join("");
}


// ---------------------------
// Auto-load on page load
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    loadGroups();
});