let object = {
    name: 'Dmitry',
    age: 30,
    location:{
        city: 'Arkhangelsk',
        job:{
            prof: 'electrician',
        },
    },
    sizes: {
        height: 175,
        weight: 85
    }
}

function extendedClone(object, cloneObject = {}){
    for(let key in object){
        if(typeof object[key] !== 'object'){
            cloneObject[key] = object[key]
        }else{
            extendedClone(object[key], cloneObject)
        }
    }
    return cloneObject;
}

function deepClone(object, cloneObject = {}){
    for(let key in object){
        if(typeof object[key] !== 'object'){
            cloneObject[key] = object[key]
        }else{
            cloneObject[key] = {};
            deepClone(object[key], cloneObject[key])
        }
    }
    return cloneObject;
}

let extendedCloneObject = extendedClone(object);
let deepCloneObject = deepClone(object);

console.log(extendedCloneObject);
console.log(deepCloneObject);