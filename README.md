# React Collapsing Table [![Build Status](https://travis-ci.org/massmutual/react-collapsing-table.svg?branch=master)](https://travis-ci.org/massmutual/react-collapsing-table)


Thanks for taking a look at the react collapsping table. This was inspired by the the [jquery datatables library](https://datatables.net/). You can see a working example of this app [here](https://massmutual.github.io/react-collapsing-table/). You can also see an [example](https://github.com/Salinn/travel-receipts) of this app using custom components that has redux hooked up.

## Table of Contents
- Features
- Installing
- Styling
- Props
- Examples
- Contributing

---

### Features
This table is designed to dynamically change size based on the screen width. This is the main goal so that a drop down becomes avaible once any column is hidden and then that row can be expanded or closed based on a user clicking the table.

We have also included basic pagination and a global table search feature that highlights the found results. These features opperate best when you pass it all of the data that you have recieved. These features do not work with fetching eternal data.

---

### Installing
To install simply run
```
npm install react-collapsing-table
```
This has currently only been tested with react 16.

To use in your project just import it by doing
```
import ReactCollapsingTable from 'react-collapsing-table'

const yourComponent({ rows, columns }) => {
    <h1>My Cool Collapsing Table!</h1>
    <ReactCollapsingTable rows={ rows } columns={ columns } />
}
```

---

### Styling
We have given most of the components defined class names to make them easy to add your own styles to. If you want to use our styles that we defined then you can create a css file in your project and copy them from [here](https://github.com/massmutual/react-collapsing-table/blob/master/src/assets/styles/react-table.css).

We tried to make each this table easy to make your own and have added a number of class names and ids to help make it easy to style and giving them each unique names to avoid name collisions.

##### Table Data Cell (td)
- **id**: `td-${currentRowIndex}-${currentColumnIndex} `
-- This uses the generated row and column indexes
- **class name**: `${ accessor }`
-- This uses the column defined attribute as the class name so that you can see all of the attributes that line up to a class name
##### Table Row (tr)
- **id**: `tr-normal-${ rowIndex }`
-- This uses the genereated row index to define which row it is on
- **class name**: `normal-row`

##### Expanded Table Row (tr)
- **id**: `tr-expanded-${ rowIndex }`
-- This uses the genereated row index to define which row it is on
- **class name**: `expanded-row`

##### Columns (th)
- **id**: `column-${accessor}`
-- This uses the data accessor as a unique column name

##### Table (table)
- **class name**: `react-collapsible`

##### Search (div)
- **class name**: `react-collapsible-search`

##### Clear Search (button)
- **class name**: `clear`

##### Pagination (div)
- **class name**: `react-collapsible-page`

---

### Props
##### Rows (default: [])
This is a list of objects. You can pass more data in than you use and the table will ignorethe extra values passed in.
##### Columns (default: none as the default soft column value requires that this cannot be empty)
This is a list of objects that define what data from each row that you want to show the user and where this row should line up.

Each object in this list has the following **required attributes** that define how and when a column should be hidden or what to display to the user.
- **accessor**: This is used to extra the correct value from a row by setting this to the row's key
-- `row: { firstName: 'Paul' }` The accessor to get the value Paul would be `accessor: 'firstName'`
- **label**: This is what a user sees at the top of each column
- **priorityLevel**: This tells the table in which order should the columns be popped off in. The higher the number the sooner it will be popped of.
- **position**: This tells the table where to put each column, do you want this to be the first column or the fourth?
- **minWidth**: This tells the table how wide the table can be total and is used to calculate when to pop off columns when the screen width is smaller than the total minWidths of the visible columns
##### Row Size (default: 15)
This is a number that tells the table how many rows it should display on a table.
##### Current Page (default: 1)
This is used to tell the row what page to display if the results are on a different page on the initial load.
##### Default Sort Column (first column in array)
This is used to tell the column sort what the row to sory by when the direction of the sort is not ascending or descending
##### Column (first column in array)
This is used to tell the table if sorting which column should be displayed as sorted (use accessor of the column as the value)
##### Direction ('ascending')
This is used to tell the table which direction the sorted column is displayed in. The 3 valid options are 'ascending', 'descending' and 'none'

---

### Examples

---

### Contributing
To suggest a feature, create an issue if it does not already exist. If you would like to help develop a suggested feature follow these steps:

- Fork this repo
- Install dependencies with `yarn`
- Auto-build files as you edit with ` yarn start`
-- That will build and watch the components and provide a local storybook instance so that you can view the application by going to `localhost:6006`.
- Implement your changes to files in the `src/` directory
- Submit PR for review when the feature is complete

---
