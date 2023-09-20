import { utilService } from "./util.service"
import { asyncStorageService } from "./async-storage.service"
import { httpService } from "./http.service"
import { userService } from "./user.service"

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

var toys = _createToys()

export const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    get,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query() {
    return asyncStorageService.query(STORAGE_KEY).then(toys => {
        return toys
    })
}

function get(toyId) {
    return asyncStorageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    return asyncStorageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy.id) {
        return asyncStorageService.put(STORAGE_KEY, toy)
    } else {
        return asyncStorageService.post(STORAGE_KEY, toy)
    }
}

function _createToys() {
    console.log('start create toys')
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [{
            _id: utilService.makeId(),
            name: 'Talking Doll',
            price: 123,
            labels: ['Doll', 'Battery Powered', 'Baby'],
            createdAt: 1631031801011,
            inStock: true
        },
        {
            _id: utilService.makeId(),
            name: 'Robot',
            price: 250,
            labels: ['Battery Powered'],
            createdAt: 1631031801022,
            inStock: true
        }, {
            _id: utilService.makeId(),
            name: 'Dog Toy',
            price: 50,
            labels: ['Doll', 'Battery Powered', 'Baby'],
            createdAt: 1631031702011,
            inStock: false
        }

        ]
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
    console.log('all toysss', toys)
    return toys
}

function getEmptyToy() {
    return {
        name: 'Doll-',
        price: utilService.getRandomIntInclusive(1000, 9000)
    }
}
function getDefaultFilter() {
    return { name: '' }
}