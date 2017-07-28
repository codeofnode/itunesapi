# open flow
> open flow

# How to run
```
$ npm install
$ npm start //in case you want to run app
```

# Task 2
* What's Wrong :
> sending the invitation response rightaway.. we should wait untill the shop is updated. what if there is some error while saving the shop. Database may go inconsistant.
* Potential problem:
> shop.users seems can not have objectId form of userid.. and it only have the stringified ids.
so shop.users.indexOf(createdUser._id) is always -1
> so we need to use the inbuild virtual property id that is same as of _id, but in stringified form.. else we can cast to string with String(_id)
* refractor code : see file task2.js
* with eslint rules and new features of es6 : use of async, await and promises, some arrow functions..and other ES6 features.
> we can further use babel to transform so that is is very much compatible with previous versions of node


# Few more things i would like to mention
* I use some personal building scripts that is out of the scope of this project. So those are absent in the project.
* The project and actual code, is really NO dependency code... ie in PURE nodejs. So the code of single file itself does all means all the job.
* I used json2server (my own developed, again that is also PURE nodejs, pure nodejs, lightweight server framework (better than express or hapi imo)  [https://github.com/codeofnode/json2server](https://github.com/codeofnode/json2server))
   instead of express.
* json2server can also act as a builder tool, to combine all the modules of the server into one single fine, including the core engines of itself as well.. so json2server + custom set of modules = 1 single file to be shipped
* Why should i use vue.js when json2server can also act as builder tool for client side script as well. Remember that client routes are not much different than server routes.. So json2server core engine, that is flexible and compatible to both back end and also with front end. So no vue.js again json2server on front end.
* material design light css is used for cards like google cards
* code heierarchy
* * server.js -> the only server file
* * task2.js -> the file for task2 as given to me
* * static -> the client side directory
* * * cs-1.js -> the only client js
* * * cs-1.css -> the client css including material css
* * * index.html -> the html startup code



# Licence
> MIT
