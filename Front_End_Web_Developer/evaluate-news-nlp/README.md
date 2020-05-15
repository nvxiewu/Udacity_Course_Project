# NLP Project

## Table of Contents

* [Instructions](#instructions)
* [Contribution](#Contribution)
* [Getting_started](#Getting_started)
* [Content_list](#Content_list)

## Instructions

On top of that, I want to introduce you to the topic of Natural Language Processing. NLPs leverage machine learning and deep learning create a program that can interpret natural human speech. Systems like Alexa, Google Assistant, and many voice interaction programs are well known to us, but understanding human speech is an incredibly difficult task and requires a lot of resources to achieve. Full disclosure, this is the Wikipedia definition, but I found it to be a clear one:

> Natural language processing (NLP) is a subfield of computer science, information engineering, and artificial intelligence
concerned with the interactions between computers and human (natural) languages, in particular how to program computers to
process and analyze large amounts of natural language data.

You could spend years and get a masters degree focusing on the details of creating NLP systems and algorithms. Typically, NLP programs require far more resources than individuals have access to, but a fairly new API called Aylien has put a public facing API in front of their NLP system. We will use it in this project to determine various attributes of an article or blog post.

## Contribution  

The author of the project is Shao Yi. If you have any questions, you can contact it directly:  
@nvxiewu

## Getting_started

`cd` into evaluate-news-nlp folder and run:
- `npm install`
- `npm run build-prod`
- `npm run start`

## Content_list

The project consists of the following files:  
- src
  - client
    - js
      - formHandler.js
      - nameChecker.js
    - styles
      - base.scss
      - footer.scss
      - form.scss
      - header.scss
      - resets.scss
    - views
      - index.html
    - index.js
	- server
    - index.js
    - mockAPI.js
- tests
	- nameChecker.test.js
- .babelrc
- package-lock.json
- package.json
- README.md
- webpack.dev.js
- webpack.prod.js

