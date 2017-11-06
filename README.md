## Application description

You can create up to 5 rectangles using control form on top.
You can manipulate the position and the size of rectangles, using the control form.
You can also delete rectangle.
To manipulate or delete rectangle select it by clicking and then use control form.
You can deselect rectangle by clicking on the empty area inside playground (blue area).

The sum of rectangles widths cannot be larger than the viewport width.

Rectangles can stretch height of the rectangles playground area (blue area),
but cannot go outside the width of viewport.

If you will resize the viewport rectangles will change there position regarding
right side of the view port.

On resize, validation of the width sum will be called in debounce.
If sum will exceed the viewport width the error message will appear.

The state of the playground component will be saved in the localeStorage.

You can print and see that the colors will be changed vice versa.

## Install

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
