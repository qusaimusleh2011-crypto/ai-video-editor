export default function DashboardPage() {
  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2">Saved videos and account actions will appear here.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <h4 className="font-semibold">My Videos</h4>
              <p className="text-sm mt-2 opacity-80">No videos yet — upload to get started.</p>
            </div>
            <div className="border rounded p-4">
              <h4 className="font-semibold">Re-edit</h4>
              <p className="text-sm mt-2 opacity-80">Re-run AI edits on previous projects.</p>
            </div>
          </div>
        </div>

        <div className="border rounded p-4">
          <h4 className="font-semibold">Account</h4>
          <p className="text-sm mt-2">Manage subscription, payments, and connected cloud drives.</p>
        </div>
      </div>
    </main>
  );
}
