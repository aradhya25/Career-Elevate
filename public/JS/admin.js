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
       // e.preventDefault();
        
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

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", async (event) => {
            const userId = event.target.closest("button").dataset.userId; // Get user ID from data attribute
            const row = event.target.closest("tr"); // Get the row element

            const confirmDelete = confirm("Are you sure you want to delete this user?");
            if (!confirmDelete) return;

            try {
                const response = await fetch(`/admin/users/${userId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    row.remove(); // Remove row from table
                    alert("User deleted successfully!");
                } else {
                    alert("Failed to delete user.");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("An error occurred while deleting the user.");
            }
        });
    });
});


document.querySelectorAll(".btn-delete-appointment").forEach(button => {
    button.addEventListener("click", function () {
        const appointmentId = this.getAttribute("data-id");

        if (!appointmentId || appointmentId === "undefined") {
            alert("Invalid appointment ID.");
            return;
        }

        if (confirm("Are you sure you want to delete this appointment?")) {
            fetch(`/delete-appointment/${appointmentId}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Appointment deleted successfully!");
                    location.reload(); // Refresh the page after deleting
                } else {
                    alert("Failed to delete appointment.");
                }
            })
            .catch(error => console.error("Error:", error));
        }
    });
});



// Handle navigation links
const navbarLinks = document.querySelectorAll('.nav-links a');

navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const linkText = link.textContent.trim().toLowerCase();

        // ✅ Allow "Logout" to work normally
        if (linkText === "logout") {
            return; // Do not override default behavior
        }

        // e.preventDefault(); // Prevent default navigation for other links

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
