"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function RegisterPage() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Registration failed")
                return
            }

            // Auto login after successful registration
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            })

            if (result?.error) {
                router.push("/auth/login")
            } else {
                router.push("/dashboard")
                router.refresh()
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            minLength={6}
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    )
}
