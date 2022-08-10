# Nintendo 64 Poll

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

## Overview

Users should be able to:

- View two randomly selected N64 games
- Vote on their favorite of the two
- Continue voting until they wish to view results
- Server should update the vote count to reflect ratings
- View results sorted by vote count
- Have the ability to go back to voting after viewing results

### Screenshot

![screenshot](client/assets/Screenshot.png)

### Links

- Live URL: [Heroku Live App](https://n64-poll.herokuapp.com/)

## My process

### Built with

- HTML5 markup
- CSS3
- Mobile-first workflow
- [Tailwind](https://tailwindcss.com/) - JS library
- [Express](https://expressjs.com/) - Node library
- [PostgreSQL](https://www.postgresql.org/) - Database
- [AWS S3](https://aws.amazon.com/s3/) - Cloud Object Storage

### What I learned

This is my second fullstack app and I wanted to do something rather simple. The biggest issue I initially ran into was the box art for each game being too large to deploy if I hosted them locally, so I decided to learn S3 for a cloud storage solution and had psql point to S3 for each image.

### Continued development

I think it's a mostly finished project as far as functionality. The only thing I'd like to add is some improved functionality for the results page, such as pagination, and allow users to choose how many results they would like to see on the page.
