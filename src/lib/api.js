import axios from "axios"

const baseUrl = import.meta.env.VITE_BASE_URL

function setTokens({ access, refresh }) {
    // save the access and refresh tokens to local storage
    if (access) localStorage.setItem('access_token', access)
    if (refresh) localStorage.setItem('refresh_token', refresh)
}

async function refreshAccessToken() {
    // check if there is a refresh token
    // If there is make the api call to refresh the token
    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
        const response = await axios.post(
            `${baseUrl}/token/refresh/`,
            { refresh: refreshToken }
        )
        const newAccess = response.data.access

        setTokens({ access: newAccess })
        console.log('access token has been refreshed')
        return newAccess
    }
}

async function authorizedRequest(method, url, data = null) {
    // make the config object for axios to use to make requests
    const config = {
        method,
        url: `${baseUrl}${url}`,
        headers: {}
    }
    // if there is json data add it to the config object
    if (data) {
        config.data = data
    }

    // If there is an access token add it to the headers in config object
    let accessToken = localStorage.getItem('access_token')
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    // Actually make the api call to our backend
    try {
        const response = await axios(config)
        return response
    } catch (err) {
        console.log(err)
        if (err.response && err.response.status == 401) {
            try {
                accessToken = await refreshAccessToken()
                config.headers['Authorization'] = `Bearer ${accessToken}`

                const retriedResponse = await axios(config)
                return retriedResponse
            } catch (err) {
                console.log(err)
                window.location.href = '/signup'
                // added this
                return null
            }
        }
    }
}

export { setTokens, authorizedRequest }