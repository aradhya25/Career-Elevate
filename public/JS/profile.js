document.addEventListener("DOMContentLoaded", () => {
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Handle sidebar navigation
    const sideMenuLinks = document.querySelectorAll('.side-menu a');
    const dashboardSection = document.querySelector('.dashboard-section');
    const editProfileSection = document.querySelector('.edit-profile-section');

    if (sideMenuLinks.length > 0 && dashboardSection && editProfileSection) {
        sideMenuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all links
                sideMenuLinks.forEach(l => l.classList.remove('active'));

                // Add active class to clicked link
                link.classList.add('active');

                // Show/hide sections based on clicked link
                if (link.textContent.includes('Dashboard')) {
                    dashboardSection.classList.remove('hidden');
                    editProfileSection.classList.add('hidden');
                } else if (link.textContent.includes('Edit Profile')) {
                    dashboardSection.classList.add('hidden');
                    editProfileSection.classList.remove('hidden');
                }
            });
        });
    }

    // Handle appointment actions
    const joinButtons = document.querySelectorAll('.btn-join');
    const cancelButtons = document.querySelectorAll('.btn-cancel');

    if (joinButtons.length > 0) {
        joinButtons.forEach(button => {
            if (!button.disabled) {
                button.addEventListener('click', () => {
                    alert('The session link will be sent to your registered email address approximately 10 minutes prior to the scheduled start time.');
                });
            }
        });
    }

    if (cancelButtons.length > 0) {
        cancelButtons.forEach(button => {
            button.addEventListener('click', () => {
                const confirmCancel = confirm('Are you sure you want to cancel this appointment?');
                if (confirmCancel) {
                    alert('Appointment cancelled successfully!');
                    // Here you would typically handle the cancellation logic
                }
            });
        });
    }

    // // Make past appointments black and white
    // document.addEventListener("DOMContentLoaded", () => {
    //     const appointments = document.querySelectorAll(".appointment-card");
    
    //     appointments.forEach((appointment) => {
    //         const dateStr = appointment.getAttribute("data-appointment-date"); // e.g., "2025-03-16"
    //         const timeStr = appointment.getAttribute("data-appointment-time"); // e.g., "08:30 PM"
    
    //         if (dateStr && timeStr) {
    //             // Convert to a valid Date object considering AM/PM format
    //             const appointmentDateTime = parseAppointmentDateTime(dateStr, timeStr);
    //             const currentDateTime = new Date(); // Get the current date and time
    
    //             console.log("Checking:", appointmentDateTime, "vs", currentDateTime);
    
    //             if (appointmentDateTime <= currentDateTime) {
    //                 appointment.classList.add("past-appointment");
    
    //                 // Disable all buttons inside past appointments
    //                 appointment.querySelectorAll("button").forEach((btn) => {
    //                     btn.disabled = true;
    //                 });
    //             }
    //         }
    //     });
    // });
    
    // /**
    //  * Converts date and time strings into a valid JavaScript Date object.
    //  */
    // function parseAppointmentDateTime(dateStr, timeStr) {
    //     // Convert time (e.g., "08:30 PM") into 24-hour format
    //     let [time, modifier] = timeStr.split(" ");
    //     let [hours, minutes] = time.split(":").map(Number);
    
    //     if (modifier === "PM" && hours !== 12) {
    //         hours += 12;
    //     }
    //     if (modifier === "AM" && hours === 12) {
    //         hours = 0;
    //     }
    
    //     // Construct a valid Date object in YYYY-MM-DD HH:MM:SS format
    //     return new Date(`${dateStr}T${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`);
    // }
    

});
