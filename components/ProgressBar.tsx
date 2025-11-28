export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
      <div
        className="h-2 bg-gradient-to-r from-blue-600 to-teal-500 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
