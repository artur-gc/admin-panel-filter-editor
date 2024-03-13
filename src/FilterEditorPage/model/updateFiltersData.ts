import { ILocationsForFilterProps } from "../const/const"

export async function updateFiltersData(authHeader: string, filterData: ILocationsForFilterProps) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/filters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
            body: JSON.stringify(filterData),
        })
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Fetch error:", error)
        throw error
    }
}
//
