import { useState } from "react"

export default function CreateAppointmentModal({ onCreate, onClose }) {
  const [form, setForm] = useState({
    patientName: "",
    date: "",
    time: "",
    duration: 30,
    doctorName: "",
    mode: "In-Person"
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white w-96 p-6 rounded-lg">
        <input className="w-full mb-3 border p-2" placeholder="Patient Name" onChange={e => setForm({...form, patientName: e.target.value})}/>
        <input type="date" className="w-full mb-3 border p-2" onChange={e => setForm({...form, date: e.target.value})}/>
        <input type="time" className="w-full mb-3 border p-2" onChange={e => setForm({...form, time: e.target.value})}/>
        <input type="number" className="w-full mb-3 border p-2" onChange={e => setForm({...form, duration: Number(e.target.value)})}/>
        <input className="w-full mb-3 border p-2" placeholder="Doctor Name" onChange={e => setForm({...form, doctorName: e.target.value})}/>
        <select className="w-full mb-4 border p-2" onChange={e => setForm({...form, mode: e.target.value})}>
          <option>In-Person</option>
          <option>Online</option>
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onCreate(form)} className="bg-primary text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
