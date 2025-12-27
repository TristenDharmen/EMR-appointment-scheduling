# EMR Appointment Scheduling System

## Overview
This project implements an end-to-end Appointment Scheduling and Queue Management feature for an EMR system. The frontend is built using React and Tailwind CSS, while the backend logic simulates AWS Lambda and AppSync using Python.

## Backend Design
The backend exposes the following operations:
- get_appointments(filters)
- create_appointment(payload)
- update_appointment_status(id, new_status)
- delete_appointment(id)

Appointments are stored in an in-memory structure simulating PostgreSQL (Aurora).

## GraphQL-style Contract
- getAppointments(filters: { date?, status?, doctorName? }) → Appointment[]
- createAppointment(input) → Appointment
- updateAppointmentStatus(id, status) → Appointment
- deleteAppointment(id) → Boolean

## Data Consistency Strategy
In a real system:
- Transactions would be used for create/update operations
- Unique constraints would prevent overlapping appointments per doctor
- Idempotency keys would avoid duplicate writes
- AppSync subscriptions would push real-time updates to clients

## Frontend Behavior
- Backend is the single source of truth
- No frontend-only state mutations
- UI updates only after backend operations
- Tabs filter appointments into Today, Upcoming, and Past

## Tech Stack
- React
- Tailwind CSS
- Python 3.x
