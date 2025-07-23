# React Labs - Web Design with React I

This comprehensive portfolio demonstrates Web Design with React I fundamentals, covering JSX syntax, components and props, thinking in React development patterns, and code splitting techniques across multiple exercises and interactive applications.

## Project Overview

A complete collection of Web Design with React I exercises showcasing:
- **JSX Syntax** (JavaScript XML for React component development)
- **Components and Props** (Component architecture and data flow)
- **Thinking in React** (React development paradigms and patterns)
- **Code Splitting** (Performance optimisation and component organisation)
- **Interactive Applications** (State management and user interactions)
- **Modern React Practices** (Hooks, functional components, and best practices)

## Technology Stack

| Exercise | React Concepts | Key Features |
|----------|----------------|--------------|
| **Greeting Component** | JSX, Props | Basic component structure, Props handling |
| **Big Cats Display** | Components, Props | Component composition, Data rendering |
| **Emoji Mood Switcher** | State, Events | Interactive state management, Event handling |
| **Big Cats Extended** | Advanced Props | Complex data flow, Component interaction |
| **Big Cats Custom** | Forms, CRUD | Form handling, Data manipulation |
| **Calculator** | Complex State | Advanced state management, Mathematical operations |

## Table of Contents

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Development Commands](#development-commands)
- [React I Concepts Covered](#react-i-concepts-covered)
- [Exercise 1: JSX and Basic Components](#exercise-1-jsx-and-basic-components)
- [Exercise 2: Components and Props](#exercise-2-components-and-props)
- [Exercise 3: Thinking in React - State Management](#exercise-3-thinking-in-react---state-management)
- [Exercise 4: Advanced Component Patterns](#exercise-4-advanced-component-patterns)
- [Exercise 5: Code Splitting and Organisation](#exercise-5-code-splitting-and-organisation)
- [Exercise 6: Complex React Application](#exercise-6-complex-react-application)

---

## Project Structure

```
IOD/Module6Lab/
├── public/
│   └── index.html              # Main HTML template
├── src/
│   ├── components/
│   │   ├── Greeting.jsx        # Exercise 1 - Greeting component
│   │   ├── BigCats.jsx         # Exercise 2 - Main cats container
│   │   ├── SingleCat.jsx       # Exercise 2 - Individual cat card
│   │   ├── Emoji.jsx           # Exercise 3 - Mood switcher component
│   │   ├── BigCatsExtended.jsx # Exercise 4 - Extended cats with controls
│   │   ├── SingleCatExtended.jsx # Exercise 4 - Extended individual cat card
│   │   ├── BigCatsCustom.jsx   # Exercise 5 - CRUD operations with form
│   │   ├── SingleCatCustom.jsx # Exercise 5 - Cat card with delete button
│   │   ├── AddCatForm.jsx      # Exercise 5 - Form for adding new cats
│   │   └── Calculator.jsx      # Exercise 6 - Basic calculator component
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── package.json                # Dependencies and scripts
└── README.md                   # This documentation
```

---

## Setup

1. Navigate to the Module6Lab directory:
```bash
cd IOD/Module6Lab
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser to http://localhost:3000

---

## Development Commands

```bash
# Start development server
npm start

# Create production build
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

---

## Technologies Used

### Core Technologies
- **React 18.2.0** - Main framework
- **React DOM 18.2.0** - DOM rendering
- **React Scripts 5.0.1** - Build tools and dev server

### Development Tools
- **Create React App** - Project scaffolding
- **ES6+ JavaScript** - Modern JavaScript features
- **JSX** - React component syntax
- **CSS3** - Advanced styling with Grid and Flexbox

### External Resources
- **Unsplash API** - High-quality cat images
- **Google Fonts** - Typography (system fonts)

### React Concepts Demonstrated
- **Functional Components** - Modern React pattern
- **Props** - Component data passing
- **Children Props** - Content composition
- **Array Mapping** - Dynamic list rendering
- **Keys** - React reconciliation optimisation
- **Component Composition** - Reusable component design
- **Conditional Rendering** - Dynamic content display
- **State Management** - useState hook for interactive components
- **Event Handling** - onClick events and user interactions
- **State Updates** - Functional state updates with hooks
- **Array Methods** - map, filter, sort, reverse for data manipulation
- **Immutable Updates** - Spread operator for safe state updates
- **Conditional Logic** - Dynamic filtering and sorting algorithms
- **Controlled Components** - Form inputs with state management
- **CRUD Operations** - Create, Read, Update, Delete functionality
- **Callback Props** - Parent-child component communication
- **Form Validation** - Input validation and error handling
- **Mathematical Operations** - Basic arithmetic calculations
- **Error Handling** - Input validation and error prevention
- **Switch Statements** - Conditional logic for operations

---

## Exercise 1: Greeting Component

This exercise demonstrates creating reusable React components with props and children support.

### Running Exercise 1

The Greeting component runs automatically when you start the development server. You'll see multiple greeting examples displayed at the top of the page.

### Component Features

#### Core Requirements ✅
- ✅ **Separate File**: Created in `src/components/Greeting.jsx`
- ✅ **Default Text**: Renders "Hello World" when no props provided
- ✅ **Name Prop**: Replaces "World" with provided name
- ✅ **Children Support**: Displays additional greeting messages via children
- ✅ **App Integration**: Imported and used in `App.jsx`

#### Implementation Details

**Greeting Component** (`src/components/Greeting.jsx`):
```jsx
const Greeting = ({ name, children }) => {
  return (
    <div className="greeting">
      <h1>Hello {name || 'World'}!</h1>
      {children && <div className="greeting-children">{children}</div>}
    </div>
  );
};
```

### Usage Examples

The app demonstrates multiple usage patterns:

1. **Basic Greeting** (no props):
```jsx
<Greeting />
// Renders: "Hello World!"
```

2. **With Name Prop**:
```jsx
<Greeting name="John" />
// Renders: "Hello John!"
```

3. **With Name and Children**:
```jsx
<Greeting name="Sarah">
  Welcome to our React application!
</Greeting>
// Renders: "Hello Sarah!" + welcome message
```

4. **Children Only**:
```jsx
<Greeting>
  This is a greeting message via children props.
</Greeting>
// Renders: "Hello World!" + custom message
```

### Testing

- Verify default "Hello World" message appears
- Cheque that name prop correctly replaces "World"
- Confirm children content displays properly
- Test responsive styling on different screen sizes

---

## Exercise 2: Big Cats Display

This exercise demonstrates advanced React concepts including component composition, array mapping, keys, and external data integration.

### Running Exercise 2

The Big Cats component runs automatically and appears in the second section of the page, displaying a responsive grid of big cat cards.

### Component Architecture

#### Components Created
1. **BigCats** (`src/components/BigCats.jsx`) - Main container component
2. **SingleCat** (`src/components/SingleCat.jsx`) - Individual cat card component

#### Core Requirements ✅
- ✅ **Separate Files**: Both components in individual files
- ✅ **Cats Array**: Uses provided cat data with latin names
- ✅ **Unique IDs**: Added unique ID to each cat (1-7)
- ✅ **Key Props**: Fixed React key warnings using `key={cat.id}`
- ✅ **SingleCat Component**: Dedicated component for individual cats
- ✅ **Image Property**: Added high-quality images for each cat
- ✅ **Styled Display**: Beautiful responsive grid layout

### Features Implemented

#### Enhanced Data Structure
```javascript
const cats = [
  {
    id: 1,
    name: 'Cheetah',
    latinName: 'Acinonyx jubatus',
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6...'
  },
  // ... 6 more cats
];
```

#### BigCats Component Features
- **Array Mapping**: Uses `cats.map()` to render components
- **Key Management**: Proper `key={cat.id}` implementation
- **Grid Layout**: Responsive CSS Grid for optimal display
- **Component Composition**: Clean separation using SingleCat

#### SingleCat Component Features
- **Image Display**: High-quality cat images from Unsplash
- **Information Layout**: Name and latin name display
- **Hover Effects**: Smooth animations on interaction
- **Responsive Design**: Works on all screen sizes

### Cat Data Structure

| ID | Name | Latin Name | Image Source |
|----|------|------------|--------------|
| 1 | Cheetah | Acinonyx jubatus | Unsplash |
| 2 | Cougar | Puma concolor | Unsplash |
| 3 | Jaguar | Panthera onca | Unsplash |
| 4 | Leopard | Panthera pardus | Unsplash |
| 5 | Lion | Panthera leo | Unsplash |
| 6 | Snow leopard | Panthera uncia | Unsplash |
| 7 | Tiger | Panthera tigris | Unsplash |

### Styling

#### Key CSS Features
- **CSS Grid**: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- **Card Design**: Modern card layout with shadows and borders
- **Hover Effects**: Transform and scale animations
- **Responsive Images**: `object-fit: cover` for consistent sizing
- **Typography**: Clean hierarchy with proper colour contrast

#### Visual Design Elements
- **Card Shadows**: Subtle depth with hover enhancement
- **Image Scaling**: Zoom effect on hover
- **Colour Scheme**: Professional blues and grays
- **Transitions**: Smooth 0.3s animations
- **Border Radius**: Consistent 12px rounded corners

---

## Exercise 3: Emoji Mood Switcher

This exercise demonstrates React state management using the `useState` hook and event handling for interactive components.

### Running Exercise 3

The Emoji component runs automatically and appears in the third section of the page, displaying an interactive emoji with a mood-changing button.

### Component Features

#### Core Requirements ✅
- ✅ **Separate File**: Created in `src/components/Emoji.jsx`
- ✅ **Initial Happy Emoji**: Starts with 😊 (happy face)
- ✅ **Change Mood Button**: Interactive button to switch moods
- ✅ **Two Emoji States**: Toggles between 😊 (happy) and 😢 (sad)
- ✅ **Click Functionality**: Button switches between the two emojis

#### Implementation Details

**Emoji Component** (`src/components/Emoji.jsx`):
```jsx
const Emoji = () => {
  const [isHappy, setIsHappy] = useState(true);

  const toggleMood = () => {
    setIsHappy(!isHappy);
  };

  return (
    <div className="emoji-container">
      <div className="emoji-display">
        <span className="emoji">{isHappy ? '😊' : '😢'}</span>
      </div>
      <button className="mood-button" onClick={toggleMood}>
        Change Mood
      </button>
    </div>
  );
};
```

### State Management

#### React Hooks Used
- **useState Hook**: `const [isHappy, setIsHappy] = useState(true)`
- **Initial State**: Component starts with `isHappy = true`
- **State Toggle**: Button click toggles between `true` and `false`

#### Event Handling
- **onClick Handler**: `onClick={toggleMood}`
- **Toggle Function**: Switches state using `setIsHappy(!isHappy)`
- **Conditional Rendering**: `{isHappy ? '😊' : '😢'}`

### Interactive Features

#### User Interactions
1. **Initial Load**: Shows happy emoji 😊
2. **First Click**: Changes to sad emoji 😢
3. **Second Click**: Returns to happy emoji 😊
4. **Continuous Toggle**: Button can be clicked repeatedly

#### Visual Feedback
- **Hover Effects**: Button and emoji have hover animations
- **Click Animation**: Button provides visual feedback on click
- **Smooth Transitions**: All state changes are visually smooth

### Styling and Animation

#### Key CSS Features
- **Gradient Background**: Purple gradient container
- **Bounce Animation**: Emoji bounces continuously with CSS keyframes
- **Hover Effects**: Scale transform on emoji and button hover
- **Modern Design**: Rounded corners, shadows, and smooth transitions

#### Animation Details
```css
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}
```

#### Design Elements
- **Card Layout**: Centred container with gradient background
- **Circular Emoji Display**: White circular background for emoji
- **Styled Button**: Modern button with hover and active states
- **Responsive Design**: Works on all screen sizes

---

## Exercise 4: Big Cats Extended

This exercise extends the BigCats component from Exercise 2 with advanced state management, sorting, filtering, and list manipulation features.

### Running Exercise 4

The Big Cats Extended component runs automatically and appears in the fourth section of the page, displaying an interactive grid of big cats with control buttons for sorting and filtering.

### Extended Features

#### Core Requirements ✅
- ✅ **Alphabetical Sorting**: Button to sort cats A-Z by name
- ✅ **Reverse Order**: Button to reverse the current list order
- ✅ **Panthera Filter**: Button to show only cats in the Panthera family
- ✅ **Reset Functionality**: Button to restore the original full list
- ✅ **Extended Components**: New BigCatsExtended and SingleCatExtended components

#### Enhanced Functionality
- 🔄 **Dynamic State Management**: Real-time list updates
- 📊 **Display Counter**: Shows "X of Y cats" information
- 🎯 **Visual Feedback**: Button states and smooth transitions
- 📱 **Responsive Controls**: Button layout adapts to screen size

### Control Functions

#### Sorting and Filtering Logic
```jsx
const sortAlphabetically = () => {
  const sorted = [...displayedCats].sort((a, b) => a.name.localeCompare(b.name));
  setDisplayedCats(sorted);
  setIsReversed(false);
};

const filterPanthera = () => {
  const pantheraFamily = cats.filter(cat => cat.latinName.includes('Panthera'));
  setDisplayedCats(pantheraFamily);
  setIsReversed(false);
};
```

#### Button Functions
1. **Sort A-Z**: Alphabetically sorts by cat name using `localeCompare()`
2. **Reverse Order**: Reverses current list using `reverse()`
3. **Panthera Family**: Filters cats with "Panthera" in latin name
4. **Reset List**: Restores original cats array

### State Management

#### React State Variables
- **displayedCats**: Current cats being shown (initially full list)
- **isReversed**: Tracks if list is in reversed order

#### State Updates
- All functions use spread operator `[...displayedCats]` to avoid mutation
- State resets `isReversed` flag when appropriate
- Original `cats` array remains unchanged as source of truth

### User Interface

#### Control Buttons
- **Modern Design**: Gradient backgrounds with hover effects
- **Visual Hierarchy**: Reset button has different colour (red)
- **Responsive Layout**: Flexbox with gap and wrap
- **Accessibility**: Clear labels and visual feedback

#### Information Display
- **Counter**: Shows current vs total cats count
- **Status Updates**: Real-time updates when filtering/sorting
- **Clean Layout**: Consistent spacing and typography

### Component Architecture

#### File Structure
- **BigCatsExtended.jsx**: Main component with state and controls
- **SingleCatExtended.jsx**: Individual cat display component
- **Separation of Concerns**: Logic separated from presentation

#### Data Flow
1. **Initial State**: `displayedCats` set to full `cats` array
2. **User Interaction**: Button clicks trigger state update functions
3. **Re-render**: Component automatically updates with new state
4. **Visual Update**: Grid shows filtered/sorted results

#### Panthera Family Cats
When "Panthera Family" filter is applied, shows:
- **Jaguar** (Panthera onca)
- **Leopard** (Panthera pardus)
- **Lion** (Panthera leo)
- **Snow leopard** (Panthera uncia)
- **Tiger** (Panthera tigris)

*Note: Cheetah and Cougar are filtered out as they're not in Panthera genus*

---

## Exercise 5: Big Cats Custom

This exercise extends the BigCats functionality with full CRUD (Create, Read, Update, Delete) operations, including a form for adding new cats and delete functionality for existing ones.

### Running Exercise 5

The Big Cats Custom component runs automatically and appears in the fifth section of the page, displaying an interactive form for adding cats and a grid of cats with delete buttons.

### Custom Features

#### Core Requirements ✅
- ✅ **AddCatForm Component**: Controlled form with name, latinName, and image inputs
- ✅ **Form Submission**: Updates parent component and re-renders list
- ✅ **Delete Functionality**: Delete link/button next to each cat
- ✅ **Dynamic Updates**: Real-time list updates without page refresh
- ✅ **Custom Components**: BigCatsCustom and SingleCatCustom with extended functionality

#### Enhanced Functionality
- 🎯 **Input Validation**: Required fields with error handling
- 🔄 **Auto-incrementing IDs**: Proper unique ID management
- 💾 **State Persistence**: Maintains all cats in component state
- 🎨 **Form Styling**: Beautiful gradient form design
- ⚠️ **Confirmation Dialogue**: Delete confirmation to prevent accidents

### Form Management

#### Controlled Components
```jsx
const [formData, setFormData] = useState({
  name: '',
  latinName: '',
  image: ''
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

#### Form Features
- **Name Input**: Cat common name (e.g., "Lion")
- **Latin Name Input**: Scientific name (e.g., "Panthera leo")
- **Image URL Input**: URL validation for cat images
- **Form Reset**: Clears form after successful submission
- **Validation**: Prevents submission with empty fields

### CRUD Operations

#### Create (Add New Cat)
1. **Form Input**: User fills in cat details
2. **Validation**: Cheques all fields are filled
3. **ID Generation**: Auto-assigns next available ID
4. **State Update**: Adds cat to both allCats and displayedCats
5. **UI Update**: Cat appears immediately in grid

#### Read (Display Cats)
- **Grid Display**: Shows all cats in responsive grid
- **Image Rendering**: Displays cat images with proper sizing
- **Information Display**: Shows name and latin name

#### Delete (Remove Cat)
1. **Confirmation**: Shows "Are you sure?" dialogue
2. **State Update**: Removes cat from allCats array
3. **Filter Update**: Removes from displayedCats if currently shown
4. **UI Update**: Cat disappears from grid immediately

### Component Architecture

#### New Components Created
- **AddCatForm.jsx**: Form component with controlled inputs
- **BigCatsCustom.jsx**: Extended container with CRUD operations
- **SingleCatCustom.jsx**: Individual cat card with delete button

#### State Management
```jsx
const [allCats, setAllCats] = useState(initialCats);
const [displayedCats, setDisplayedCats] = useState(initialCats);
const [nextId, setNextId] = useState(8);
```

#### Props and Callbacks
- **onAddCat**: Callback prop for form submission
- **onDelete**: Callback prop for delete operation
- **cat**: Cat data object passed to display component

### Data Flow

#### Add Cat Flow
1. **User Input**: Types in form fields
2. **State Update**: handleInputChange updates formData
3. **Form Submit**: handleSubmit validates and calls onAddCat
4. **Parent Update**: BigCatsCustom receives new cat data
5. **State Merge**: New cat added to allCats array
6. **Re-render**: Component updates to show new cat

#### Delete Cat Flow
1. **User Click**: Clicks delete button on cat card
2. **Confirmation**: Browser confirms action with user
3. **Callback**: onDelete called with cat ID
4. **State Filter**: Cat removed from allCats and displayedCats
5. **Re-render**: Component updates to hide deleted cat

#### Form Validation
- **Required Fields**: All inputs must be filled
- **URL Validation**: Image field expects valid URL format
- **Error Handling**: Alert shown for validation failures
- **Success Feedback**: Form clears on successful submission

---

## Exercise 6: Calculator

This exercise demonstrates form handling, mathematical operations, error handling, and user input validation in a functional calculator component.

### Running Exercise 6

The Calculator component runs automatically and appears in the sixth section of the page, providing a clean interface for performing basic mathematical calculations.

### Calculator Features

#### Core Requirements ✅
- ✅ **Two Number Inputs**: Controlled input fields for first and second numbers
- ✅ **Operator Selection**: Dropdown menu with +, -, ×, ÷ operations
- ✅ **Result Display**: Shows calculation result with formatted equation
- ✅ **User Interaction**: Calculate and Clear buttons for operation control
- ✅ **Basic Calculator**: Performs fundamental arithmetic operations

#### Enhanced Functionality
- 🎯 **Input Validation**: Comprehensive error checking and user feedback
- 🔢 **Number Parsing**: Handles integers and decimal numbers
- ⚠️ **Error Handling**: Division by zero and invalid input protection
- 🎨 **Modern Design**: Gradient background with glass-morphism effects
- 📱 **Responsive Layout**: Adapts to different screen sizes

### User Interface

#### Input Controls
```jsx
<input
  type="number"
  value={num1}
  onChange={(e) => setNum1(e.target.value)}
  placeholder="Enter first number"
/>

<select value={operator} onChange={(e) => setOperator(e.target.value)}>
  <option value="+">+ (Add)</option>
  <option value="-">- (Subtract)</option>
  <option value="*">× (Multiply)</option>
  <option value="/">÷ (Divide)</option>
</select>
```

#### Action Buttons
- **Calculate Button**: Performs the mathematical operation
- **Clear Button**: Resets all inputs and results
- **Visual Feedback**: Hover effects and button states

### Error Handling

#### Validation Cheques
1. **Empty Fields**: Ensures both numbers are entered
2. **Valid Numbers**: Verifies inputs are numeric values
3. **Division by Zero**: Prevents mathematical errors
4. **Invalid Operators**: Handles unexpected operator values

#### Error Messages
```jsx
if (num1 === '' || num2 === '') {
  setError('Please enter both numbers');
  return;
}

if (number2 === 0 && operator === '/') {
  setError('Cannot divide by zero');
  return;
}
```

### Validation Logic

#### Input Processing
- **parseFloat()**: Converts string inputs to numbers
- **isNaN()**: Validates numeric input
- **Real-time Validation**: Cheques inputs before calculation
- **User Feedback**: Clear error messages for invalid inputs

#### State Management
```jsx
const [num1, setNum1] = useState('');
const [num2, setNum2] = useState('');
const [operator, setOperator] = useState('+');
const [result, setResult] = useState(null);
const [error, setError] = useState('');
```

### Mathematical Operations

#### Supported Operations
| Operator | Symbol | Description | Example |
|----------|--------|-------------|---------|
| + | Addition | Adds two numbers | 5 + 3 = 8 |
| - | Subtraction | Subtracts second from first | 5 - 3 = 2 |
| * | Multiplication | Multiplies two numbers | 5 × 3 = 15 |
| / | Division | Divides first by second | 6 ÷ 3 = 2 |

#### Calculation Logic
```jsx
switch (operator) {
  case '+': calculation = number1 + number2; break;
  case '-': calculation = number1 - number2; break;
  case '*': calculation = number1 * number2; break;
  case '/': calculation = number1 / number2; break;
}
```

#### Result Display
- **Formatted Equation**: Shows "5 + 3 = 8" format
- **Highlighted Answer**: Result value emphasised with styling
- **Clear Presentation**: Clean, readable number formatting

---
