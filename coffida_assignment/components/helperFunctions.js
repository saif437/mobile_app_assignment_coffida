/* Functions for which can be reused elsewhere in this project */

/* functions for validating emails and passwords - reference in create account screen */
export function emailValidation (emailParam) {
  // regex express for validating emails
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (emailRegex.test(emailParam) === true) {
    console.log('Email is valid')
    return true
  } else {
    console.log('Email is not valid')
    return false
  }
}

export function passwordValidation (passwordParam) {
// password validation greater than 5 characters (zero index)
  if (passwordParam.length >= 5) {
    console.log('Password is valid')
    return true
  } else {
    console.log('Password is not greater than 5 characters')
    return false
  }
}

export function profanityFilter (review) {
  const Filter = require('bad-words')
  const filter = new Filter()
  filter.addWords(...profanityList())
  return filter.clean(review)
}

function profanityList () {
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
  return coffidaProfanityWords
}
