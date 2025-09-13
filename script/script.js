// const obj = {
//     name : "Anas", age : 24, address : "Egypt"
// };
// console.log(Reflect.get(obj, "name"));

// const obj2 = new Proxy(obj,
// {
//     get(target, prop){

//         return prop in target ? "i'm " + target[prop] : "Not Found";

//     }
// });

// console.log(Reflect.get(obj2, "asdas"));


//#region Q1 classes and inheritance
class polygon {
  constructor(height, width) {
    if (this.constructor === polygon) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.height = height;
    this.width = width;
  }

  get area() {
    return this.calcArea();
  }
  calcArea() {
    return this.height * this.width;
  }

}

class square extends polygon {
  constructor(side) {
    super(side, side);
  }
    toString() {
    return `Square Area: ${this.area}`;
    }
}

class rectangle extends polygon {
  constructor(height, width) {
    super(height, width);
  }
    toString() {
    return `Rectangle Area: ${this.area}`;
    }
}

class triangle extends polygon {
  constructor(height, width) {
    super(height, width);
  }
  // Overriding
  calcArea() {
    return (this.height * this.width) / 2;
  }
    toString() {
    return `Triangle Area: ${this.area}`;
    }
}

class circle extends polygon {
  constructor(radius) {
    super(radius, radius);
  }
  // Overriding
  calcArea() {
    return Math.PI * this.height * this.width;
  }
  toString() {
    return `Circle Area: ${this.area}`;
  }
}

function calculateArea(shape) {
  let area;
  switch (shape) {
    case "square":
      let side = parseFloat(document.getElementById("addSquareSide").value);
      if (isNaN(side) || side <= 0) {
        document.getElementById("shapeAreaContainer").classList.add("alert");
        document.getElementById("shapeAreaContainer").classList.add("alert-danger");
        document.getElementById("shapeArea").innerText ="Please enter a valid positive number for the side.";
        return;
      }
      // create object from square class
      area = new square(side);
      area = area.toString();
      
      break;
    case "rectangle":
      let height = parseFloat(document.getElementById("addRectHeight").value);
      let width = parseFloat(document.getElementById("addRectWidth").value);
      if (isNaN(height) || height <= 0 || isNaN(width) || width <= 0) {
        document.getElementById("shapeAreaContainer").classList.add("alert");
        document.getElementById("shapeAreaContainer").classList.add("alert-danger");
        document.getElementById("shapeArea").innerText = "Please enter valid positive numbers for height and width.";
        return;
      }
      // create object from rectangle class
      area = new rectangle(height, width);
      area = area.toString();
      break;
    case "triangle":
      let triangleheight = parseFloat(
        document.getElementById("addTriangleHeight").value
      );
      let base = parseFloat(document.getElementById("addTriangleBase").value);
      if (
        isNaN(triangleheight) ||
        triangleheight <= 0 ||
        isNaN(base) ||
        base <= 0
      ) {
        document.getElementById("shapeAreaContainer").classList.add("alert");
        document.getElementById("shapeAreaContainer").classList.add("alert-danger");
        document.getElementById("shapeArea").innerText = "Please enter valid positive numbers for height and base.";
        return;
      }
      // create object from triangle class
      area = new triangle(triangleheight, base);
        area = area.toString();
      break;
    case "circle":
      let radius = parseFloat(document.getElementById("addCircleRadius").value);
      if (isNaN(radius) || radius <= 0) {
        document.getElementById("shapeAreaContainer").classList.add("alert");
        document.getElementById("shapeAreaContainer").classList.add("alert-danger");
        document.getElementById("shapeArea").innerText ="Please enter a valid positive number for the radius.";
        return;
      }
      // create object from circle class
      area = new circle(radius).area;
      break;
  }
  document.getElementById("shapeAreaContainer").classList.remove("alert");
  document.getElementById("shapeAreaContainer").classList.remove("alert-danger");

  document.getElementById("shapeAreaContainer").classList.add("alert");
  document.getElementById("shapeAreaContainer").classList.add("alert-success");
  
  document.getElementById("shapeArea").innerText = `${area}`;
}
//#endregion

// #region Q2 Proxy and Reflect
const obj = {
    name:'Anas',
    age:24,
    address:'Egypt'
}

const objWithProxy = new Proxy(obj, {
    set(target, prop, value){
        
        if(prop in target){
            target[prop] = value;
            return true;
        }else{
            return false;
        }
    },
    get(target, prop){
        return prop in target ? `${prop}: ${target[prop]}` : "Not Found";
    }
});


function getProperty(targetObj){
    targetObj = obj;
    var vProp = document.getElementById("obj1Prop").value;
    var vValue = document.getElementById("obj1Value").value;
    if(vProp === "name"){
        vValue = vValue.substring(0, 7);
    }
    else if(vProp === "age"){
        vValue = parseInt(vValue);
        if(isNaN(vValue) || (vValue <= 60 && vValue >= 25) === false){
            document.getElementById("obj1Result").innerText = "Please enter a valid positive number for age. the age should be between 25 and 60.";
            return;
        }
    }
    else if(vProp === "address"){
        if(vValue instanceof String === false){
            document.getElementById("obj1Result").innerText = "Please enter a valid string for address.";
            return;
        }
    }
    Reflect.set(targetObj, vProp, vValue);
    vValue= "";
    document.getElementById("obj1Result").innerText = Reflect.get(targetObj, vProp);
    document.getElementById("obj1Entire").innerText =  JSON.stringify(targetObj);
}
// #endregion

function getData(url){
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url);

        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 300){
                resolve(xhr.response);
                console.log("Data fetched successfully");
            }else{
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function(){
            reject({
                status: this.status,
                statusText: this.statusText
            });
        };
        xhr.send();
    });

}

getData('https://jsonplaceholder.typicode.com/posts')
.then(data=>
{
    let posts = JSON.parse(data);

    let cartone = ``;
    posts.forEach(element => {
        cartone += ` <tr>
                        <td>${element.userId}</td>
                        <td>${element.id}</td>
                        <td>${element.title}</td>
                        <td>${element.body}</td>
                    </tr>`;
    });
   document.getElementById("tableBody").innerHTML = cartone;
   
}
).catch(error => {
    console.error("Error fetching data:", error);
});
