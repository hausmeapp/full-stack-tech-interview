"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Page 1: Property Details
// Fields to implement: surface (m²), floor, bathrooms

export default function CalculatorStep1Page() {
    const { data: session } = useSession()
    const router = useRouter()

    // TODO: Implement form state for property details
    // - surface: number (1-10000 m²)
    // - floor: "ground" | "intermediate" | "top"  
    // - bathrooms: number (0-20)

    const handleNext = () => {
        // TODO: Store form data and navigate to step 2
        // router.push("/calculator/step2")
    }

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
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
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            1
                        </div>
                        <span className="ml-2 font-medium">Property Details</span>
                    </div>
                    <div className="flex-1 h-1 bg-gray-300 mx-4"></div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold">
                            2
                        </div>
                        <span className="ml-2 text-gray-500">Renovation Options</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Step 1: Property Details</h2>

                    {/* TODO: Implement form fields */}
                    {/* 
                        Required fields:
                        - Surface (m²): number input, min=1, max=10000
                        - Floor Location: select with options ground/intermediate/top
                        - Number of Bathrooms: number input, min=0, max=20
                    */}

                    <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="mb-2">📝 Form fields to implement:</p>
                        <ul className="text-sm">
                            <li>• Surface (m²)</li>
                            <li>• Floor Location</li>
                            <li>• Number of Bathrooms</li>
                        </ul>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                            disabled
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
