import uuid
from datetime import datetime, timedelta

appointments = [
    {"id": str(uuid.uuid4()), "patientName": "Rajesh Kumar", "date": "2025-11-06", "time": "09:00", "duration": 30, "doctorName": "Dr. Sarah Johnson", "status": "Confirmed", "mode": "In-Person"},
    {"id": str(uuid.uuid4()), "patientName": "Priya Sharma", "date": "2025-11-06", "time": "09:30", "duration": 30, "doctorName": "Dr. Sarah Johnson", "status": "Scheduled", "mode": "Online"},
    {"id": str(uuid.uuid4()), "patientName": "Amit Patel", "date": "2025-11-06", "time": "10:00", "duration": 45, "doctorName": "Dr. Michael Chen", "status": "Upcoming", "mode": "In-Person"},
    {"id": str(uuid.uuid4()), "patientName": "Sneha Reddy", "date": "2025-11-06", "time": "11:00", "duration": 30, "doctorName": "Dr. Michael Chen", "status": "Cancelled", "mode": "Online"},
    {"id": str(uuid.uuid4()), "patientName": "Vikram Singh", "date": "2025-11-07", "time": "09:00", "duration": 60, "doctorName": "Dr. Sarah Johnson", "status": "Scheduled", "mode": "In-Person"},
    {"id": str(uuid.uuid4()), "patientName": "Neha Gupta", "date": "2025-11-07", "time": "10:30", "duration": 30, "doctorName": "Dr. Michael Chen", "status": "Confirmed", "mode": "Online"},
    {"id": str(uuid.uuid4()), "patientName": "Arjun Mehta", "date": "2025-11-08", "time": "09:00", "duration": 45, "doctorName": "Dr. Sarah Johnson", "status": "Upcoming", "mode": "In-Person"},
    {"id": str(uuid.uuid4()), "patientName": "Pooja Nair", "date": "2025-11-08", "time": "10:00", "duration": 30, "doctorName": "Dr. Michael Chen", "status": "Scheduled", "mode": "Online"},
    {"id": str(uuid.uuid4()), "patientName": "Rohit Verma", "date": "2025-11-09", "time": "09:30", "duration": 30, "doctorName": "Dr. Sarah Johnson", "status": "Confirmed", "mode": "In-Person"},
    {"id": str(uuid.uuid4()), "patientName": "Kiran Rao", "date": "2025-11-09", "time": "11:00", "duration": 60, "doctorName": "Dr. Michael Chen", "status": "Upcoming", "mode": "Online"}
]

def get_appointments(filters=None):
    data = appointments.copy()
    if filters:
        if filters.get("date"):
            data = [a for a in data if a["date"] == filters["date"]]
        if filters.get("status"):
            data = [a for a in data if a["status"] == filters["status"]]
        if filters.get("doctorName"):
            data = [a for a in data if a["doctorName"] == filters["doctorName"]]
    return data

def update_appointment_status(id, new_status):
    for a in appointments:
        if a["id"] == id:
            a["status"] = new_status
            return a
    raise ValueError("Not found")

def create_appointment(payload):
    required = ["patientName", "date", "time", "duration", "doctorName", "mode"]
    for r in required:
        if r not in payload:
            raise ValueError("Invalid payload")

    start = datetime.strptime(payload["date"] + " " + payload["time"], "%Y-%m-%d %H:%M")
    end = start + timedelta(minutes=payload["duration"])

    for a in appointments:
        if a["doctorName"] == payload["doctorName"] and a["date"] == payload["date"]:
            s = datetime.strptime(a["date"] + " " + a["time"], "%Y-%m-%d %H:%M")
            e = s + timedelta(minutes=a["duration"])
            if start < e and end > s:
                raise ValueError("Conflict")

    appointment = {
        "id": str(uuid.uuid4()),
        "patientName": payload["patientName"],
        "date": payload["date"],
        "time": payload["time"],
        "duration": payload["duration"],
        "doctorName": payload["doctorName"],
        "status": payload.get("status", "Scheduled"),
        "mode": payload["mode"]
    }

    appointments.append(appointment)
    return appointment

def delete_appointment(id):
    global appointments
    before = len(appointments)
    appointments = [a for a in appointments if a["id"] != id]
    return len(appointments) < before
