export default function PricingPage() {
  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold">Free</h3>
          <p className="mt-2">Limited edits, 1GB max, watermarked output.</p>
          <ul className="mt-4 list-disc list-inside">
            <li>1 free edit/day</li>
            <li>Watermark</li>
            <li>Basic styles</li>
          </ul>
          <div className="mt-4"><button className="px-4 py-2 border rounded">Get Started</button></div>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold">Premium</h3>
          <p className="mt-2">Unlimited edits, no watermark, higher resolutions, priority processing.</p>
          <ul className="mt-4 list-disc list-inside">
            <li>Unlimited edits</li>
            <li>No watermark</li>
            <li>1080p / 4K output</li>
          </ul>
          <div className="mt-4"><button className="px-4 py-2 bg-blue-600 text-white rounded">Subscribe</button></div>
        </div>
      </div>
    </main>
  );
}
