document.getElementById("deleteForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const patientId = document.getElementById("patientId").value;

    try {
        const response = await fetch(`http://localhost:8000/patients/${patientId}`, {
            method: "DELETE"
        });
        const result = await response.json();
        document.getElementById("message").innerText = result.message;
    } catch (error) {
        console.error("Error deleting patient:", error);
    }
});
