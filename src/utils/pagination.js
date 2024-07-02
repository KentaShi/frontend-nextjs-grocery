export const getCurrentRecords = (currentPage, recordsPerPage, records) => {
    const indexOfLast = currentPage * recordsPerPage
    const indexOfFirst = indexOfLast - recordsPerPage
    return records.slice(indexOfFirst, indexOfLast)
}
