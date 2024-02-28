export async function getLocationData(authHeader: string) {
    try {
        const response = await fetch(
            "https://website-api.mangopond-520280d6.westus.azurecontainerapps.io/admin/filters",
            {
                headers: {
                    Authorization: authHeader,
                },
            }
        )
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
