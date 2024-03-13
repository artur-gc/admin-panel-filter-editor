import { useEffect } from "react"
import { ILocationsForFilterProps } from "../../../FilterEditorPage/const/const"

interface IUseLocationsDataProps {
    setFiltersData: (data: ILocationsForFilterProps) => void
}

export function useLocationsData({ setFiltersData }: IUseLocationsDataProps) {
    // const [authorization, setAuthorization] = useState("")

    useEffect(() => {
        // const authHeader = prompt("Please enter the authorization header:")
        // if (authHeader) {
        //     setAuthorization(authHeader)
        getLocationData()
            .then(data => {
                setFiltersData(data)
            })
            .catch(error => console.error("Fetch error:", error))
        // }
    }, [])

    async function getLocationData() {
        try {
            const response = await fetch(
                "https://website-api.mangopond-520280d6.westus.azurecontainerapps.io/admin/filters",
                {
                    // headers: {
                    //     Authorization: authorization,
                    // },
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
}
