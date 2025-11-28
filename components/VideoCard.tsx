export default function VideoCard({ title, src }: { title: string; src: string }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <video src={src} controls className="w-full h-48 object-cover bg-black" />
      <div className="p-4">
        <h4 className="font-semibold">{title}</h4>
      </div>
    </div>
  );
}
