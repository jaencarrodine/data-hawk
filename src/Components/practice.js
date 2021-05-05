


function fizzBuzz(){
    let range = 100
    for(let i = 1; i < 101; i++){
        if(checkMultiple3(i) && checkMultiple5(i)){
            console.log("FizzBuzz")
        }else if(checkMultiple3(i)){
            console.log('fizz')
        }else if(checkMultiple5(i)){
            console.log('buzz')
        }else{
            console.log(i)
        }
    }
}

function checkMultiple3(n){
    let res =  n % 3 === 0 ? true: false;
    return res
}

function checkMultiple5(n){
    let res =  n % 5 === 0 ? true: false;
    return res
}

function findDivisors(n){
    let divisors = []
    for(let i = 1; i <= n; i++){
        if(n%i === 0){
            divisors.push(i)
        }
    }
    return divisors
}

function findGCD(n1, n2){
    let n1Divisors = findDivisors(n1)
    let n2Divisors = findDivisors(n2)
    console.log(n1Divisors)
    console.log(n2Divisors)
    let commonDivs = []
    n1Divisors.forEach((div) =>{
        if(n2Divisors.includes(div)){
            commonDivs.push(div)
        }
    })
    console.log(commonDivs)
    let gcd = Math.max(...commonDivs)
    console.log(gcd)
}

function createTopRow(rows, cols){
    let topRow = []
    for(let i = 1; i <= cols; i++){
        if(i%2 === 0){
            topRow.push(rows*i)
        }else{
            let prevIndex = i-2
            console.log(prevIndex)
            let prevVal = topRow[prevIndex]
            console.log(prevVal)
            if(prevVal === undefined){
                topRow.push(1)
                console.log(topRow)
            }else{
                topRow.push(prevVal+1)
            }
        }
        
    }
    return topRow
}

function getOtherRows(topRow, rows){
    let rowArr = []
    for(let i = 1; i < rows; i++){
        let newRow = topRow.map((num) =>{
            if(num%2 === 0){
                return num - i
            }else{
                return num + i
            }
            
        })

        rowArr.push(newRow)
    }
    return rowArr
}

function createTable(rows, cols){
   let topRow = createTopRow(rows, cols)
   let rowArr = getOtherRows(topRow, rows)
   console.log(topRow)
   rowArr.forEach((row)=> console.log(row))
}

createTable(6,3)
