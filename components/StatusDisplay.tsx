export default function StatusDisplay({ message }: { message: string }) {
  return (
    <div className="mt-4 p-4 bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg text-blue-300 text-sm">
      {message}
    </div>
  );
}
