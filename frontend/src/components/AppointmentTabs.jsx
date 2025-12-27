export default function AppointmentTabs({ active, onChange }) {
  const tabs = ["Today", "Upcoming", "Past"]

  return (
    <div className="flex gap-3 mb-6">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 rounded-full text-sm transition ${
            active === tab
              ? "bg-primary text-white shadow"
              : "bg-white text-gray-600 border hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
