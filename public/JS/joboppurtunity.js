// function handleSubmit(event) {
//   event.preventDefault();

//   const formData = {
//     title: document.getElementById("title").value,
//     category: document.getElementById("category").value,
//     company: document.getElementById("company").value,
//     location: document.getElementById("location").value,
//     applyLink: document.getElementById("applyLink").value,
//     description: document.getElementById("description").value,
//   };

//   // Log form data (replace with your actual submission logic)
//   console.log("Form submitted:", formData);

//   // Optional: Show success message
//   alert("Opportunity posted successfully!");

//   // Optional: Reset form
//   event.target.reset();
// }

// // Add input validation for URL field
// document.getElementById("applyLink").addEventListener("input", function (e) {
//   if (e.target.value && !e.target.value.startsWith("http")) {
//     e.target.value = "https://" + e.target.value;
//   }
// });

// // Add smooth focus transitions
// const inputs = document.querySelectorAll("input, select, textarea");
// inputs.forEach((input) => {
//   input.addEventListener("focus", function () {
//     this.parentElement.classList.add("focused");
//   });

//   input.addEventListener("blur", function () {
//     this.parentElement.classList.remove("focused");
//   });
// });
