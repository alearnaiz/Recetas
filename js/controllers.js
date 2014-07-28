var recipesApp = angular.module('recipesApp' , []);

recipesApp.controller('recipesCtrl', function($scope){
	
	// Transforms Array to String
	transformIngredients = function(recipe){
		var ingredients = "";
		$.each(recipe.ingredients, function(i, v){
			ingredients = ingredients + v;
			if ((recipe.ingredients.length-1) != i){
				ingredients = ingredients + ", ";
			}
		});
		return ingredients;
	};
	
	getRecipes = function(){
		var recipes = myRecipes.getRecipes();
		if (recipes){
			$.each(recipes, function(index, value){
				value.ingredients = transformIngredients(value);
			});
		}
		return recipes;
	};
	
	$scope.recipes = getRecipes();
	
	$scope.newRecipe = function(recipe){
		if (!$scope.recipes){
			$scope.recipes = [];
		}
		recipe.ingredients = transformIngredients(recipe);
		$scope.recipes.push(recipe);
	};
	
	$scope.alertSteps = function(steps){
		alert(steps);
	};
	
	$("#recipes").on("pageshow", function(){
		$("#list").listview("refresh");
	});
});

recipesApp.controller('addRecipeCtrl', function($scope){
	$scope.data = {
			name: '',
			ingredients: '',
			totalTime: '',
			steps: ''
	};
	
	$scope.createRecipe = function(){
		
		var name = $scope.data.name;
		
		var ingredients = $scope.data.ingredients.split(",");
		$.each(ingredients, function(index, value){
			ingredients[index] = value.trim();
		});
		var totalTime = $scope.data.totalTime;
		var steps = $scope.data.steps;
		if (name && ingredients && !isNaN(totalTime) && steps){
			var recipe = new Recipe(name, ingredients, totalTime, steps);
			myRecipes.addRecipe(recipe);
			clearData();
			if ($('#recipes').scope()){
				$('#recipes').scope().newRecipe(recipe);
			}
			window.location.href = "#recipes";
		}
		else{
			alert("Todos los campos son obligatorios y deben ser insertados correctamente");
		}		
	};
	
	clearData = function(){
		$scope.data.name = '';
		$scope.data.ingredients = '';
		$scope.data.totalTime = '';
		$scope.data.steps = '';
	};
});

