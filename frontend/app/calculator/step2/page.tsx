"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// Page 2: Renovation Options
// Fields to implement: renovation_type, quality, energy_upgrade

interface EstimateBreakdown {
    base_cost: number
    renovation_type_multiplier: number
    quality_multiplier: number
    floor_multiplier: number
    surface_subtotal: number
    bathrooms_cost: number
    energy_upgrade_cost: number
    labor_cost: number
    total: number
}

interface EstimateResult {
    input: {
        surface: number
        renovation_type: string
        quality: string
        bathrooms: number
        floor: string
        energy_upgrade: boolean
    }
    breakdown: EstimateBreakdown
}

export default function CalculatorStep2Page() {
    const { data: session } = useSession()
    const router = useRouter()

    const [result, setResult] = useState<EstimateResult | null>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // TODO: Implement form state for renovation options
    // - renovation_type: "full" | "partial" | "minimal"
    // - quality: "high" | "medium" | "economy"
    // - energy_upgrade: boolean

    // TODO: Retrieve property details from step 1 (localStorage, context, or query params)

    const handleBack = () => {
        router.push("/calculator")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        setResult(null)

        try {
            // TODO: Combine data from step 1 and step 2, then call API
            // const formData = { ...step1Data, ...step2Data }

            const res = await fetch(`${API_URL}/api/calculate/estimate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session?.accessToken}`
                },
                body: JSON.stringify({
                    // TODO: Add combined form data here
                })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Calculation failed")
                return
            }

            setResult(data)
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR"
        }).format(value)
    }

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Renovation Calculator</h1>
                    <Link
                        href="/dashboard"
                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center mb-8">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                            ✓
                        </div>
                        <span className="ml-2 text-gray-600">Property Details</span>
                    </div>
                    <div className="flex-1 h-1 bg-blue-600 mx-4"></div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            2
                        </div>
                        <span className="ml-2 font-medium">Renovation Options</span>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">Step 2: Renovation Options</h2>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        {/* TODO: Implement form fields */}
                        {/* 
                            Required fields:
                            - Renovation Type: select with options full/partial/minimal
                            - Quality Level: select with options high/medium/economy
                            - Energy Upgrade: checkbox
                        */}

                        <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="mb-2">📝 Form fields to implement:</p>
                            <ul className="text-sm">
                                <li>• Renovation Type (full/partial/minimal)</li>
                                <li>• Quality Level (high/medium/economy)</li>
                                <li>• Energy Upgrade (checkbox)</li>
                            </ul>
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                            >
                                ← Back
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Calculating..." : "Calculate Estimate"}
                            </button>
                        </div>
                    </form>

                    {/* Results Panel */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">Estimate Results</h2>

                        {!result ? (
                            <div className="text-gray-500 text-center py-8">
                                <p>Fill in the form and click "Calculate Estimate" to see results.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Cost Breakdown */}
                                <div className="border-b pb-4">
                                    <h3 className="font-medium text-gray-700 mb-2">Cost Breakdown</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Base Cost ({result.input.surface} m²)</span>
                                            <span>{formatCurrency(result.breakdown.base_cost)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>× Type Multiplier</span>
                                            <span>{result.breakdown.renovation_type_multiplier}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>× Quality Multiplier</span>
                                            <span>{result.breakdown.quality_multiplier}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>× Floor Multiplier</span>
                                            <span>{result.breakdown.floor_multiplier}</span>
                                        </div>
                                        <div className="flex justify-between font-medium">
                                            <span>Surface Subtotal</span>
                                            <span>{formatCurrency(result.breakdown.surface_subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Bathrooms ({result.input.bathrooms})</span>
                                            <span>{formatCurrency(result.breakdown.bathrooms_cost)}</span>
                                        </div>
                                        {result.breakdown.energy_upgrade_cost > 0 && (
                                            <div className="flex justify-between">
                                                <span>Energy Upgrade (+15%)</span>
                                                <span>{formatCurrency(result.breakdown.energy_upgrade_cost)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Labor Cost (for time estimate) */}
                                <div className="border-b pb-4">
                                    <h3 className="font-medium text-gray-700 mb-2">Labor Cost (Manodopera)</h3>
                                    <div className="flex justify-between">
                                        <span>~50% of total</span>
                                        <span>{formatCurrency(result.breakdown.labor_cost)}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="pt-2">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total Estimate</span>
                                        <span className="text-blue-600">{formatCurrency(result.breakdown.total)}</span>
                                    </div>
                                </div>

                                {/* TODO: Add Time Estimate display here */}
                                {/* 
                                    Time Estimate = labor_cost / daily_team_cost
                                    See docs/time-estimate.md for the formula
                                */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
