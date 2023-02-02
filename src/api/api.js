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

export function addPositionToFirefighter(firefighterId, positionId) {
    return sendRequest(backendAddress, 'firefighters/add/' + firefighterId + "/" + positionId, 'put', {}, {})
}

export function removePositionFromFirefighter(firefighterId, positionId) {
    return sendRequest(backendAddress, 'firefighters/remove/' + firefighterId + "/" + positionId, 'put', {}, {})
}

export function createPosition(position) {
    return sendRequest(backendAddress, 'positions', 'post', position, {})
}

export function getAllPositions() {
    return sendRequest(backendAddress, 'positions', 'get', {}, {})
}

export function getAllSchedules() {
    return sendRequest(backendAddress, 'schedules', 'get', {}, {})
}

export function createSchedule(startDate, endDate, requiredPositions, limit) {
    return sendRequest(backendAddress, 'schedules?startDate='+startDate+'&endDate='+endDate+'&peopleLimit='+ limit, 'post', requiredPositions, {})
}

export function getAllShifts() {
    return sendRequest(backendAddress, 'shifts', 'get', {}, {})
}