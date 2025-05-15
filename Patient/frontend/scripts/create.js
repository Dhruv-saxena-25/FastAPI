document.getElementById("createForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const patientData = {
        patientId: document.getElementById("patientId").value,
        name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        contact: document.getElementById("contact").value,
        address: document.getElementById("address").value,
        medicalHistory: document.getElementById("medicalHistory").value,
        allergies: document.getElementById("allergies").value
    };

    try {
        const response = await fetch("http://localhost:8000/patients/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patientData)
        });
        const result = await response.json();
        document.getElementById("message").innerText = "Patient created successfully!";
        this.reset();
    } catch (error) {
        console.error("Error creating patient:", error);
    }
});
