const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');

//search meal and fetch from API
function searchMeal(e) {
	e.preventDefault();

	//clear single meal
	single_mealEl.innerHTML = '';

	const term = search.value;

	console.log(term);

	//check for empty
	if (term.trim()) {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
				if (data.meals === null) {
					resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
				} else {
					mealsEl.innerHTML = data.meals
						.map(
							(meal) => `
					<div class="meal">
					<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
					<div class="meal-info" data-mealID="${meal.idMeal}">
					<h3 data-mealID="${meal.idMeal}">${meal.strMeal}</h3>
					</div>
					</div>`
						)
						.join('');
				}
			});
		//clear search text
		search.value = '';
	} else {
		alert('Please enter a search term');
	}
}

//fetch meal by id
function getMealByID(mealID) {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
		.then((res) => res.json())
		.then((data) => {
			const meal = data.meals[0];

			addMealToDom(meal);
		});
}
//add meal to dom
function addMealToDom(meal) {
	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasures${i}`]}`
			);
		} else {
			break;
		}
	}

	single_mealEl.innerHTML = `< class="single-meal">
	<h1>${meal.strMeal}</h1>
	<img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
	<div class="single-meal-info">
	${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
	${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
	</div>
	<div class="main">
	<p></p>
	</div>
	</div>`;
	console.log(meal.strMeal);
}
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', (e) => {
	const mealID = e.target.getAttribute('data-mealid') || '';
	console.log({ mealID });
	getMealByID(mealID);
});
