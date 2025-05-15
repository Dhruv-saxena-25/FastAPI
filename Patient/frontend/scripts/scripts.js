document.getElementById("patientForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const patientId = document.getElementById("patientId").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const contact = document.getElementById("contact").value;
    const address = document.getElementById("address").value;
    const medicalHistory = document.getElementById("medicalHistory").value;
    const allergies = document.getElementById("allergies").value;

    if (patientId && name && age && gender && contact && address) {
        const patientData = {
            patientId,
            name,
            age,
            gender,
            contact,
            address,
            medicalHistory,
            allergies
        };

        console.log("Patient Data Submitted:", patientData);
        document.getElementById("successMessage").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("successMessage").classList.add("hidden");
            document.getElementById("patientForm").reset();
        }, 3000);
    }
});




// const API_BASE_URL = "http://localhost:8000/patients/";

// // Create patient
// document.getElementById("patientForm").addEventListener("submit", async function(event) {
//     event.preventDefault();

//     const patientData = {
//         patientId: document.getElementById("patientId").value,
//         name: document.getElementById("name").value,
//         age: parseInt(document.getElementById("age").value),
//         gender: document.getElementById("gender").value,
//         contact: document.getElementById("contact").value,
//         address: document.getElementById("address").value,
//         medicalHistory: document.getElementById("medicalHistory").value,
//         allergies: document.getElementById("allergies").value
//     };

//     try {
//         const response = await fetch(API_BASE_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(patientData)
//         });
//         const result = await response.json();
//         if (response.ok) {
//             alert("Patient added successfully");
//             loadPatients();  // Refresh the patient list
//             this.reset();
//         } else {
//             alert("Error: " + result.detail);
//         }
//     } catch (error) {
//         console.error("Error adding patient:", error);
//     }
// });

// // Load all patients
// async function loadPatients() {
//     try {
//         const response = await fetch(API_BASE_URL);
//         const patients = await response.json();
//         const patientList = document.getElementById("patientList");
//         patientList.innerHTML = "";
//         patients.forEach(patient => {
//             const li = document.createElement("li");
//             li.textContent = `${patient.patientId} - ${patient.name} (${patient.age} years)`;
//             li.addEventListener("click", () => deletePatient(patient.patientId));
//             patientList.appendChild(li);
//         });
//     } catch (error) {
//         console.error("Error loading patients:", error);
//     }
// }

// // Delete patient
// async function deletePatient(patientId) {
//     try {
//         const response = await fetch(API_BASE_URL + patientId, {
//             method: "DELETE"
//         });
//         const result = await response.json();
//         alert(result.message);
//         loadPatients();  // Refresh the patient list
//     } catch (error) {
//         console.error("Error deleting patient:", error);
//     }
// }

// // Load patients on page load
// document.addEventListener("DOMContentLoaded", loadPatients);
