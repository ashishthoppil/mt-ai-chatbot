export const getAnalyticsDb = (org, id) => {
    return `${org.substring(0, 3)}_${id.substring(0, 3)}`
}