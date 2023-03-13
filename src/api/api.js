import axios from 'axios'

// let backendAddress = 'http://localhost:8081/api/'
let backendAddress = 'https://firefightersschedule.herokuapp.com/api/'

function sendRequest(address, endpoint, method, body, headers) {
    headers['Content-Type'] = 'application/json'
    return axios({
        method: method.toLowerCase(),
        url: address + endpoint,
        headers: headers,
        data: body,
    })
}

function authToken() {
    let token = localStorage.getItem('token')
    if (token) {
        return `Bearer ${token}`
    }
}

export function login(authRequest) {
    return sendRequest(backendAddress, 'login', 'post', authRequest, {})
}

export function me() {
    return sendRequest(backendAddress,'firefighters/me','get',{}, {Authorization: authToken()})
}

export function getAllFirefighters() {
    return sendRequest(backendAddress, 'firefighters', 'get', {}, {Authorization: authToken()})
}

export function createFirefighter(firefighter) {
    return sendRequest(backendAddress, 'firefighters', 'post', firefighter, {Authorization: authToken()})
}

export function deleteFirefighter(firefighterId) {
    return sendRequest(backendAddress, 'firefighters/' + firefighterId, 'delete', {}, {Authorization: authToken()})
}

export function addPositionToFirefighter(firefighterId, positionId) {
    return sendRequest(backendAddress, 'firefighters/add/' + firefighterId + "/" + positionId, 'put', {}, {Authorization: authToken()})
}

export function removePositionFromFirefighter(firefighterId, positionId) {
    return sendRequest(backendAddress, 'firefighters/remove/' + firefighterId + "/" + positionId, 'put', {}, {Authorization: authToken()})
}

export function createPosition(position) {
    return sendRequest(backendAddress, 'positions', 'post', position, {Authorization: authToken()})
}

export function getAllPositions() {
    return sendRequest(backendAddress, 'positions', 'get', {}, {Authorization: authToken()})
}

export function getAllSchedules() {
    return sendRequest(backendAddress, 'schedules', 'get', {}, {Authorization: authToken()})
}

export function removeSchedule(scheduleId) {
    return sendRequest(backendAddress, 'schedules/' + scheduleId, 'delete', {}, {Authorization: authToken()})
}

export function createSchedule(startDate, endDate, requiredPositions, limit) {
    return sendRequest(backendAddress, 'schedules?startDate='+startDate+'&endDate='+endDate+'&peopleLimit='+ limit, 'post', requiredPositions, {Authorization: authToken()})
}

export function getAllShifts() {
    return sendRequest(backendAddress, 'shifts', 'get', {}, {Authorization: authToken()})
}