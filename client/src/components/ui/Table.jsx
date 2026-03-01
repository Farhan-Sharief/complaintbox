export default function Table({ columns, data, onDelete }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-5">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            {columns.map((col) => (
              <th key={col} className="pb-3">{col}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-800">
              <td className="py-3">{item.source}</td>
              <td>₹{item.amount}</td>
              <td>{item.date}</td>
              <td>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}