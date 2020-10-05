let is_loading = false;
const upc_string ='857913004041 688267142840 657082002844 51600080015 78742088679 811392020275 612781101908 90939132019 60522000087 63100109578 846036003611 70253267345 16000296527 32712124 68100896503 41268188703 20000277967'
const upc_list = upc_string.split(" ");

function diu(thing) {
  if (thing === null || thing === undefined) {
    return `Thing ${Math.round(Math.random() * 10000)}`
  }
  
  return thing;
}

function load_new_item() {
  if (is_loading)
    return;
  
  document.getElementById('btn_load-new').innerHTML = "Loading...";
   let random_upc = upc_list[Math.floor(Math.random() * upc_list.length)];
   is_loading = true;
  
  //for (let i = 0; i < upc_list.length; i++) {
    // let random_upc= upc_list[i] s
    //17-27
  getDetails(random_upc, function(data) {
  //     console.log(`${i+1} at ${data["item_name"]}`);
  
    // Load in details to DOM
    document.getElementById('display_food-name').innerHTML = diu(data["item_name"]);
    
    document.getElementById('display_brand-name').innerHTML = data["brand_name"];
    document.getElementById('display_serving-per-container').innerHTML =`Serving size: ${data["nf_servings_per_container"]} x ` ;
    document.getElementById('display_serving-quantity').innerHTML = data["nf_serving_size_qty"];
    document.getElementById('display_serving-unit').innerHTML = data["nf_serving_size_unit"];
    document.getElementById('display_food-description').innerHTML = data["nf_ingredient_statement"];
    document.getElementById('display_calories-label').innerHTML = "Calories: ";
    
    let calories = 11;
    document.getElementById('display_calories-input').setAttribute("answer", calories);
    document.getElementById('display_calories-input').style.visibility = "visible";
    is_loading = false;
    document.getElementById('btn_load-new').innerHTML = "Load New Item";
  });
  //}
  
  // if it return when is_loading === false, when it work? since is_loading = true always after it
}

function check_answer() {
	let answer = parseInt(document.getElementById('display_calories-input').getAttribute("answer"));
	let guess = parseInt(document.getElementById('display_calories-input').value);
	
	console.log(answer);
	
	if (guess === answer) {
		document.getElementById("result").innerText = "Your guess is correct!";
	} else {
		document.getElementById("result").innerText = "Your guesso is incorrect!";
	}
}

const getDetails = function(upc, callback) {
  fetch(`https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=${upc}`, {
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
  		"x-rapidapi-key": "597e01564fmsh11569b8f9f701adp1be4f4jsn44a5903a0703"
  	}
  })
  .then(function(readableStream) { return readableStream.json(); })
  .then(function(jsonData) { callback(jsonData); })
  .catch(err => {
    callback(err);
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  load_new_item();
});

