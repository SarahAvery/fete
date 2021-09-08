# Fete

### Group Members: [Matthew Banks](https://github.com/fictionalparakeets), [Sarah Avery](https://github.com/SarahAvery)

## Overview

For our final week-long project here at Lighthouse Labs, we created an app called Fete.

Fete is a project management app that is geared towards people in the wedding planning profession. Fete allows a wedding planner to keep track of all their tasks for each event they have on the go, in one place, and helps them stay organized.

A planner is able to see from their dashboard all of their open events, and the progress made. From the dashboard, one can create a new event, or modify any information from an existing one.

Each event has its own kanban-style board, which shows all the tasks for the event, and what stage of completion they are on. The planner can add new tasks to a particular column, move a task from one column to another, edit or delete a task, as well as rename any column to customize it to their specific needs.

## Product

#### Dashboard

!["Dashboard"](https://github.com/SarahAvery/finals/blob/main/src/assets/dashboard.png?raw=true)

#### Event Board

!["Board"](https://github.com/SarahAvery/finals/blob/main/src/assets/board.png?raw=true)

#### Event Profile

!["Event Profile"](https://github.com/SarahAvery/finals/blob/main/src/assets/event-profile.png?raw=true)

## Getting Started

### Front-End

1. Fork this repo, then clone your fork.
2. Install dependencies using 'yarn install'
3. After starting the server (see below), run 'yarn start'
4. Navigate to "localhost:8000"

### Back-End

1. Fork and Clone this ["repo"](https://github.com/SarahAvery/finals-api)
2. Follow the README

## Dependencies

### Front-End

- babel/code-frame: 7.14.5
- babel: 6.23.0
- classnames: 2.3.1
- jsonwebtoken: 8.5.1
- node: 16.6.1
- react: 16.9.0
- react-datepicker: 4.2.1
- react-dom: 16.9.0
- react-router-dom: 5.2.0
- react-scripts: 4.0.0
- sass: 1.37.5

### Future Goals

In the future for this app, we would like to be able to add roles, scope, and permissions, to allow a planner to invite the couple to see their event. This would allow the couple to see the board, and basic information about it. The permissions would ensure that only a planner is able to modify (move, edit or delete) any of the tasks, and the couple can only view it. By adding this feature in the future, we think it would help to connect the planner and the couple more so, by everyone always able to be on the same page in the process. We know weddings can already be a stressful thing, and by keeping it more transparent, might help alleviate some of that.
