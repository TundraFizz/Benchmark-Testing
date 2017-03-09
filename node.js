//////////////////////////////////////////////////////////////////
// Benchmark testing comparing an array with a dictionary       //
//////////////////////////////////////////////////////////////////
// Action                                  | Array | Dictionary //
// Add 10,000,000 objects                  | 750   | 3,000      //
// Search for an object that exists        |  40   |     0      //
// Search for an object that doesn't exist |  50   |     0      //
// Remove an object                        |  25   |     0      //
// Find the length                         |   0   | CRASH      //
//////////////////////////////////////////////////////////////////
// node --max_old_space_size=4096 server.js
// Action                                  | Array | Dictionary //
// Add 10,000,000 objects                  | 1,200 |   730      //
// Search for an object that exists        |    40 |     0      //
// Search for an object that doesn't exist |    50 |     0      //
// Remove an object                        |    25 |     0      //
// Find the length                         |     0 | 1,300      //
//////////////////////////////////////////////////////////////////
// node --max_old_space_size=8192 server.js
var arr = AddObjectsToArray();
SearchForExistingObjectInArray(arr);
SearchForNonExistingObjectInArray(arr);
RemoveObjectFromArray(arr);
FindLengthOfArray(arr);

function AddObjectsToArray(){
  var start = new Date();
  var arr = [];

  for(var i = 0; i < 7500000; ++i){
    var obj = {};
    obj.name  = "Placeholder Name";
    obj.age   = 123;
    obj.email = "testing@example.com";
    obj.state = "MN";
    arr.push(obj);
  }

  var obj = {};
  obj.name  = "Yolo Swag";
  obj.age   = 21;
  obj.email = "me@yahoo.com";
  obj.state = "ABC";
  arr.push(obj);

  for(var i = 0; i < 2500000; ++i){
    var obj = {};
    obj.name  = "Placeholder Name";
    obj.age   = 123;
    obj.email = "testing@example.com";
    obj.state = "MN";
    arr.push(obj);
  }

  var end = new Date() - start;
  console.log("Adding 10,000,000 objects to an array: %dms", end);
  return arr;
}

function SearchForExistingObjectInArray(arr){
  var start = new Date();
  for(var i = 0; i < arr.length; i++) if(arr[i].name == "Yolo Swag") break;
  var end = new Date() - start;
  console.log("Finding one object in the array:       %dms", end);
}

function SearchForNonExistingObjectInArray(arr){
  var start = new Date();
  for(var i = 0; i < arr.length; i++) if(arr[i].name == "No exist") break;
  var end = new Date() - start;
  console.log("Finding a non-existant object in arr:  %dms", end);
}

function RemoveObjectFromArray(arr){
  var start = new Date();
  arr.splice(750000, 1);
  var end = new Date() - start;
  console.log("Removing one object in the array:      %dms", end);
}

function FindLengthOfArray(arr){
  var start = new Date();
  var len = arr.length;
  var end = new Date() - start;
  console.log("Finding length of array:               %dms", end);
}

console.log("---------------------------------------------");

var dict = AddObjectsToDict();
SearchForExistingObjectInDict(dict);
SearchForNonExistingObjectInDict(dict);
RemoveObjectFromDict(dict);
FindLengthOfDict(dict);

function AddObjectsToDict(){
  var start = new Date();
  var dict = {};

  for(var i = 0; i < 7500000; ++i){
    var obj = {};
    obj.name  = "Placeholder Name";
    obj.age   = 123;
    obj.email = "testing@example.com";
    obj.state = "MN";
    dict[i] = obj;
  }

  var obj = {};
  obj.name  = "Yolo Swag";
  obj.age   = 21;
  obj.email = "me@yahoo.com";
  obj.state = "ABC";
  dict["a"] = obj;

  for(var i = 7500000; i < 10000000; ++i){
    var obj = {};
    obj.name  = "Placeholder Name";
    obj.age   = 123;
    obj.email = "testing@example.com";
    obj.state = "MN";
    dict[i] = obj;
  }

  var end = new Date() - start;
  console.log("Adding 10,000,000 objects to a dict:   %dms", end);
  return dict;
}

function SearchForExistingObjectInDict(dict){
  var start = new Date();
  var qwe = dict["a"];
  var end = new Date() - start;
  console.log("Finding one object in the array:       %dms", end);
}

function SearchForNonExistingObjectInDict(dict){
  var start = new Date();
  var qwe = dict["b"];
  var end = new Date() - start;
  console.log("Finding a non-existant object in dict: %dms", end);
}

function RemoveObjectFromDict(dict){
  var start = new Date();
  delete dict["a"];
  var end = new Date() - start;
  console.log("Removing one object in the array:      %dms", end);
}

function FindLengthOfDict(dict){
  var start = new Date();
  var len = Object.keys(dict).length;
  var end = new Date() - start;
  console.log("Finding length of dictionary:          %dms", end);
}
