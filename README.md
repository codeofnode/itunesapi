# open flow
> open flow

# How to run
```
$ npm install
$ npm test // in case you want to run test script
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


# Licence
> MIT
