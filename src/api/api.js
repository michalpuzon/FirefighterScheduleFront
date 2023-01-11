import axios from 'axios'

let backendAddress = 'http://localhost:8081/api/'

function sendRequest(address, endpoint, method, body, headers) {
    headers['Content-Type'] = 'application/json'
    return axios({
        method: method.toLowerCase(),
        url: address + endpoint,
        headers: headers,
        data: body,
    })
}

export function getAllFirefighters() {
    return sendRequest(backendAddress, 'firefighters', 'get', {}, {})
}

export function createFirefighter(firefighter) {
    return sendRequest(backendAddress, 'firefighters', 'post', firefighter, {})
}

export function createPosition(position) {
    return sendRequest(backendAddress, 'positions', 'post', position, {})
}

export function getAllPositions() {
    return sendRequest(backendAddress, 'positions', 'get', {}, {})
}