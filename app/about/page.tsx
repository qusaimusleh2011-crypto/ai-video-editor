export default function AboutPage() {
  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold">How it Works</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="text-center">
          <div className="text-2xl font-bold">Upload</div>
          <p className="mt-2 text-sm opacity-80">Provide your raw footage and preferences.</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">AI Edit</div>
          <p className="mt-2 text-sm opacity-80">Our AI trims, adds music, captions, and color grading.</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">Download</div>
          <p className="mt-2 text-sm opacity-80">Get your finished video in multiple resolutions.</p>
        </div>
      </div>
    </main>
  );
}
