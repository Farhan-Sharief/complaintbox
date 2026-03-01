import AnimatedNumber from "./AnimatedNumber";

export default function StatCard({
  title,
  value,
  gradient,
  percentage,
}) {
  return (
    <div className={`p-6 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-xl relative overflow-hidden`}>

      <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} opacity-30 blur-3xl`} />

      <p className="text-sm text-gray-400">{title}</p>

      <h2 className="text-2xl font-bold mt-3 text-white">
        <AnimatedNumber value={value} />
      </h2>

      {percentage && (
        <p className={`mt-2 text-sm ${percentage > 0 ? "text-green-400" : "text-red-400"}`}>
          {percentage > 0 ? "+" : ""}{percentage}% vs last month
        </p>
      )}
    </div>
  );
}