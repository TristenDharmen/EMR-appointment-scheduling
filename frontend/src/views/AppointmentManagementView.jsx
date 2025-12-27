import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import AppointmentCard from "../components/AppointmentCard"
import CreateAppointmentModal from "../components/CreateAppointmentModal"
import AppointmentTabs from "../components/AppointmentTabs"
import { getAppointments, createAppointment, updateAppointmentStatus } from "../services/appointmentService.js"

export default function AppointmentManagementView() {
  const [appointments, setAppointments] = useState([])
  const [activeTab, setActiveTab] = useState("Today")
  const [showModal, setShowModal] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  const load = () => setAppointments(getAppointments())

  useEffect(() => { load() }, [])

  const filtered = appointments.filter(a => {
    if (activeTab === "Today") return a.date === today
    if (activeTab === "Upcoming") return a.date > today
    if (activeTab === "Past") return a.date < today
    return true
  })

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Appointment Management</h1>
            <p className="text-sm text-gray-500">Manage today and upcoming appointments</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + New Appointment
          </button>
        </div>

        <AppointmentTabs active={activeTab} onChange={setActiveTab} />

        <div className="space-y-3">
          {filtered.map(a => (
            <AppointmentCard
              key={a.id}
              data={a}
              onStatusChange={(id) => {
                updateAppointmentStatus(id, "Confirmed")
                load()
              }}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <CreateAppointmentModal
          onClose={() => setShowModal(false)}
          onCreate={(data) => {
            createAppointment(data)
            setShowModal(false)
            load()
          }}
        />
      )}
    </div>
  )
}
