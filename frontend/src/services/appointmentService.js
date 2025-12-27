import { v4 as uuid } from "uuid"

let appointments = [
  { id: uuid(), patientName: "Rajesh Kumar", date: "2025-11-06", time: "09:00", duration: 30, doctorName: "Dr. Sarah Johnson", status: "Confirmed", mode: "In-Person" },
  { id: uuid(), patientName: "Priya Sharma", date: "2025-11-06", time: "09:30", duration: 30, doctorName: "Dr. Sarah Johnson", status: "Scheduled", mode: "Online" },
  { id: uuid(), patientName: "Amit Patel", date: "2025-11-06", time: "10:00", duration: 45, doctorName: "Dr. Michael Chen", status: "Upcoming", mode: "In-Person" }
]

export const getAppointments = (filters = {}) => {
  let data = [...appointments]
  if (filters.date) data = data.filter(a => a.date === filters.date)
  if (filters.status) data = data.filter(a => a.status === filters.status)
  return data
}

export const createAppointment = (payload) => {
  const required = ["patientName", "date", "time", "duration", "doctorName", "mode"]
  required.forEach(f => {
    if (!payload[f]) throw new Error("Invalid payload")
  })

  const start = new Date(`${payload.date}T${payload.time}`)
  const end = new Date(start.getTime() + payload.duration * 60000)

  appointments.forEach(a => {
    if (a.doctorName === payload.doctorName && a.date === payload.date) {
      const s = new Date(`${a.date}T${a.time}`)
      const e = new Date(s.getTime() + a.duration * 60000)
      if (start < e && end > s) throw new Error("Time conflict")
    }
  })

  const appointment = {
    id: uuid(),
    status: "Scheduled",
    ...payload
  }

  appointments.push(appointment)
  return appointment
}

export const updateAppointmentStatus = (id, status) => {
  appointments = appointments.map(a =>
    a.id === id ? { ...a, status } : a
  )
}

export const deleteAppointment = (id) => {
  appointments = appointments.filter(a => a.id !== id)
}
