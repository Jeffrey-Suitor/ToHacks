function readData(csv){

    var lines=csv.split("\n");
    var data = [];

    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
        data.push(lines[i].split(","));
  
    }
    console.log(data);
    return data;
}

