import { mergeObject } from "./megeObject.js"
// 🧠 Hard-Level Task: Descriptor-Aware Object Merger
// 🧩 Scenario:

// You are designing a custom object merger for a system that needs to:
// Merge multiple configuration objects. | 
// Preserve custom descriptors (e.g., getters, setters, enumerable, etc.).

// Handle conflicts intelligently — not just overwrite values.

// Keep a merge history of which object introduced each property.

// If a property key is repeated 3 times or more, automatically lock it:
// That means define it as configurable: false and writable: false.


// obj 1 -> obj 2

const n1 = {
    'name-': 'John Smith',
    age: 20,
    info: 'lol',
    hobby: 'playin MOBA'
}

const n2 = {
    'name-2': ['a', 'b', 'c'],
    age: 30,
    info: {
        greet: 'Hello world'
    },
    sport: 'basketball'
}

// If a property key is repeated 3 times or more, automatically lock it:

const o = {
    'name-2': 'John Smith',
    'name-3': ['a', 'b', 'c'],
    'age-1': 20,
    'age-2': 30,
    'info-1': 'lol',
    'info-2': { greet: 'Hello world' },
    hobby: 'playin MOBA',
    sport: 'basketball'
}

const v = {
    'name-3': 'Rey Marthilo',
}

function lockObject(infos) {
    Object.keys(infos).forEach((k) => {
        if (k.match(/-/g)) {
            const [_, keyCount] = k.split('-');

            if (keyCount >= 3) { // might be conditional if key count already reach the threshold in task
                Object.freeze(infos);
                console.log('Succesfully lock the object');
            }
        }
        return;
    });

    return infos;

}


function deepMerge(newObject, sourceObject) {
    const getHistory = (obj1, obj2) => {
        const _mergeHist = [Object.getOwnPropertyDescriptors(obj1), Object.getOwnPropertyDescriptors(obj2)];
        return _mergeHist;
    }

    const merger = (newObject, sourceObject) => {
        return mergeObject(newObject, sourceObject);
    }
    const mergeResult = Object.defineProperty({ _mergeHistory: getHistory(newObject, sourceObject), ...merger(newObject, sourceObject) }, '_mergeHistory', {
        enumerable: false
    })
   return lockObject(mergeResult);
}

// ->   new | old 
deepMerge(v, o); // if return the lock object 