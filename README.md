# Unagi Frontend Test

# Install dependencies

npm install

# Start API & Dev server

npm start

# Navigate to http://localhost:8000/collection to see the implementation

## Requirements

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)

## Basics

**Unagi** is on a mission to upgrade fantasy sport game to a new level.

In this exercise, we'll test your React skills by creating a simple collection card website.

The project is already setup in this repository, so to start, fork it and when
you are done, invite @hmatthieu and @omar-elshamy on GitHub to collaborate on it.

You are encouraged to go beyond the scope. Check the bonus ideas at each step
if you need some inspiration.

**Please spend no more than 4 hours on this test unless you go beyond the scope.**

## Steps

For each step below you will need to edit some files already provided,
but don't hesitate to go further, e.g. add new utility or components files.
Also, it will be great if you split your steps using branches or commits.

Don't hesitate to over-engineer the problem a bit, so we will be able to see
the way you work, split and organize your file on a real project.

```sh
# Install dependencies
npm install

# Start API & Dev server
npm start
```

### 1. Show a single static card on `/collection` page

Fill `Collection` component in [Collection.tsx](src/pages/Collection.tsx) to show
a single card with the data stored in `card` variable (line 9).

This page can be seen on [http://localhost:8000/collection](http://localhost:8000/collection)

Bonus points (can be done in arbitrary order):

- Add TS types/interfaces where applicable.
- Convert code to fetch the player image without having the full URL,
  but by generating it with the existing ID.
- Implement simple lazy loading for the player image, show loading indicator
  while the image is loading.
- Format player DOB in a human-readable way.

### 2. Fetch collection from a fake REST API

Rework `fetchCollection` function in [collection.ts](/src/lib/collection.ts)
to fetch cards from http://localhost:8001/cards instead of the local constant.

Apply necessary changes to [Collection](/src/pages/Collection.tsx) component if needed.

Bonus points (can be done in arbitrary order):

- Add loading state in the UI.
- Handle error state, e.g. if the server returns 500.
- Implement a reusable card component.
- Replace existing plain CSS styles with [Styled Components](https://styled-components.com/)
  if you see the benefits.
- Add TS types/interfaces in React components where applicable.

### 3. Edit the popup on `/create-card` page

Fill `CreateCard` component in [CreateCard.tsx](/src/pages/CreateCard.tsx) to allow user
to create a card. In this test project [json-server](https://github.com/typicode/json-server)
is used as a fake API server.

You can use `json-server` to persist changes for this API.
Basically, you can POST json onto http://localhost:8001/cards.

Bonus points (can be done in arbitrary order):

- Implement client-side validation.
- Implement REST/REST-like endpoint(s).
- Add TS types/interfaces where applicable.
- Handle server-side errors, e.g. 4xx on submitting.

### 4. Show all the cards as a collection

On a real use case, we don't want to show only one card, so please update the code to show each
card in the collection (e.g. a grid of cards).

Make sure that this screen is responsive.

Bonus points (can be done in arbitrary order):

- Add loading state in the UI.
- Add empty state (endpoint returns an empty array).
- Add simple client-side ordering by any criteria - DOB/Last name/First name etc.
  with a UI control, e.g. Radio button.

## Scoring

You will be evaluated based on the following criteria:

- **Functionality:**
  - Does your code work?
  - Think build, warnings, error management.
- **Readability:**
  - Is your code maintainable?
  - Think code splitting, Typescript, git.
- **Creativity is a bonus:**
  - Did you go further the scope? But should not interfere with the two previous point.

**Ideas and tools we love and use in the real project:**

- TypeScript without `any`
- Hooks
- Breaking code down to small pieces
- Reusable components
- Types shared across client and backend services
- Automated code linting and formatting
- CSS in JS

### Good luck!
