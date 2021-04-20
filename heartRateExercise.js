//To load all json data into 'data' variable
const data = require('./heartrate.json');

/*
* Function Name : groupBy 
* Description   : This function will accept json data and will group them based on date
*/
function groupBy(arr){
    return arr.reduce(function(acc,ele){
        acc[ele.start_time.split(' ')[0]] = acc[ele.start_time.split(' ')[0]] || []
        acc[ele.start_time.split(' ')[0]].push(ele)
        return acc
    },{})
}

/*
* Function Name : max 
* Description   : This function will return maximum value of bpm from received array
*/
const max  =  (arr) => Math.max(...arr.map(res=>res.bpm))

/*
* Function Name : min 
* Description   : This function will return minimum value of bpm from received array
*/
const min  =  (arr) => Math.min(...arr.map(res=>res.bpm))

/*
* Function Name : median 
* Description   : This function will return median value of bpm from received array
*/
const median = (arr) => {
    const mid = Math.floor(arr.length / 2)
    nums = [...arr].sort((a, b) => a - b);
    return (arr.length % 2 !== 0 ? nums[mid].bpm : (nums[mid - 1].bpm + nums[mid].bpm) / 2);
  };

/*
* Below code will call groupBy function and map its result to key value pair, it will then call min, max and median funtions with values of those respective keys
*/

const result  = Object.entries(groupBy(data)).map(([key, val])=> ({date:key, bpm: {min:min(val), max: max(val),  median: median(val)}}))
console.log(result);