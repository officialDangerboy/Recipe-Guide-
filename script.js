const searchBtn = document.querySelector('.searchBtn')
const searchValue = document.querySelector('.searchValue')
const recipeContainer = document.querySelector('.recipeContainer')
const infoRecipe = document.querySelector('.infoRecipe')
const popClose = document.querySelector('.closeBtn')

async function fetchRecipe(dish) {
  recipeContainer.innerHTML = `<h2 class="topp bi bi-cloud-arrow-down">Fetching Recipes, Please Wait...</h2>`;

 try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`);
    const data = await response.json();
     if (data.meals) {
      renderData(data.meals);
    } else {
      recipeContainer.innerHTML = `<h2 class="topp bi bi-exclamation-triangle"> No recipes found for "${dish}"</h2>`;
    }

  } catch (error) {
    recipeContainer.innerHTML = `<h2 class="topp bi bi-exclamation-triangle"> Error fetching recipes. Please try again later</h2>`;
   }
}


function renderData(arr) {
  recipeContainer.innerHTML = ''
  arr.forEach(ele=>{
    let div = document.createElement('div')
    div.classList.add('cards')
    div.innerHTML = `
       <div class="dishImg">
            <img src="${ele.strMealThumb}" alt="" width="300" />
          </div>
          <div class="dishInfo">
            <h1><i class='bi bi-emoji-heart-eyes'></i> ${ele.strMeal}</h1>
            <p class='bi bi-geo-alt-fill'> <span>${ele.strArea}</span> Dish</p>
            <p class='bi bi-boxes'> Belongs to <span>${ele.strCategory}</span> Category</p>
          </div>
    `
    let viewBtn = document.createElement('button')
    viewBtn.classList.add('recipeBtn','topp','bi','bi-eye')
    viewBtn.innerText = `View Recipe`
    div.appendChild(viewBtn)
    
    viewBtn.addEventListener('click',()=>{
      recipePop(ele)
    })
    
    
    recipeContainer.appendChild(div)
    searchValue.value =''
    
  })
}


function recipePop(arr) {
  infoRecipe.innerHTML =''
  infoRecipe.parentElement.classList.add('active')
  infoRecipe.innerHTML = `
    <h1 class='topp bi bi-emoji-smile-upside-down'>  ${arr.strMeal}</h1>
    <div class='ingredient'>
      <h3 class='topp bi bi-droplet-half'> Ingredients:</h3>
      <ul>${fetchIngredinet(arr)}</ul>
    </div>
    <div class='instruction'>
      <h3 class='topp bi bi-exclamation-octagon'>  Instructions :</h3>
      <p>${arr.strInstructions}</p>
    </div>
  `
  recipeContainer.classList.add('hide')
}

function fetchIngredinet(arr) {
  let ingredientList = ''
  for(let i=1;i<=20;i++){
    const ingredient = arr[`strIngredient${i}`];
    if(ingredient){
      const mesure = arr[`strMeasure${i}`];
      ingredientList += `<li>${mesure} ${ingredient}</li>`
    }else{
      break;
    }
  }
  return ingredientList
}

popClose.addEventListener('click',()=>{
  infoRecipe.parentElement.classList.remove('active')
  recipeContainer.classList.remove('hide')
})

searchBtn.addEventListener('click',(e)=>{
  e.preventDefault()
  if(!searchValue.value){
    recipeContainer.innerHTML = `<h1 class="topp bi bi bi-emoji-frown">Search Box Can't be Empty..</h1>`
    return 
  }
  fetchRecipe(searchValue.value.trim())
  
})
