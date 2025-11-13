
export function mergeObject(newObject, sourceObj) {

    const dynamicCount = (newObject, sourceObj, keyName, val, count) => {
        return `${keyName}-${count}|${sourceObj[val]},${keyName}-${Number.parseInt(count) + 1}|${newObject[val]}`.split(',')
    }
    const isOwn = (newObject, sourceObj) => {
        
        const uniqueProps = (newObject, sourceObj) => {
            let old = Object.getOwnPropertyNames(sourceObj).filter(val => !newObject[val]);
            let newObj = Object.getOwnPropertyNames(newObject).filter(val => !sourceObj[val]);

            return {oldObj : old, newObject : newObj};
        }

        const sameKeys = Object.getOwnPropertyNames(sourceObj)
            .filter((val) => newObject[val] ? true : false)
            .map((val, index) => {

                if (val.split('-').length > 1) {
                    const [keyName, count] = val.split('-');
                    return dynamicCount(newObject, sourceObj, keyName, val, count);
                }
                return `${val}-${index}|${sourceObj[val]},${val}-${Number.parseInt(index) + 1}|${newObject[val]}`.split(',');
            })

           sameKeys.push([...uniqueProps(newObject, sourceObj).oldObj, ...uniqueProps(newObject, sourceObj).newObject])

        return (sameKeys.length > 0) ? sameKeys: null;

    }
    const constructed = isOwn(newObject, sourceObj).flat();

    let merged = {};
    constructed.forEach((val) => {

        if (val.split('|').length > 1) {
            const [propName, value] = val.split('|');
            merged[propName] = value;
            return;
        } 

        (newObject[val])? merged[val] = newObject[val] : merged[val] = sourceObj[val];
    })

    return merged;

    // const oldValue = [...sameKeys].map((val) => sourceObj[val]);
    // rewrite key value of index collection
    // return .map((val, i) => val + `[${i + 1}]`)

}