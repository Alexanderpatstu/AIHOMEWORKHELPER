// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tab).classList.add('active');
        
        // Calculate grades
        if (tab === 'simple') {
            calculateSimpleGrade();
        } else {
            calculateWeightedGrade();
        }
    });
});

// Add event listeners for inputs
function setupCategoryListeners() {
    document.querySelectorAll('.category-inputs input, .weight-slider, .weight-input').forEach(input => {
        input.addEventListener('input', () => {
            const mode = input.closest('.tab-content').id;
            if (mode === 'simple') {
                calculateSimpleGrade();
            } else {
                calculateWeightedGrade();
            }
        });
    });
}

// Add new category
function addCategory(mode) {
    const container = document.getElementById(mode === 'simple' ? 'simpleCategories' : 'weightedCategories');
    const newCategory = document.createElement('div');
    newCategory.className = 'category';
    
    if (mode === 'simple') {
        newCategory.innerHTML = `
            <div class="category-inputs">
                <input type="text" class="category-name" placeholder="Category name">
                <input type="number" class="points-earned" placeholder="Points earned" value="0" min="0" step="0.1">
                <input type="number" class="max-points" placeholder="Max points" value="100" min="1" step="0.1">
                <button class="remove-btn" onclick="removeCategory(this, 'simple')">Remove</button>
            </div>
            <div class="category-percent">--%</div>
        `;
    } else {
        newCategory.innerHTML = `
            <div class="category-inputs">
                <input type="text" class="category-name" placeholder="Category name">
                <input type="number" class="points-earned" placeholder="Points earned" value="0" min="0" step="0.1">
                <input type="number" class="max-points" placeholder="Max points" value="100" min="1" step="0.1">
                <button class="remove-btn" onclick="removeCategory(this, 'weighted')">Remove</button>
            </div>
            <div class="weight-section">
                <label for="weight">Weight:</label>
                <input type="range" class="weight-slider" min="0" max="100" value="0" step="1">
                <input type="number" class="weight-input" value="0" min="0" max="100" step="1">
                <span class="weight-display">0%</span>
            </div>
            <div class="category-percent">--%</div>
        `;
    }
    
    container.appendChild(newCategory);
    setupCategoryListeners();
    
    if (mode === 'simple') {
        calculateSimpleGrade();
    } else {
        calculateWeightedGrade();
    }
}

// Remove category
function removeCategory(btn, mode) {
    const category = btn.closest('.category');
    category.remove();
    
    if (mode === 'simple') {
        calculateSimpleGrade();
    } else {
        calculateWeightedGrade();
    }
}

// Calculate simple grade
function calculateSimpleGrade() {
    const categories = document.querySelectorAll('#simpleCategories .category');
    let totalEarned = 0;
    let totalPossible = 0;
    
    categories.forEach(cat => {
        const earned = parseFloat(cat.querySelector('.points-earned').value) || 0;
        const possible = parseFloat(cat.querySelector('.max-points').value) || 100;
        const percent = possible > 0 ? (earned / possible) * 100 : 0;
        
        cat.querySelector('.category-percent').textContent = percent.toFixed(1) + '%';
        
        totalEarned += earned;
        totalPossible += possible;
    });
    
    const overallPercent = totalPossible > 0 ? (totalEarned / totalPossible) * 100 : 0;
    const grade = getLetterGrade(overallPercent);
    
    document.getElementById('simplePercent').textContent = overallPercent.toFixed(1) + '%';
    document.getElementById('simpleGrade').textContent = grade;
    
    updateResultStyle('simpleGrade', grade);
}

// Calculate weighted grade
function calculateWeightedGrade() {
    const categories = document.querySelectorAll('#weightedCategories .category');
    let weightedSum = 0;
    let totalWeight = 0;
    let invalidWeight = false;
    
    categories.forEach(cat => {
        const earned = parseFloat(cat.querySelector('.points-earned').value) || 0;
        const possible = parseFloat(cat.querySelector('.max-points').value) || 100;
        const weight = parseFloat(cat.querySelector('.weight-input').value) || 0;
        
        const percent = possible > 0 ? (earned / possible) * 100 : 0;
        cat.querySelector('.category-percent').textContent = percent.toFixed(1) + '%';
        
        // Sync weight between slider and input
        const slider = cat.querySelector('.weight-slider');
        const display = cat.querySelector('.weight-display');
        
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            cat.querySelector('.weight-input').value = value;
            display.textContent = value + '%';
            calculateWeightedGrade();
        });
        
        cat.querySelector('.weight-input').addEventListener('input', (e) => {
            let value = parseFloat(e.target.value) || 0;
            if (value > 100) value = 100;
            if (value < 0) value = 0;
            e.target.value = value;
            slider.value = value;
            display.textContent = value + '%';
            calculateWeightedGrade();
        });
        
        weightedSum += (percent * weight);
        totalWeight += weight;
    });
    
    // Update total weight display
    const weightTotalEl = document.getElementById('weightTotal');
    if (totalWeight !== 100) {
        weightTotalEl.style.color = '#d32f2f';
        weightTotalEl.textContent = `Total Weight: ${totalWeight}% (Must be 100%)`;
    } else {
        weightTotalEl.style.color = '#1976D2';
        weightTotalEl.textContent = `Total Weight: ${totalWeight}%`;
    }
    
    const weightedPercent = totalWeight > 0 ? weightedSum / totalWeight : 0;
    const grade = getLetterGrade(weightedPercent);
    
    document.getElementById('weightedPercent').textContent = weightedPercent.toFixed(1) + '%';
    document.getElementById('weightedGrade').textContent = grade;
    
    updateResultStyle('weightedGrade', grade);
}

// Get letter grade
function getLetterGrade(percent) {
    if (percent >= 90) return 'A';
    if (percent >= 80) return 'B';
    if (percent >= 70) return 'C';
    if (percent >= 60) return 'D';
    return 'F';
}

// Update result style based on grade
function updateResultStyle(elementId, grade) {
    const element = document.getElementById(elementId);
    element.parentElement.classList.remove('grade-a', 'grade-b', 'grade-c', 'grade-d', 'grade-f');
    
    switch(grade) {
        case 'A':
            element.parentElement.classList.add('grade-a');
            break;
        case 'B':
            element.parentElement.classList.add('grade-b');
            break;
        case 'C':
            element.parentElement.classList.add('grade-c');
            break;
        case 'D':
            element.parentElement.classList.add('grade-d');
            break;
        case 'F':
            element.parentElement.classList.add('grade-f');
            break;
    }
}

// Initialize
setupCategoryListeners();
calculateSimpleGrade();