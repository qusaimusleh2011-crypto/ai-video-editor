export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">ClipSpark</h4>
            <p className="text-sm text-gray-400">Edit videos in seconds with AI.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/pricing" className="hover:text-blue-400">Pricing</a></li>
              <li><a href="/docs" className="hover:text-blue-400">Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li><a href="/privacy" className="hover:text-blue-400">Privacy</a></li>
              <li><a href="/terms" className="hover:text-blue-400">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-sm text-gray-400">support@clipspark.ai</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ClipSpark. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
