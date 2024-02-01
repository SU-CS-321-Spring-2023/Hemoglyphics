var str = "bonjour le monde vive le javascript";
var arr = ['bonjour','europe', 'c++'];

function contains(target, pattern){
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
}

console.log(contains(str, arr));