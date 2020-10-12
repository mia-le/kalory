let is_loading = false;
const upc_string ='857913004041 688267142840 657082002844 51600080015 78742088679 811392020275 612781101908 90939132019 60522000087 63100109578 846036003611 70253267345 16000296527 32712124 68100896503 41268188703 20000277967 21130046119 18281000077 7753282 84253233187 48121216573 76040000072 37600469623 41190453498 40032002016 77330570060 74336863950 78742088679 41303054369 38000396731 78742084749 36192122893 70253267345 623682108378 75450121520 34952560633 86600000640 637480061025 11150189941 857723004316 688267147265 753182239620 720579791320 41172000368 688267056376 30771096988 688267064661 11110587923 51000025630 73541405269 7753282 28833010805 34952560633 725439980012 658882241037 857400002918 55000406239 41646404760 72668600007 13800139276 80368045226 74880040623 43695083002 18619418659 87684006382 709355468106'
const upc_list = upc_string.split(" ");

function diu(thing) {
  if (thing === null || thing === undefined) {
    return `Thing ${Math.round(Math.random() * 10000)}`
  }
  
  return thing;
}

function per_container_null(spc) {
  if (spc === null || spc === undefined) {
    return `Serving size: `
  } else {
    return `Serving size: ${spc} x `;
  }

}



function load_new_item() {
  if (is_loading)
    return;
  
  document.getElementById("btn_load-new").innerHTML = "Loading...";
  let random_upc = upc_list[Math.floor(Math.random() * upc_list.length)];
   is_loading = true;
  
  getDetails(random_upc, function(data) {
      //console.log(`${i+1} is ${data["item_name"]}, Serving size: ${data["nf_servings_per_container"]} x ${data["nf_serving_size_qty"]} ${data["nf_serving_size_unit"]} Calories: ${data["nf_calories"]} `);
  
    // Load in details to DOM
    document.getElementById('display_food-name').innerHTML = diu(data["item_name"]);
    
    document.getElementById('display_brand-name').innerHTML = data["brand_name"];
    document.getElementById('display_serving-per-container').innerHTML =per_container_null(data["nf_servings_per_container"]) ;
    document.getElementById('display_serving-quantity').innerHTML = data["nf_serving_size_qty"];
    document.getElementById('display_serving-unit').innerHTML = data["nf_serving_size_unit"];
    document.getElementById('display_food-description').innerHTML = data["nf_ingredient_statement"];
    document.getElementById('display_calories-label').innerHTML = "Calories: ";
    
    document.getElementById("display_calories-output").setAttribute("answer", data["nf_calories"]);
    document.getElementById("display_calories-slider").setAttribute("value",  300);
    document.getElementById("display_calories-output").innerHTML = document.getElementById("display_calories-slider").value;
    document.getElementById("display_calories-slider").style.visibility = "visible";
  
    
    is_loading = false;
    document.getElementById('btn_load-new').innerText = "Load New Item";
  });

  // if it return when is_loading === false, when it work? since is_loading = true always after it
}

function check_answer() {
	let answer = parseInt(document.getElementById("display_calories-output").getAttribute("answer"));
	let guess = parseInt(document.getElementById("display_calories-slider").value);
	let difference = Math.abs(guess - answer);
	console.log(difference);
	
	console.log(answer);
	
	if (difference === 0) {
		document.getElementById("result").innerText = "Your guess is correct !!!";
		document.getElementById("result").style.color = "#2BAD00";
	} else if (600 >= difference && difference >= 300) {
	  document.getElementById("result").innerText = "Your guess is cold :(";
		document.getElementById("result").style.color = "#3668BD";
	} else if (299 >= difference && difference >= 100) {
	  document.getElementById("result").innerText = "Your guess is warm :|";
		document.getElementById("result").style.color = "#F5A41F";
	} else if ( difference <= 99) {
	  document.getElementById("result").innerText = "Your guess is hot :)";
		document.getElementById("result").style.color = "#cc0000";
	} else {
		document.getElementById("result").innerText = "You have run out of guesses";
		document.getElementById("result").style.color = "black";
	}
}

const getDetails = function(upc, callback) {
  // fetch(`https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=${upc}`, {
  // 	"method": "GET",
  // 	"headers": {
  // 		"x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
  // 		"x-rapidapi-key": "597e01564fmsh11569b8f9f701adp1be4f4jsn44a5903a0703"
  		
  // 	}
  // })
  fetch(`https://api.nutritionix.com/v1_1/item?upc=${upc}&appId=d15afacc&appKey=f85df72bea4ec47589974a3e9fef9fc7`, {
  	"method": "GET"
  })
  .then(function(readableStream) { return readableStream.json(); })
  .then(function(jsonData) { callback(jsonData); })
  .catch(err => {
    callback(err);
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  let slider = document.getElementById('display_calories-slider');
  let output = document.getElementById('display_calories-output');
  
  slider.oninput = function() {
    output.innerText = `${this.value}`;
  } 
  
  load_new_item();
});

//appid d15afacc
//"x-rapidapi-key":"f85df72bea4ec47589974a3e9fef9fc7"