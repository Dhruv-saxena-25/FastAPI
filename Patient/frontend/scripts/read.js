async function loadPatients() {
    try {
        const response = await fetch("http://localhost:8000/patients/");
        const patients = await response.json();
        const patientList = document.getElementById("patientList");
        patientList.innerHTML = "";
        patients.forEach(patient => {
            const li = document.createElement("li");
            li.textContent = `${patient.patientId} - ${patient.name} (${patient.age} years)`;
            patientList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading patients:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadPatients);
