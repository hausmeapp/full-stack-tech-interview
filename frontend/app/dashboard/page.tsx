import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <form
                        action={async () => {
                            "use server"
                            await signOut({ redirectTo: "/" })
                        }}
                    >
                        <button
                            type="submit"
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
                        >
                            Logout
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Welcome, {session.user.name}!</h2>
                    <p className="text-gray-600">Email: {session.user.email}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/calculator"
                        className="block p-6 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition"
                    >
                        <h3 className="text-lg font-semibold text-green-800">Renovation Calculator</h3>
                        <p className="text-green-600 mt-2">Calculate renovation costs for your property</p>
                    </Link>

                    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Coming Soon</h3>
                        <p className="text-gray-600 mt-2">More features will be available soon</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
