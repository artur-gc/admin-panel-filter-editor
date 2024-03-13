export async function getLocationData() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/filters`, {})
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
