function Recipe(name, ingredients, totalTime, steps){
	this.name = name;
	this.ingredients = ingredients;
	this.totalTime = totalTime;
	this.steps = steps;
}

var myRecipes = {};

myRecipes.addRecipe = function(recipe){
	if (localStorage){
		var recipes = localStorage.getItem("recipes");
		if (recipes){
			recipes = JSON.parse(recipes);
			recipes.push(recipe);
			recipes = JSON.stringify(recipes);
		}
		else{
			recipes = "[" + JSON.stringify(recipe) +"]";
		}
		localStorage.setItem("recipes", recipes);
	}
};

myRecipes.removeRecipe = function(recipe){
	if (localStorage){ 
		var recipes = JSON.parse(localStorage.getItem("recipes"));
		recipes.splice(recipes.indexOf(recipe), 1);
		localStorage.setItem("recipes", JSON.stringify(recipes));
	}
};

myRecipes.getRecipes = function(){
	if (localStorage){
		var recipes = localStorage.getItem("recipes");
		if (recipes){
			return JSON.parse(localStorage.getItem("recipes"));
		}
	}
};