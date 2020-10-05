let is_loading = false;
const upc_string ='857913004041 688267142840 657082002844 51600080015 78742088679 811392020275 612781101908 90939132019 60522000087 63100109578 846036003611 70253267345 16000296527 32712124 68100896503 41268188703 20000277967'
const upc_list = upc_string.split(" ")

function load_new_item() {
  if (is_loading)
    return;
  
  document.getElementById('btn_load-new').innerHTML = "Loading...";
   let random_upc = upc_list[Math.floor(Math.random() * upc_list.length)];
   is_loading = true;
  
  for (let i = 0; i < upc_list.length; i++) {
    // let random_upc= upc_list[i] 
    //17-27
    getDetails(random_upc, function(data) {
    //     console.log(`${i+1} at ${data["item_name"]}`);
    
      document.getElementById('display_food-name').innerHTML = data["item_name"];
      document.getElementById('display_brand-name').innerHTML = data["brand_name"];
      is_loading = false;
      document.getElementById('btn_load-new').innerHTML = "Load New Item";
    });
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

