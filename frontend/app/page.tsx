import Link from "next/link"
import { auth } from "@/auth"

export default async function HomePage() {
    const session = await auth()

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="max-w-2xl text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    HausMe Interview
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Renovation Cost Calculator
                </p>

                <div className="flex gap-4 justify-center">
                    {session ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Go to Dashboard
                            </Link>
                            <Link
                                href="/calculator"
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                Calculator
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/login"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/auth/register"
                                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}
