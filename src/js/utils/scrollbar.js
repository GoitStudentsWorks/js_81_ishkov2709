import SmoothScrollbar from 'smooth-scrollbar';
import { fetchCategories } from "../service/API"

function createCategoryButton(category, onClick) {
    const button = document.createElement('button');
    button.textContent = category;
    button.classList.add('button-category')
    button.addEventListener('click', onClick);
    return button;
  }
  
  async function createCategoriesBlock() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    const scrollContent = categoriesContainer.querySelector('.scroll-content');
  
    // Очищення контейнера перед додаванням категорій
    scrollContent.innerHTML = '';
  
    // Отримання переліку категорій з бекенду
    const categories = await fetchCategories();
  
    // Збереження посилань на кнопки категорій
    const categoryButtons = [];
  
    // Створення кнопок категорій та додавання їх до контейнера
    categories.forEach(category => {
      const button = createCategoryButton(category.name, () => {
        
        console.log(`Вибрано категорію: ${category.name}`);
        
        categoryButtons.forEach(button => {
          button.classList.remove('active');
          return
        });
        
        button.classList.add('active');
      });
  
      categoryButtons.push(button);
      scrollContent.appendChild(button);
    });
  

    // Ініціалізація scrollbar'у
        
    const scrollbar = SmoothScrollbar.init(categoriesContainer, {
      alwaysShowTracks: true
    });
  }
  
  // Створення блоку з переліком категорій
  const categoriesContainer = document.getElementById('categoriesContainer');
  const scrollContent = document.createElement('div');
  scrollContent.className = 'scroll-content';
  categoriesContainer.appendChild(scrollContent);
  
  // Додавання функціоналу кнопці "All categories"
  const allCategoriesButton = document.getElementById('allCategoriesButton');
  allCategoriesButton.addEventListener('click', () => {
    // Виконати запит на бекенд для отримання рецептів всіх категорій
    console.log('Вибрано всі категорії');
    // Зняти стилізацію з усіх кнопок категорій
    const categoryButtons = Array.from(document.querySelectorAll('.scroll-content button'));
    categoryButtons.forEach(button => {
      button.classList.remove('active');
    });
  });
  
  // Створення блоку з переліком категорій
  createCategoriesBlock();