/* Functions for which can be reused elsewhere in this project */

/*
coffidaProfanityWords is a list of words which are not allowed in coffida reviews
*/
const coffidaProfanityWords = [
  'tea',
  'cakes',
  'cake',
  'pastries',
  'sandwiches',
  'soft drinks',
  'water',
  'smoothies',
  'fruit',
  'salads',
  'food',
  'coke',
  'pepsi',
  'fanta',
  '7up',
  'energy drink',
  'red bull',
  'lucozade',
  'lemonade',
  'brownies',
  'muffins',
  'toastie',
  'breakfast',
  'porridge',
  'sweets',
  'chocolate',
  'crisps'
]

/*
profanityFilter function import a package called bad words.
which has a default list of associate bad words.
coffidaProfanityWords is added to the filter list.
A review parameter is added so that the filter knows what piece of text it is cleaning.
Bads words are replace with * by default after review is cleaned.
*/
export function profanityFilter (review) {
  const Filter = require('bad-words')
  const filter = new Filter()
  filter.addWords(...coffidaProfanityWords)
  return filter.clean(review)
}

/* functions for validating emails and passwords - reference in create account screen.
  Uses regex expressions to validate an email.
*/
export function emailValidation (emailParam) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (emailRegex.test(emailParam) === true) {
    console.log('Email is valid')
    return true
  } else {
    console.log('Email is not valid')
    return false
  }
}

/*
function for validating passwords greater than 5 characters (zero index)
*/
export function passwordValidation (passwordParam) {
  if (passwordParam.length >= 5) {
    console.log('Password is valid')
    return true
  } else {
    console.log('Password is not greater than 5 characters')
    return false
  }
}
