function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

module.exports ={ add, sub }   

/*

it is very imp to export here so as to import the module somewhere else

multiple modules can exported using JS Object


module.exports = add;
module.exports = sub;   //this will overwrite module.exports

OR

exports.add= (a,b) => a+b;
exports.sub= (a,b) => a-b;

*/