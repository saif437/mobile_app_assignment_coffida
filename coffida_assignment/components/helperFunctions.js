export function emailValidation (emailParam) {
  // add validation here
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
