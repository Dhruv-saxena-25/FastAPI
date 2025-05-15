from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
import json
import os

app = FastAPI()

# Allow CORS for local frontend testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to the frontend directory
FRONTEND_DIR = os.path.abspath("../frontend")
PATIENTS_FILE = "patients.json"

# Serve static files
app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

# Patient data model
class Patient(BaseModel):
    patientId: str
    name: str
    age: int
    gender: str
    contact: str
    address: str
    medicalHistory: str | None = None
    allergies: str | None = None

# Helper functions to read and write patient data
def load_patients():
    try:
        with open(PATIENTS_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def save_patients(patients):
    with open(PATIENTS_FILE, "w") as file:
        json.dump(patients, file, indent=4)

# CRUD API Endpoints

@app.post("/patients/")
async def add_patient(patient: Patient):
    patients = load_patients()
    if any(p["patientId"] == patient.patientId for p in patients):
        raise HTTPException(status_code=400, detail="Patient ID already exists")
    patients.append(patient.dict())
    save_patients(patients)
    return patient

@app.get("/patients/")
async def get_patients():
    return load_patients()

@app.get("/patients/{patient_id}")
async def get_patient(patient_id: str):
    patients = load_patients()
    patient = next((p for p in patients if p["patientId"] == patient_id), None)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@app.put("/patients/{patient_id}")
async def update_patient(patient_id: str, updated_patient: Patient):
    patients = load_patients()
    for i, patient in enumerate(patients):
        if patient["patientId"] == patient_id:
            patients[i] = updated_patient.dict()
            save_patients(patients)
            return updated_patient
    raise HTTPException(status_code=404, detail="Patient not found")

@app.delete("/patients/{patient_id}")
async def delete_patient(patient_id: str):
    patients = load_patients()
    filtered_patients = [p for p in patients if p["patientId"] != patient_id]
    if len(filtered_patients) == len(patients):
        raise HTTPException(status_code=404, detail="Patient not found")
    save_patients(filtered_patients)
    return {"message": "Patient deleted successfully"}

# Serve Frontend Pages
@app.get("/create")
async def serve_create():
    return FileResponse(os.path.join(FRONTEND_DIR, "create.html"))

@app.get("/read")
async def serve_read():
    return FileResponse(os.path.join(FRONTEND_DIR, "read.html"))

@app.get("/update")
async def serve_update():
    return FileResponse(os.path.join(FRONTEND_DIR, "update.html"))

@app.get("/delete")
async def serve_delete():
    return FileResponse(os.path.join(FRONTEND_DIR, "delete.html"))

@app.get("/")
async def serve_home():
    return JSONResponse({"message": "Welcome to the Patient Management System. Use /create, /read, /update, or /delete to access the respective pages."})
