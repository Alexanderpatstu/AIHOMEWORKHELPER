# 📊 Grade Calculator

A beautiful, interactive grade calculator with support for both simple and weighted grading systems.

## Features

### 🔄 Two Calculation Modes

#### Simple Mode
- Calculate average grade from multiple categories
- Each category has points earned and max points
- Perfect for quick grade calculations

#### Weighted Mode
- Assign weights to different grade categories
- For example: Homework 30%, Midterm 20%, Final 50%
- More realistic for actual course grading
- Real-time weight validation

### ✨ Features

- **Real-time Calculation**: Results update instantly as you type
- **Flexible Categories**: Add unlimited grade categories
- **Visual Feedback**: Color-coded letter grades (A-F)
- **Responsive Design**: Works on desktop and mobile
- **Clean UI**: Modern, intuitive interface
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## How to Use

### Simple Mode

1. Click the **Simple Mode** tab (default)
2. For each category:
   - Enter a name (e.g., "Homework", "Quiz 1")
   - Enter points earned
   - Enter max points
3. Your overall grade appears instantly at the bottom
4. Click **Remove** to delete a category
5. Click **+ Add Category** to add more

### Weighted Mode

1. Click the **Weighted Mode** tab
2. For each category:
   - Enter a name
   - Enter points earned
   - Enter max points
   - Set the weight percentage (drag the slider)
3. Make sure weights add up to 100%
4. Your weighted grade appears at the bottom
5. Add/remove categories as needed

## Grade Scale

| Letter | Percentage |
|--------|------------|
| A      | 90% - 100% |
| B      | 80% - 89%  |
| C      | 70% - 79%  |
| D      | 60% - 69%  |
| F      | Below 60%  |

## Examples

### Simple Mode Example
- Homework: 45/50 (90%)
- Midterm: 85/100 (85%)
- Final: 92/100 (92%)
- **Average: 89%** → **B**

### Weighted Mode Example
- Homework (30% weight): 45/50 = 90%
- Midterm (20% weight): 85/100 = 85%
- Final (50% weight): 92/100 = 92%
- **Weighted Grade: 90.1%** → **A**

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - All calculation logic
- `README.md` - This file

## Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start calculating grades!

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Opera

## License

Free to use and modify!