import { useEffect, useState } from "react"
import styles from "./FilterEditorPage.module.scss"
import { Input } from "../../shared/ui/Input/Input"
import { Textarea } from "../../shared/ui/Textarea/Textarea"
import { Button } from "../../shared/ui/Button/Button"
import { Typography } from "../../shared/ui/Typography/Typography"
import { getLocationData } from "../model/getLocationData"
import { updateFiltersData } from "../model/updateFiltersData"
import { Loader } from "../../shared/ui/Loader/Loader"
import { locationsForFilter } from "../const/const"

interface ILocationsForFilterProps {
    filters: { [key: string]: string[] }
}

export function FilterEditorPage() {
    const [filterData, setFilterData] = useState<ILocationsForFilterProps | null>(null)
    const [mainInputValue, setMainInputValue] = useState<string>("")
    const [textareaValue, setTextareaValue] = useState<string>("")
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [selectedKey, setSelectedKey] = useState<string | null>(null)
    const [newIndex, setNewIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [expandedKey, setExpandedKey] = useState<string | null>(null)

    function toggleExpandLocation(key: string) {
        if (expandedKey === key) {
            setExpandedKey(null)
        } else {
            setExpandedKey(key)
        }
    }

    useEffect(() => {
        getLocationData()
            .then(data => {
                setFilterData(data)
            })
            .catch(error => {
                console.error("Fetch error:", error)
            })
    }, [])

    async function handleUpdateFilterData() {
        const authHeader = await prompt("Please enter the authorization header:")
        try {
            if (!filterData) {
                return null
            }
            await updateFiltersData(authHeader || "", filterData)
        } catch (error) {
            console.log("Update filter data error")
        }
    }

    function addOrUpdateLocation(mainLocation: string, locationsArray: string[]) {
        const updatedLocationsState = filterData
            ? {
                  filters: {
                      ...filterData.filters,
                      [mainLocation]: locationsArray,
                  },
              }
            : { filters: { [mainLocation]: locationsArray } }

        setFilterData(updatedLocationsState)
    }

    function handleEdit(mainLocation: string) {
        if (filterData && filterData.filters[mainLocation]) {
            setMainInputValue(mainLocation)
            setTextareaValue(filterData.filters[mainLocation].join(",\n"))
            setIsEditing(true)
            setSelectedKey(mainLocation)
        }
    }

    function handleDelete(mainLocation: string) {
        if (filterData) {
            const updatedFilters = { ...filterData.filters }
            delete updatedFilters[mainLocation]
            setFilterData({ filters: updatedFilters })
        }
    }

    function changeFilterContent() {
        if (!mainInputValue.trim()) {
            alert("Main location cannot be empty.")
            return
        }

        const locationArray = textareaValue
            .split(/,|\n/)
            .map(location => location.trim())
            .filter(location => location !== "")

        addOrUpdateLocation(mainInputValue, locationArray)

        if (newIndex !== null && selectedKey && filterData) {
            const orderedKeys = Object.keys(filterData.filters).filter(key => key !== selectedKey)
            orderedKeys.splice(newIndex, 0, selectedKey)
            const updatedFilters = orderedKeys.reduce<{ [key: string]: string[] }>((acc, key) => {
                if (key === selectedKey) {
                    acc[key] = locationArray
                } else {
                    acc[key] = filterData.filters[key]
                }
                return acc
            }, {})

            setFilterData({ filters: updatedFilters })
        }

        setMainInputValue("")
        setTextareaValue("")
        setIsEditing(false)
        setSelectedKey(null)
        setNewIndex(null)
    }

    function getNewFiltersData() {
        setIsLoading(true)
        getLocationData()
            .then(data => {
                setFilterData(data)
            })
            .catch(error => {
                console.error("Fetch error:", error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function resetFiltersDataToDefault() {
        setFilterData(locationsForFilter as ILocationsForFilterProps)
    }

    return (
        <div className={styles.container}>
            <div className={styles.filterEditorContainer}>
                <Input
                    className={styles.input}
                    value={mainInputValue}
                    onChange={e => setMainInputValue(e)}
                    label="Main area"
                    theme="light"
                />
                <Textarea
                    className={styles.textarea}
                    value={textareaValue}
                    onChange={e => setTextareaValue(e)}
                    label="Secondary areas"
                    noLimit
                />
                <div className={styles.newIndexContainer}>
                    <Button className={styles.addFilterToListBtn} onClick={changeFilterContent}>
                        {isEditing ? "Update Filter" : "Add Filter To List"}
                    </Button>
                    {isEditing && (
                        <div>
                            <Input
                                type="number"
                                value={newIndex !== null ? newIndex.toString() : ""}
                                onChange={e => {
                                    Number(e) >= 0 ? setNewIndex(parseInt(e)) : newIndex
                                }}
                                label="New index"
                                theme="light"
                                min={0}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.locationsContainer}>
                    {isLoading ? (
                        <div className={styles.loginContainer}>
                            <Loader />
                        </div>
                    ) : filterData ? (
                        Object.entries(filterData.filters).map(([key, value], index) => (
                            <div key={key} className={styles.locationsSubContainer}>
                                <div className={styles.locationKeyContainer}>
                                    <div className={styles.locationNameContainer}>
                                        <Typography
                                            className={styles.locationHeading}
                                            size="m"
                                            weight="bold"
                                            color="inverted"
                                        >
                                            {index}.
                                        </Typography>
                                        <Typography
                                            className={styles.locationHeading}
                                            size="m"
                                            weight="bold"
                                            color="inverted"
                                        >
                                            {key}
                                        </Typography>
                                    </div>
                                    <span
                                        onClick={() => handleEdit(key)}
                                        style={{ cursor: "pointer", marginLeft: "10px" }}
                                        className={styles.editBtn}
                                    >
                                        Edit
                                    </span>
                                    <span
                                        onClick={() => handleDelete(key)}
                                        className={styles.deleteBtn}
                                    >
                                        Delete
                                    </span>
                                </div>
                                {expandedKey === key
                                    ? value?.map((item, index) => (
                                          <Typography
                                              className={styles.locationListText}
                                              size="s"
                                              weight="medium"
                                              key={`${item}-${index}`}
                                              color="inverted"
                                          >
                                              {item}
                                          </Typography>
                                      ))
                                    : value?.slice(0, 3).map((item, index) => (
                                          <Typography
                                              className={styles.locationListText}
                                              size="s"
                                              weight="medium"
                                              key={`${item}-${index}`}
                                              color="inverted"
                                          >
                                              {item}
                                          </Typography>
                                      ))}
                                {value.length > 4 && (
                                    <Typography
                                        className={styles.showMoreLocations}
                                        size="s"
                                        weight="bold"
                                        color="inverted"
                                        onClick={() => toggleExpandLocation(key)}
                                    >
                                        {expandedKey === key
                                            ? "show less..."
                                            : `and ${value.length - 3} more...`}
                                    </Typography>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>No data</div>
                    )}
                </div>
            </div>

            <div className={styles.btnContainer}>
                <Button onClick={handleUpdateFilterData}>Send filters to database</Button>
                <Button onClick={getNewFiltersData}>Get filters from database</Button>
                <Button onClick={resetFiltersDataToDefault}>Reset To Default</Button>
                <Typography size="xxl" weight="semi-bold" color="inverted">
                    {import.meta.env.VITE_DEPLOY_MODE || "-"} ENVIRONMENT
                </Typography>
                <br />
            </div>
        </div>
    )
}
