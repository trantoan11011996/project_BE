const variants =  [
    {
        "_id": "63260ce8c426179c8111c90c",
        "productId": "63260c74c426179c8111c908",
        "countInStock": 5,
        "attributes": {
            "PCB": "Solder",
            "Color": "Black"
        },
        "__v": 0
    },
    {
        "_id": "63260cf7c426179c8111c914",
        "productId": "63260c74c426179c8111c908",
        "countInStock": 5,
        "attributes": {
            "PCB": "Solder",
            "Color": "White"
        },
        "__v": 0
    },
    {
        "_id": "63260d08c426179c8111c91c",
        "productId": "63260c74c426179c8111c908",
        "countInStock": 5,
        "attributes": {
            "PCB": "Hotswap",
            "Color": "Black"
        },
        "__v": 0
    },
    {
        "_id": "63260d10c426179c8111c924",
        "productId": "63260c74c426179c8111c908",
        "countInStock": 5,
        "attributes": {
            "PCB": "Hotswap",
            "Color": "White"
        },
        "__v": 0
    }
]
const keyArr = []
const valueArr = []

for ( let item of variants) {
    const key = Object.keys(item.attributes)
    keyArr.push(...key)
}
const uniqueKey = keyArr.filter(function(item, index) {
    return keyArr.indexOf(item) == index;
})



// for(let item of uniqueKey){
//     for(let variant of variants){
//         resultArr.push(variant.attributes.item)
//     }
// }
// for(let i =0;i<uniqueKey.length;i++){
//     console.log('i',uniqueKey[i])
//     for(let j = 0; j<variants.length;j++){
//         console.log('variant',variants[j].attributes[uniqueKey[i]])
//         resultArr.push(variants[j].attributes[uniqueKey[i]])
//         result = resultArr.filter((item,index)=>{
//             return resultArr.indexOf(item) == index
//         }) 
//     }
// }

const arr = [
    {
        name : "PCB",
        option : [
            'solder','hotswap'
        ]
    },
    {
        name : "Color",
        option : [
            'black',"white"
        ]
    }
]

let result = []
for (let i = 0 ; i < uniqueKey.length; i++){
    let obj = {
        "name" : uniqueKey[i],
        "option" : []
    }
    for(let j = 0; j< variants.length; j++){
        obj.option.push(variants[j].attributes[uniqueKey[i]])
    }
    result.push(obj)
}
for (let item of result){
    const itemOption = item.option
    const newArr = itemOption.filter((item,index)=>{
        return itemOption.indexOf(item) == index
    })
    item.option = newArr
}
console.log('result',result)

