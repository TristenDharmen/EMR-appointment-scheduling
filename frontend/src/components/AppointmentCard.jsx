export default function AppointmentCard({ data, onStatusChange }) {
  const statusStyles = {
    Scheduled: "bg-blue-100 text-blue-700",
    Confirmed: "bg-green-100 text-green-700",
    Upcoming: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700"
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow transition">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
          {data.patientName[0]}
        </div>

        <div>
          <div className="font-medium">{data.patientName}</div>
          <div className="text-sm text-gray-500">
            {data.doctorName} • {data.time} ({data.duration}m)
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 text-xs rounded-full ${statusStyles[data.status]}`}>
          {data.status}
        </span>

        <button
          onClick={() => onStatusChange(data.id)}
          className="text-sm text-primary hover:underline"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}
