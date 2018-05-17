
/*eslint-env browser*/

function addDnDHandlers() { // eslint-disable-line no-unused-vars


	var coffeeimages = document.getElementsByClassName("productarticlewide");
	var shoppingCartDropZone = document.getElementById("shoppingcart");
	var shoppingcart = document.querySelectorAll("#shoppingcart ul")[0];

	var Cart = (function () {
		this.coffees = new Array();
	});
	
  var Coffee = (function (id, price) {// eslint-disable-line no-unused-vars
        this.coffeeId = id;
        this.price = price;
    });
	//initializing cart with null
	var CurrentCart = null;
	// checking if the something alraedy present in local storage  and store it in current cart
	CurrentCart = JSON.parse(localStorage.getItem('cart'));
	//chekecking if current cart doesnot exsist so initialize it 
	if (!CurrentCart) 
	{//creating emty cart
		CreateEmtyCart();}
	//define 
	updateShoppingCartUI();
	//define adddcoffee funtion inside this ass coffee to the array of coffees 
	CurrentCart.addCoffee = function (coffee) {
		CurrentCart.coffees.push(coffee);

		// insert the new cart into the storage as string
		localStorage.setItem('cart', JSON.stringify(CurrentCart));

	}

	for(var i = 0; i < coffeeimages.length; i++) {
		coffeeimages[i].addEventListener("dragstart", function (ev) {
			ev.dataTransfer.effectAllowed = 'copy';
			ev.dataTransfer.setData("Text", this.getAttribute("id"));
		}, false);
	}

	shoppingCartDropZone.addEventListener("dragover", function (ev) {
		if (ev.preventDefault)
			ev.preventDefault();
		ev.dataTransfer.dropEffect = "copy";
		return false;
	}, false);


	shoppingCartDropZone.addEventListener("drop", function (ev) {
		if (ev.stopPropagation)
			ev.stopPropagation();

		var coffeeId = ev.dataTransfer.getData("Text");
		var element = document.getElementById(coffeeId);
	

		addCoffeeToShoppingCart(element, coffeeId);
		ev.stopPropagation();

		return false;
	}, false);

	function addCoffeeToShoppingCart(item, id) {
		// getting hold of the data-price attribute and stored in price avriable 
		var price = item.getAttribute("data-price");
		// creating new coffee instance passing id and price
		var Coffee = new Coffee (id , price);
		//calling add coffee function this is define in updateshoppingcarUI
		CurrentCart.addCoffee(id , price);
		updateShoppingCartUI();
		
}

	// creating emtycart function

	function CreateEmtyCart() {
		/// clearing local storage
		localStorage.clear();
		localStorage.setItem("cart", JSON.stringify(new Cart()));

		//parsing of the cart item getting from locala storage
		CurrentCart = JSON.parse(localStorage.getItem("cart"));

	}

	function updateShoppingCartUI() {
		//setting inner HTML of Shopping cart to emty
		shoppingcart.innerHTML = "";
		for(var i = 0; i < CurrentCart.coffees.length; i++) {
			var liElement = document.createElement('li');
			liElement.innerHTML = CurrentCart.coffees[i].coffeeId + " " + CurrentCart.coffees[i].price;
			shoppingcart.appendChild(liElement);

		}


	}
}

