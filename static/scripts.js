let names = ["6ft Person"];
let heights = [6];
let colors = ["gray"];

let scales = ["tiny", "small", "medium", "large", "huge", "gargantuan", "colossal"];
let scaleheights = [2,4,8,16,32,64,128]

function addPerson() {
    if (names.length >= 9){
        return;
    }
    let nameInput = document.getElementById('name').value;
    let feetInput = parseInt(document.getElementById('feet').value) || 0;
    let inchesInput = parseFloat(document.getElementById('inches').value) || 0;
    let colorInput = document.getElementById('color').value;
    let heightInFeet = feetInput + (inchesInput / 12);

    if (nameInput && heightInFeet > 0) {
        names.push(nameInput);
        heights.push(heightInFeet);
        colors.push(colorInput);
        updateList();
        updateCanvas();
    }
}


function updateList() {
    let list = document.getElementById('list');
    list.innerHTML = "";
    names.forEach((name, index) => {
        if (index !== 0) { // Skip the 6ft person reference
            list.innerHTML += `<li class="list-group-item">${name}: ${heights[index].toFixed(2)} ft 
                        <button onclick="removePerson(${index})" class="btn btn-danger">Remove</button>
                    </li>`;
        }
    });
}

function removePerson(index) {
    names.splice(index, 1);
    heights.splice(index, 1);
    colors.splice(index, 1);
    updateList();
    updateCanvas();
}

function updateCanvas() {
    let canvas = document.getElementById("visualCanvas");
    canvas.innerHTML = "";
    canvas.style.width = "90%";
    let maxHeight = Math.max(...heights);
    let scaleFactor = 350 / maxHeight; // Scaling to fit within the canvas height


    scaleheights.forEach((height, index) => {
        if (maxHeight >= height*0.95) {
            let linePosition = (height * scaleFactor); // Position of the 32ft mark in canvas pixels
            if (linePosition < (maxHeight * 0.1)){
                return;
            }
            let line = document.createElement("div");
            line.style.position = "absolute";
            line.style.left = "0px"; // Start the line at the left of the canvas
            line.style.bottom = linePosition + "px"; // Position it at the calculated height
            line.style.width = "100%"; // Make it span the full width of the canvas
            line.style.height = "1px"; // Line thickness
            line.innerText = scales[index];
            line.style.backgroundColor = "black"; // Black color for the line
            canvas.appendChild(line);
        }
    });
    // Add the black line at the 32ft mark if maxHeight reaches or surpasses 32ft

    names.forEach((name, index) => {
        let div = document.createElement("div");
        div.className = "person";
        div.style.height = (heights[index] * scaleFactor) + "px";
        div.style.width = "50px";
        div.style.left = (index * 60 + 10) + "px";
        div.style.backgroundColor = colors[index];
        div.innerText = name;
        canvas.appendChild(div);
    });
}


updateCanvas();