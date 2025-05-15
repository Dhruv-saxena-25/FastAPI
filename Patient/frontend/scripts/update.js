document.getElementById("updateForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const patientId = document.getElementById("patientId").value;

    try {
        const response = await fetch(`http://localhost:8000/patients/${patientId}`);
        if (response.ok) {
            const patient = await response.json();
            alert(`Updating Patient: ${patient.name}`);
        } else {
            alert("Patient not found");
        }
    } catch (error) {
        console.error("Error loading patient:", error);
    }
});
