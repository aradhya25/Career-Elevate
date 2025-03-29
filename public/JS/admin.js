// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Handle sidebar navigation
const sideMenuLinks = document.querySelectorAll('.side-menu a');
const dashboardSection = document.querySelector('.dashboard-section');
const usersSection = document.querySelector('.users-section');
const appointmentsSection = document.querySelector('.appointments-section');

sideMenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        sideMenuLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Show/hide sections based on clicked link
        const linkText = link.textContent.trim();
        
        // Hide all sections first
        dashboardSection.classList.add('hidden');
        usersSection.classList.add('hidden');
        appointmentsSection.classList.add('hidden');
        
        // Show the appropriate section
        if (linkText.includes('Dashboard')) {
            dashboardSection.classList.remove('hidden');
        } else if (linkText.includes('Users')) {
            usersSection.classList.remove('hidden');
        } else if (linkText.includes('Appointments')) {
            appointmentsSection.classList.remove('hidden');
        }
    });
});

// Handle user actions
// document.addEventListener("DOMContentLoaded", () => {
//     const table = document.querySelector("table");
//     if (!table) return; // Prevent errors if table is missing

//     table.addEventListener("click", async (event) => {
//         const button = event.target.closest("button");
//         if (!button) return;

//         const row = button.closest("tr");
//         const userId = button.getAttribute("data-id"); // Correct way to get ID

//         if (!userId) {
//             console.error("User ID is missing");
//             alert("Error: User ID is missing.");
//             return;
//         }

//         if (button.classList.contains("btn-edit")) {
//             alert(`Edit user ${userId}`);
//             if (typeof openEditModal === "function") {
//                 openEditModal(userId);
//             } else {
//                 console.warn("openEditModal function is not defined!");
//             }
//         }

//         if (button.classList.contains("btn-delete")) {
//             const confirmDelete = confirm(`Are you sure you want to delete user with ID: ${userId}?`);
//             if (confirmDelete) {
//                 try {
//                     const response = await fetch(`/admin/users/${userId}`, {
//                         method: "DELETE",
//                         headers: { "Content-Type": "application/json" },
//                     });

//                     if (!response.ok) {
//                         const errorData = await response.json();
//                         throw new Error(errorData.message || "Failed to delete user.");
//                     }

//                     alert("User deleted successfully!");
//                     row.remove();
//                 } catch (error) {
//                     console.error("Error deleting user:", error);
//                     alert("An error occurred while deleting the user. Please try again.");
//                 }
//             }
//         }
//     });
// });



// Handle navigation links
const navbarLinks = document.querySelectorAll('.nav-links a');

navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const linkText = link.textContent.trim().toLowerCase();

        // ✅ Allow "Logout" to work normally
        if (linkText === "logout") {
            return; // Do not override default behavior
        }

        e.preventDefault(); // Prevent default navigation for other links

        // Remove active class from all navbar links
        navbarLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // ✅ Find matching sidebar link and trigger click
        const sidebarLink = Array.from(sideMenuLinks).find(l => 
            l.textContent.trim().toLowerCase() === linkText
        );

        if (sidebarLink) {
            sidebarLink.click();
        } else {
            console.warn(`Sidebar link not found for: ${linkText}`);
        }
    });
});
