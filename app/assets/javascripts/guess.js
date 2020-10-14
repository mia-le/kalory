/* global fetch */
let is_loading = false;
const upc_string ='857913004041 688267142840 657082002844 51600080015 78742088679 811392020275 612781101908 90939132019 60522000087 63100109578 846036003611 70253267345 16000296527 32712124 68100896503 41268188703 20000277967 21130046119 18281000077 7753282 84253233187 48121216573 76040000072 37600469623 41190453498 40032002016 77330570060 74336863950 78742088679 41303054369 38000396731 78742084749 36192122893 70253267345 623682108378 75450121520 34952560633 86600000640 637480061025 11150189941 857723004316 688267147265 753182239620 720579791320 41172000368 688267056376 30771096988 688267064661 11110587923 51000025630 73541405269 7753282 28833010805 34952560633 725439980012 658882241037 857400002918 55000406239 41646404760 72668600007 13800139276 80368045226 74880040623 43695083002 18619418659 87684006382 709355468106'
const upc_list = upc_string.split(" ");

function diu(thing) {
  if (thing === null || thing === undefined) {
    return `Thing ${Math.round(Math.random() * 10000)}`
  }
  
  return thing;
}

function per_container_null_check(spc) {
  if (spc === null || spc === undefined || spc === "Unknown") {
    return `Serving size: `
  } else {
    return `Serving size: ${spc} x `;
  }

}

function null_check(response){
  if (response === null || response === undefined || response === "Unknown") {
    return ``
  } else {
    return response;
  }
}


function load_new_item() {
  if (is_loading)
    return;
    
  guess_times = 0;
  document.getElementById('display_remaining-guess').innerText = `Remaining Guesses: ${guess_limit - guess_times}`;
  document.getElementById("result").style.visibility = "hidden";
  document.getElementById("btn_try-again").style.visibility = "hidden";
  document.getElementById("score").style.visibility = "hidden";
  document.getElementById("btn_check-answer").disabled = false; 
  document.getElementById("btn_load-new").innerHTML = "Loading...";
  
  
  let random_upc = upc_list[Math.floor(Math.random() * upc_list.length)];
   is_loading = true;
  
  getDetails(random_upc, function(data) {
  
    // Load in details to DOM
    document.getElementById('display_food-name').innerHTML = diu(data["item_name"]);
    
    document.getElementById('display_brand-name').innerHTML = null_check(data["brand_name"]);
    document.getElementById('display_serving-per-container').innerHTML =per_container_null_check(data["nf_servings_per_container"]) ;
    document.getElementById('display_serving-quantity').innerHTML = null_check(data["nf_serving_size_qty"]);
    document.getElementById('display_serving-unit').innerHTML = null_check(data["nf_serving_size_unit"]);
    document.getElementById('display_food-description').innerHTML = null_check(data["nf_ingredient_statement"]);
    document.getElementById('display_calories-label').innerHTML = "Calories: ";
    
    document.getElementById("display_calories-output").setAttribute("answer", data["nf_calories"]);
    document.getElementById("display_calories-slider").setAttribute("value",  300);
    document.getElementById("display_calories-output").innerHTML = document.getElementById("display_calories-slider").value;
    document.getElementById("display_calories-slider").style.visibility = "visible";
  
    
    is_loading = false;
    document.getElementById('btn_load-new').innerText = "Load New Item";
  });

}

let guess_times = 0;
let guess_limit = 5;

function check_answer() {
  guess_times += 1;
  document.getElementById('display_remaining-guess').innerText = `Remaining Guesses: ${guess_limit - guess_times}`;
  
	let answer = parseInt(document.getElementById("display_calories-output").getAttribute("answer"));
	//let answer = 400;
	let guess = parseInt(document.getElementById("display_calories-slider").value);
	let difference = Math.abs(guess - answer);
	let score_ratio = (difference/34) * (600-answer) ;
  let score = Math.floor(100*(100 - score_ratio));
	
	console.log(difference);
	console.log(answer);
	
	document.getElementById("result").style.visibility = "visible";
	
	if (guess_times < guess_limit) {
  	if (difference <= 34) {
  	  // the score is whatever the score is..
  	  postScoreUpdate(score);
  		
  		document.getElementById("result").innerText = `Correct !! You guessed ${guess} out of ${answer} calories.`;
  		document.getElementById("score").style.visibility = "visible";
  		document.getElementById("score").innerText = `Score: ${score}/10000 `;
  		document.getElementById("result").style.color = "#2BAD00";
  		document.getElementById("btn_check-answer").disabled = true; 
  		guess_times = 0;
  		document.getElementById("btn_try-again").style.visibility = "visible";
  	} else if (600 >= difference && difference >= 300) {
  	  document.getElementById("result").innerText = "Your guess is cold :(";
  		document.getElementById("result").style.color = "#3668BD";
  	} else if (299 >= difference && difference >= 100) {
  	  document.getElementById("result").innerText = "Your guess is warm :|";
  		document.getElementById("result").style.color = "#F5A41F";
  	} else if (99 >= difference && difference >= 35) {
  	  document.getElementById("result").innerText = "Your guess is hot :)";
  		document.getElementById("result").style.color = "#cc0000";
  	} 
	}  else {
	    // the score is zero
  		postScoreUpdate(0);
  		
  		document.getElementById("result").innerText = "You have run out of guesses";
  		document.getElementById("result").style.color = "black";
  		document.getElementById("score").style.visibility = "visible";
  		document.getElementById("score").innerText = `Score: 0/10000 `;
  		document.getElementById("btn_try-again").style.visibility = "visible";
  		document.getElementById("btn_check-answer").disabled = true; 
  	}
}

const postScoreUpdate = function (this_round) {
  const baseUrl = 'https://74114ea5ff244013955e511fb5b2e60e.vfs.cloud9.us-east-2.amazonaws.com';
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
  fetch(`/updateScore?score=${this_round}`, {
    method: 'post',
    headers: {
      "X-CSRF-Token": csrfToken,
      "Content-Type": "application/json"
    },
  }).then(function(response) {
    console.debug(`Score Update Raw Response`, response);
    return response.json();
  }).then(function(res) {
    console.debug(`Score Update Response`, res);
  });
};

const resetMyScore = function() {
  const baseUrl = 'https://74114ea5ff244013955e511fb5b2e60e.vfs.cloud9.us-east-2.amazonaws.com';
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
  fetch(`/resetScore`, {
    method: 'post',
    headers: {
      "X-CSRF-Token": csrfToken,
      "Content-Type": "application/json"
    },
  }).then(function(response) {
    console.debug(`Score Reset Raw Response`, response);
    return response.json();
  }).then(function(res) {
    window.location.reload();
    console.debug(`Score Reset Response`, res);
  });
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
  .catch(err => { callback(err); });
}

document.addEventListener('DOMContentLoaded', (event) => {
  let slider = document.getElementById('display_calories-slider');
  let output = document.getElementById('display_calories-output');
  
  slider.oninput = function() {
    output.innerText = `${this.value}`;
  } 
  
  load_new_item();
});
