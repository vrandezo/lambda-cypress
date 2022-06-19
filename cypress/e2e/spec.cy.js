const domain = 'http://localhost:8080/wiki/'

// check if the main page is there

describe('Main Page', () => {
  it('loads', () => {
    cy.visit(domain)
  })
})

// check if the API sandbox is there

describe('API Sandbox', () => {
  it('loads', () => {
    cy.visit(domain + 'Special:ApiSandbox')
  })
  // could be used to test some of the Api, but I think we have a second approach
  // for doing that
})

// check if the page Z802/if is there and try to run it

describe('If page', () => {
  it('loads', () => {
    cy.visit(domain + 'Z802')
  })
  it('boolean input', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > :nth-child(2) > :nth-child(1) > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div > .ext-wikilambda-zboolean')
    .select('true')
  })
  it('type second argument', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > :nth-child(2) > :nth-child(2) > .ext-wikilambda-zobject-key > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('String')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')

    cy.get('span > .ext-wikilambda-zstring')
    .type('aaaaa{enter}')
  })
  it('type third argument', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > :nth-child(2) > :nth-child(3) > .ext-wikilambda-zobject-key > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('String')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')

    cy.get(':nth-child(3) > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div.ext-wikilambda-zstring > span > .ext-wikilambda-zstring')
    .type('bbbbb{enter}')
  })
  it('evalute', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > :nth-child(3)')
    .click()
  })
  it('expected result', () => {
    cy.contains('aaaaa')
  })
})

// TODO: Add a label in some language

// TODO: Go to Z811 and get the first element from a list of elements

// Negation

// Negation - Function definition

const negatename = 'negate' + (Math.floor(Math.random()*100000000+1))
let negatezid = ''

describe('Negation: Create definition', () => {
  it('loads', () => {
    cy.visit(domain + 'Special:CreateZObject')
  })
  it('create a function', () => {
    cy.get('#ext-wikilambda-editor > :nth-child(3)')
    .click()
  })
  it('give it a name', () => {
    cy.get('#ext-wikilambda-function-definition-name__input')
    .type(negatename)
  })
  it('choose input type', () => {
    cy.get('.ext-wikilambda-editor-input-list-item__body > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Boolean')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('choose output type', () => {
    cy.get('.ext-wikilambda-function-definition-output > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Boolean')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('publish', () => {
    cy.get('.cdx-button--action-progressive')
    .click()
  })
  it('creation succeeded', () => {
    cy.url().should('contains', domain + 'Z')
    cy.location().should((loc) => {
      const s = loc.toString()
      negatezid = s.substr(s.lastIndexOf('Z'))
    })
  })
})

// Negation - Testers

describe('Negation: Tester !T=F', () => {
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create a tester', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > :nth-child(2) > a')
    .click()
  })
  it('name tester', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(negatename)
    .type(' not true is false')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('.ext-wikilambda-zreference > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(negatename)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('choose function call', () => {
    cy.get(':nth-child(4) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(negatename)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('set argument', () => {
    cy.get('.ext-wikilambda-zboolean')
    .select('true')
  })
  it('set result tester', () => {
    cy.get(':nth-child(6) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Z844')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('set result', () => {
    cy.get(':nth-child(6) > ul > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div > .ext-wikilambda-zboolean')
    .select('false')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

describe('Negation: Tester !F=T', () => {
  it('go to function page', () => {
    cy.get('[type="Z20"] > :nth-child(1) > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create a tester', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > :nth-child(2) > a')
    .click()
  })
  it('name tester', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(negatename)
    .type(' not false is true')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('.ext-wikilambda-zreference > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(negatename)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('choose function call', () => {
    cy.get(':nth-child(4) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(negatename)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('set argument', () => {
    cy.get('.ext-wikilambda-zboolean')
    .select('false')
  })
  it('set result tester', () => {
    cy.get(':nth-child(6) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Z844')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('set result', () => {
    cy.get(':nth-child(6) > ul > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div > .ext-wikilambda-zboolean')
    .select('true')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// Negation - Connect testers

describe('Negation: Connect testers', () => {
  it('go to function page', () => {
    cy.get('[type="Z20"] > :nth-child(1) > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('click edit', () => {
    cy.get('#ca-edit > a > span')
    .click()
  })
  it('fallback editor', () => {
    cy.get('.ext-wikilambda-function-definition-footer__actions > .cdx-button--action-default')
    .click()
  })
  it('add tester', () => {
    cy.get(':nth-child(4) > .ext-wikilambda-zlist-no-bullets > li > .cdx-button')
    .click()
  })
  it('select tester 1', () => {
    cy.get('.ext-wikilambda-zlistItem > select')
    .select(negatename + ' not true is false')
  })
  it('add another tester', () => {
    cy.get(':nth-child(4) > .ext-wikilambda-zlist-no-bullets > :nth-child(2) > .cdx-button')
    .click()
  })
  it('select tester 2', () => {
    cy.get('.ext-wikilambda-zlist-no-bullets > :nth-child(2) > select')
    .select(negatename + ' not false is true')
  })
  it('save', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})


// Negation - Implementation composition

describe('Negation: Implementation composition', () => {
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create implementation', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > .ext-wikilambda-function-viewer-details-sidebar__link > #ext-wikilambda-function-viewer-details-sidebar__link--implementation')
    .click()
  })
  it('name implementation', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(negatename)
    .type(' composition')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(negatename)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('function if', () => {
    cy.get('.ext-wikilambda-function-call-block > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Z802')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('set argument reference for condition', () => {
    cy.get(':nth-child(1) > .ext-wikilambda-zobject-key > .ext-wikilambda-zkey-modeselector')
    .select('arg')
  })
  it('set reference', () => {
    cy.get('.ext-wikilambda-zargument-reference')
    .select('input')
  })
  it('type for consequence', () => {
    cy.get(':nth-child(2) > .ext-wikilambda-zobject-key > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Boolean')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('value for consequence', () => {
    cy.get('.ext-wikilambda-zboolean')
    .select('false')
  })
  it('type for alternative', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zobject-key > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Boolean')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('value for alternative', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div > .ext-wikilambda-zboolean')
    .select('true')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Negation - Evaluate negate composition

// CANNOT

// Negation - Implementation JavaScript

describe('Negation: Implementation JavaScript', () => {
  it('go to function page', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create implementation', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > .ext-wikilambda-function-viewer-details-sidebar__link > #ext-wikilambda-function-viewer-details-sidebar__link--implementation')
    .click()
  })
  it('name implementation', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(negatename)
    .type(' JavaScript')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(negatename)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('select Code', () => {
    cy.get(':nth-child(2) > select')
    .select('Code')
  })
  it('select JavaScript', () => {
    cy.get('.ext-wikilambda-zcode__language-selector')
    .select('javascript')
  })
  it('enter code', () => {
    cy.get('.ace_content')
    .type('function ' + negatezid + '( ' + negatezid + 'K1 ) {{}{enter}return !' + negatezid + 'K1;')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Negation - Evaluate negate javascript

// CANNOT

// Negation - Implementation Python

describe('Negation: Implementation Python', () => {
  it('go to function page', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create implementation', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > .ext-wikilambda-function-viewer-details-sidebar__link > #ext-wikilambda-function-viewer-details-sidebar__link--implementation')
    .click()
  })
  it('name implementation', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(negatename)
    .type(' Python')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(negatename)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('select Code', () => {
    cy.get(':nth-child(2) > select')
    .select('Code')
  })
  it('select Python', () => {
    cy.get('.ext-wikilambda-zcode__language-selector')
    .select('Python')
  })
  it('enter code', () => {
    cy.get('.ace_content')
    .type('def ' + negatezid + '(' + negatezid + 'K1):{enter}return not ' + negatezid + 'K1')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Negation - Evaluate negate python

// CANNOT

// Negation - Connect implementations

describe('Negation: Connect implementations', () => {
  it('go to function page', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('click edit', () => {
    cy.get('#ca-edit > a > span')
    .click()
  })
  it('fallback editor', () => {
    cy.get('.ext-wikilambda-function-definition-footer__actions > .cdx-button--action-default')
    .click()
  })
  it('add implementation', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zlist-no-bullets > li > .cdx-button')
    .click()
  })
  it('select implementation composition', () => {
    cy.get('.ext-wikilambda-ZImplementationListItem > select')
    .select(1)
  })
  it('add implementation js', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zlist-no-bullets > :nth-child(2) > .cdx-button')
    .click()
  })
  it('select implementation js', () => {
    cy.get('.ext-wikilambda-zlist-no-bullets > :nth-child(2) > select')
    .select(1)
  })
  it('add implementation python', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zlist-no-bullets > :nth-child(3) > .cdx-button')
    .click()
  })
  it('select implementation python', () => {
    cy.get('.ext-wikilambda-zlist-no-bullets > :nth-child(3) > select')
    .select(1)
  })
  it('save', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Negation - Check test results

// not implemented yet

// Negation - Evaluate negate

describe('Negation: Evaluate', () => {
  it('select argument', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > ul > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div > .ext-wikilambda-zboolean')
    .select('true')
  })
  it('run', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > .cdx-button')
    .click()
  })
  // TODO: The result is currently wrong. Once it works again, this test should be enabled
  // it('check result', () => {
  //   cy.get('.ext-wikilambda-zobject-key > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
  //   .should('contain', 'false')
  // })
})

// TODO: And

// TODO: Concatenate

// TODO: Create a string with some value and save it

// Create a type Positive Integer

const intname = 'Positive Integer ' + (Math.floor(Math.random()*100000000+1))
let intzid = ''

describe('Positive Integer: Create type', () => {
  it('loads', () => {
    cy.visit(domain + 'Special:CreateZObject')
  })
  it('create type', () => {
    cy.get('#ext-wikilambda-editor > :nth-child(4)')
    .click()
  })
  it('give it a name', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(1000)
    .type(intname)
    .type('{enter}')
  })
  it('add element to list', () => {
    cy.get('li > .cdx-button')
    .click()
  })
  it('choose type key', () => {
    cy.get('.ext-wikilambda-zlistItem > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Key')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('type of key', () => {
    cy.get('.ext-wikilambda-ztype > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('String')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('name key', () => {
    cy.get('.ext-wikilambda-multilingual > :nth-child(1) > :nth-child(2) > .ext-wikilambda-zstring')
    .wait(1000)
    .type('value')
    .type('{enter}')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
  it('creation succeeded', () => {
    cy.url().should('contains', domain + 'Z')
    cy.location().should((loc) => {
      const s = loc.toString()
      intzid = s.substr(s.lastIndexOf('Z'))
    })
  })
})

// Create instances of that type

describe('Positive Integer: Create number zero', () => {
  it('loads', () => {
    cy.visit(domain + 'Special:CreateZObject')
  })
  it('give it a name', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(1000)
    .type('zero ' + intname)
    .type('{enter}')
  })
  it('choose type key', () => {
    cy.get('.ext-wikilambda-zobject-key > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('enter value', () => {
    cy.get('.ext-wikilambda-zobject > div.ext-wikilambda-zstring > span > .ext-wikilambda-zstring')
    .wait(1000)
    .type('0')
    .type('{enter}')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

describe('Positive Integer: Create number one', () => {
  it('loads', () => {
    cy.visit(domain + 'Special:CreateZObject')
  })
  it('give it a name', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(1000)
    .type('one ' + intname)
    .type('{enter}')
  })
  it('choose type key', () => {
    cy.get('.ext-wikilambda-zobject-key > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('enter value', () => {
    cy.get('.ext-wikilambda-zobject > div.ext-wikilambda-zstring > span > .ext-wikilambda-zstring')
    .wait(1000)
    .type('1')
    .type('{enter}')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Positive Integer validator

// Function Positive Integer as String

// Positive integer to string - Function definition

const pitsname = 'positive integer to string ' + intname
let pitszid = ''

describe('Positive Integer to String: Create definition', () => {
  it('loads', () => {
    cy.visit(domain + 'Special:CreateZObject')
  })
  it('create a function', () => {
    cy.get('#ext-wikilambda-editor > :nth-child(3)')
    .click()
  })
  it('give it a name', () => {
    cy.get('#ext-wikilambda-function-definition-name__input')
    .type(pitsname)
  })
  it('choose input type', () => {
    cy.get('.ext-wikilambda-editor-input-list-item__body > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('choose output type', () => {
    cy.get('.ext-wikilambda-function-definition-output > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('String')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('publish', () => {
    cy.get('.cdx-button--action-progressive')
    .click()
  })
  it('creation succeeded', () => {
    cy.url().should('contains', domain + 'Z')
    cy.location().should((loc) => {
      const s = loc.toString()
      pitszid = s.substr(s.lastIndexOf('Z'))
    })
  })
})

// TODO: Positive Integer to String - Testers

// TODO: Tester for literal

// TODO: Tester for reference

// TODO: Positive Integer to String - Connect testers

// Positive Integer to String - Implementation composition

describe('Positive Integer to String: Implementation composition', () => {
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create implementation', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > .ext-wikilambda-function-viewer-details-sidebar__link > #ext-wikilambda-function-viewer-details-sidebar__link--implementation')
    .click()
  })
  it('name implementation', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(pitsname)
    .type(' composition')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(pitszid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('function key by value', () => {
    cy.get('.ext-wikilambda-function-call-block > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Z803')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('enter key id', () => {
    cy.get('.ext-wikilambda-zobject > div.ext-wikilambda-zstring > span > .ext-wikilambda-zstring')
    .wait(1000)
    .type(String(intzid) + 'K1')
    .type('{enter}')
  })
  it('type for argument', () => {
    cy.get('.ext-wikilambda-zobject-key > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('set argument reference', () => {
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-zobject-generic > .ext-wikilambda-zobject-key-list > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zkey-modeselector')
    .select('arg')
  })
  it('set reference', () => {
    cy.get('.ext-wikilambda-zargument-reference')
    .select('input')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Positive Integer to String - Evaluate composition

// CANNOT

// Positive Integer to String - Connect implementations

describe('Positive Integer to String: Connect implementations', () => {
  it('go to function page', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('click edit', () => {
    cy.get('#ca-edit > a > span')
    .click()
  })
  it('fallback editor', () => {
    cy.get('.ext-wikilambda-function-definition-footer__actions > .cdx-button--action-default')
    .click()
  })
  it('add implementation', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zlist-no-bullets > li > .cdx-button')
    .click()
  })
  it('select implementation', () => {
    cy.get('.ext-wikilambda-ZImplementationListItem > select')
    .select(1)
  })
  it('save', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Positive Integer to String - Check test results

// not implemented yet

// Positive Integer to String - Evaluate

describe('Positive Integer to String: Evaluate', () => {
  it('select argument', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-zobject-generic > .ext-wikilambda-zobject-key-list > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div.ext-wikilambda-zstring')
    .type('26893')
    .type('{enter}')
  })
  it('run', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > .cdx-button')
    .click()
  })
  // TODO: The result is currently wrong. Once it works again, this test should be enabled
  // it('check result', () => {
  // cy.contains('26893')
  // })
})

// Function postive integer equality

// Positive integer equality - Function definition

const pieqname = 'positive integer equality ' + intname
let pieqzid = ''

describe('Positive Integer Equality: Create definition', () => {
  it('loads', () => {
    cy.visit(domain + 'Special:CreateZObject')
  })
  it('create a function', () => {
    cy.get('#ext-wikilambda-editor > :nth-child(3)')
    .click()
  })
  it('give it a name', () => {
    cy.get('#ext-wikilambda-function-definition-name__input')
    .type(pieqname)
  })
  it('choose input type', () => {
    cy.get('.ext-wikilambda-editor-input-list-item__body > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('add a second argument', () => {
    cy.get('.ext-wikilambda-editor-input-list-item__button')
    .click()
  })
  it('choose second input type', () => {
    cy.get(':nth-child(2) > .ext-wikilambda-editor-input-list-item__body > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('name second argument', () => {
    cy.get(':nth-child(2) > .ext-wikilambda-editor-input-list-item__body > .ext-wikilambda-editor-input-list-item__input')
    .type('right')
  })
  it('choose output type', () => {
    cy.get('.ext-wikilambda-function-definition-output > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Boolean')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('publish', () => {
    cy.get('.cdx-button--action-progressive')
    .click()
  })
  it('creation succeeded', () => {
    cy.url().should('contains', domain + 'Z')
    cy.location().should((loc) => {
      const s = loc.toString()
      pieqzid = s.substr(s.lastIndexOf('Z'))
    })
  })
})

// TODO: Positive Integer Equality - Testers

// TODO: Tester for literal

// TODO: Tester for reference, all pairs

// TODO: Positive Integer Equality - Connect testers

// Positive Integer Equality - Implementation composition

describe('Positive Integer Equality: Implementation composition', () => {
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create implementation', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > .ext-wikilambda-function-viewer-details-sidebar__link > #ext-wikilambda-function-viewer-details-sidebar__link--implementation')
    .click()
  })
  it('name implementation', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(pieqname)
    .type(' composition')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(pieqzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('function string equality', () => {
    cy.get('.ext-wikilambda-function-call-block > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type('Z866')
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('set function call left', () => {
    cy.get(':nth-child(1) > .ext-wikilambda-zobject-key > .ext-wikilambda-zkey-modeselector')
    .select('f(x)')
  })
  it('function positive integer to string left', () => {
    cy.get('.ext-wikilambda-function-call-block > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(pitszid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('set argument reference left', () => {
    cy.get('.ext-wikilambda-zobject-key-list > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zkey-modeselector')
    .select('arg')
  })
  it('set reference left', () => {
    cy.get('.ext-wikilambda-zargument-reference')
    .select('input')
  })
  it('set function call right', () => {
    cy.get(':nth-child(2) > .ext-wikilambda-zobject-key > .ext-wikilambda-zkey-modeselector')
    .select('f(x)')
  })
  it('function positive integer to string right', () => {
    cy.get('.ext-wikilambda-function-call-block > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(pitszid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('set argument reference right', () => {
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-function-call-block > :nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-zobject-generic > .ext-wikilambda-zobject-key-list > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zkey-modeselector')
    .select('arg')
  })
  it('set reference right', () => {
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-function-call-block > :nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-zobject-generic > .ext-wikilambda-zobject-key-list > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div > .ext-wikilambda-zargument-reference')
    .select('inputright')
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Positive Integer Equality - Evaluate composition

// CANNOT

// Positive Integer Equality - Connect implementations

describe('Positive Integer Equality: Connect implementations', () => {
  it('go to function page', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('click edit', () => {
    cy.get('#ca-edit > a > span')
    .click()
  })
  it('fallback editor', () => {
    cy.get('.ext-wikilambda-function-definition-footer__actions > .cdx-button--action-default')
    .click()
  })
  it('add implementation', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zlist-no-bullets > li > .cdx-button')
    .click()
  })
  it('select implementation', () => {
    cy.get('.ext-wikilambda-ZImplementationListItem > select')
    .select(1)
  })
  it('save', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Positive Integer Equality - Check test results

// not implemented yet

// Positive Integer Equality - Evaluate

describe('Positive Integer Equality: Evaluate', () => {
  it('select argument', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-zobject-generic > .ext-wikilambda-zobject-key-list > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div.ext-wikilambda-zstring')
    .type('26783')
    .type('{enter}')
  })
  it('select argument right', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > :nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-zobject-generic > .ext-wikilambda-zobject-key-list > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div.ext-wikilambda-zstring > span > .ext-wikilambda-zstring')
    .type('26784')
    .type('{enter}')
  })
  it('run', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > .cdx-button')
    .click()
  })
  // TODO: The result is currently wrong. Once it works again, this test should be enabled
  // it('check result', () => {
  //   cy.get('.ext-wikilambda-zobject-key > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
  //   .should('contain', 'false')
  // })
})

// Function Successor

// Successor - Function definition

const successorname = 'successor ' + intname
let successorzid = ''

describe('Successor: Create definition', () => {
  it('loads', () => {
    cy.visit(domain + 'Special:CreateZObject')
  })
  it('create a function', () => {
    cy.get('#ext-wikilambda-editor > :nth-child(3)')
    .click()
  })
  it('give it a name', () => {
    cy.get('#ext-wikilambda-function-definition-name__input')
    .type(successorname)
  })
  it('choose input type', () => {
    cy.get('.ext-wikilambda-editor-input-list-item__body > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('choose output type', () => {
    cy.get('.ext-wikilambda-function-definition-output > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('publish', () => {
    cy.get('.cdx-button--action-progressive')
    .click()
  })
  it('creation succeeded', () => {
    cy.url().should('contains', domain + 'Z')
    cy.location().should((loc) => {
      const s = loc.toString()
      successorzid = s.substr(s.lastIndexOf('Z'))
    })
  })
})

// TODO: Successor - Testers

// TODO: Successor - Connect testers

// Successor - Implementation JavaScript

describe('Successor: Implementation JavaScript', () => {
  // it('go to function page', () => {
  //   cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
  //   .click()
  // })
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create implementation', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > .ext-wikilambda-function-viewer-details-sidebar__link > #ext-wikilambda-function-viewer-details-sidebar__link--implementation')
    .click()
  })
  it('name implementation', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(successorname)
    .type(' JavaScript')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(successorzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('select Code', () => {
    cy.get(':nth-child(2) > select')
    .select('Code')
  })
  it('select JavaScript', () => {
    cy.get('.ext-wikilambda-zcode__language-selector')
    .select('javascript')
  })
  it('enter code', () => {
    cy.get('.ace_content')
    .type(
      'function ' + successorzid + '( ' + successorzid + 'K1 ) {{}{enter}' +
      'return {{}{enter}' +
      'Z1K1: "' + intzid + '",{enter}' +
      intzid + 'K1: (BigInt(' + successorzid + 'K1.' + intzid + 'K1) + ' +
      'BigInt(1)).toString()'
    )
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Successor - Evaluate javascript

// CANNOT

// Successor - Implementation Python

describe('Successor: Implementation Python', () => {
  it('go to function page', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create implementation', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > .ext-wikilambda-function-viewer-details-sidebar__link > #ext-wikilambda-function-viewer-details-sidebar__link--implementation')
    .click()
  })
  it('name implementation', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(successorname)
    .type(' Python')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(successorzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('select Code', () => {
    cy.get(':nth-child(2) > select')
    .select('Code')
  })
  it('select Python', () => {
    cy.get('.ext-wikilambda-zcode__language-selector')
    .select('Python')
  })
  it('enter code', () => {
    cy.get('.ace_content')
    .type(
      'def ' + successorzid + '(' + successorzid + 'K1):{enter}' +
      'return not ZObject(' + intzid + 'K1=' +
      'str(int(' + successorzid + 'K1["' + intzid + 'K1"]) + 1))'
    )
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Successor - Evaluate python

// CANNOT

// Successor - Connect implementations

describe('Successor: Connect implementations', () => {
  it('go to function page', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('click edit', () => {
    cy.get('#ca-edit > a > span')
    .click()
  })
  it('fallback editor', () => {
    cy.get('.ext-wikilambda-function-definition-footer__actions > .cdx-button--action-default')
    .click()
  })
  it('add implementation js', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zlist-no-bullets > li > .cdx-button')
    .click()
  })
  it('select implementation js', () => {
    cy.get('.ext-wikilambda-ZImplementationListItem > select')
    .select(1)
  })
  it('add implementation python', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zlist-no-bullets > :nth-child(2) > .cdx-button')
    .click()
  })
  it('select implementation python', () => {
    cy.get('.ext-wikilambda-zlist-no-bullets > :nth-child(2) > select')
    .select(1)
  })
  it('save', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Successor - Check test results

// not implemented yet

// Successor - Evaluate

describe('Successor: Evaluate', () => {
  it('select argument', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-zobject-generic > .ext-wikilambda-zobject-key-list > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div.ext-wikilambda-zstring')
    .type('26')
    .type('{enter}')
  })
  it('run', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > .cdx-button')
    .click()
  })
  // TODO: The result is currently wrong. Once it works again, this test should be enabled
  // it('check result', () => {
  //   cy.get('.ext-wikilambda-zobject-key > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
  //   .should('contain', '27')
  // })
})

// Function Floored predecessor

// Floored predecessor - Function definition

const fpname = 'floored predecessor ' + intname
let fpzid = ''

describe('Floored predecessor: Create definition', () => {
  it('loads', () => {
    cy.visit(domain + 'Special:CreateZObject')
  })
  it('create a function', () => {
    cy.get('#ext-wikilambda-editor > :nth-child(3)')
    .click()
  })
  it('give it a name', () => {
    cy.get('#ext-wikilambda-function-definition-name__input')
    .type(fpname)
  })
  it('choose input type', () => {
    cy.get('.ext-wikilambda-editor-input-list-item__body > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('choose output type', () => {
    cy.get('.ext-wikilambda-function-definition-output > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(intzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('publish', () => {
    cy.get('.cdx-button--action-progressive')
    .click()
  })
  it('creation succeeded', () => {
    cy.url().should('contains', domain + 'Z')
    cy.location().should((loc) => {
      const s = loc.toString()
      fpzid = s.substr(s.lastIndexOf('Z'))
    })
  })
})

// TODO: Floored predecessor - Testers

// TODO: Floored predecessor - Connect testers

// Floored predecessor - Implementation JavaScript

describe('Floored predecessor: Implementation JavaScript', () => {
  // it('go to function page', () => {
  //   cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
  //   .click()
  // })
  it('tab details', () => {
    cy.get('#cdx-function-details-1-label > a')
    .click()
  })
  it('create implementation', () => {
    cy.get('#cdx-function-details-1 > .ext-wikilambda-function-details > :nth-child(2) > .ext-wikilambda-function-details__sidebar > .ext-wikilambda-function-viewer-details-sidebar > .ext-wikilambda-function-viewer-details-sidebar__links > .ext-wikilambda-function-viewer-details-sidebar__link > #ext-wikilambda-function-viewer-details-sidebar__link--implementation')
    .click()
  })
  it('name implementation', () => {
    cy.get('span > .ext-wikilambda-zstring')
    .wait(2000)
    .type(fpname)
    .type(' JavaScript')
    .type('{enter}')
  })
  it('select function', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-select-zobject > .cdx-lookup > .cdx-text-input > .cdx-text-input__input')
    .type(fpzid)
    .wait(1000)
    .type('{downArrow}')
    .type('{enter}')
  })
  it('select Code', () => {
    cy.get(':nth-child(2) > select')
    .select('Code')
  })
  it('select JavaScript', () => {
    cy.get('.ext-wikilambda-zcode__language-selector')
    .select('javascript')
  })
  it('enter code', () => {
    cy.get('.ace_content')
    .type(
      'function ' + fpzid + '( ' + fpzid + 'K1 ) {{}{enter}' +
      'const v = BigInt(' + fpzid + 'K1.' + intzid + 'K1){enter}' +
      'if (v == BigInt(0)) {{}{enter}' +
      'return {{}{enter}' +
      'Z1K1: "' + intzid + '",{enter}' +
      intzid + 'K1: "0"{downArrow}{downArrow}' +
      ' else {{}{enter}' +
      'return {{}{enter}' +
      'Z1K1: "' + intzid + '",{enter}' +
      intzid + 'K1: (v - BigInt(1)).toString()'
    )
  })
  it('publish', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Floored predecessor - Evaluate javascript

// CANNOT

// Floored predecessor - Connect implementations

describe('Floored predecessor: Connect implementations', () => {
  it('go to function page', () => {
    cy.get('[type="Z14"] > :nth-child(1) > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
    .click()
  })
  it('click edit', () => {
    cy.get('#ca-edit > a > span')
    .click()
  })
  it('fallback editor', () => {
    cy.get('.ext-wikilambda-function-definition-footer__actions > .cdx-button--action-default')
    .click()
  })
  it('add implementation js', () => {
    cy.get(':nth-child(3) > .ext-wikilambda-zlist-no-bullets > li > .cdx-button')
    .click()
  })
  it('select implementation js', () => {
    cy.get('.ext-wikilambda-ZImplementationListItem > select')
    .select(1)
  })
  it('save', () => {
    cy.get('.ext-wikilambda-publishControl > .cdx-button')
    .click()
  })
})

// TODO: Floored predecessor - Check test results

// not implemented yet

// TODO: Floored predecessor - Evaluate

describe('Floored predecessor: Evaluate', () => {
  it('select argument', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(4) > .ext-wikilambda-zobject-generic > .ext-wikilambda-zobject-key-list > li > .ext-wikilambda-zobject-key > .ext-wikilambda-zobject > div.ext-wikilambda-zstring')
    .type('26487')
    .type('{enter}')
  })
  it('run', () => {
    cy.get('#cdx-function-about-0 > .ext-wikilambda-function-about > .ext-wikilambda-function-about__details > :nth-child(1) > :nth-child(3) > .ext-wikilambda-function-call-block > .cdx-button')
    .click()
  })
  // TODO: The result is currently wrong. Once it works again, this test should be enabled
  // it('check result', () => {
  //   cy.get('.ext-wikilambda-zobject-key > .ext-wikilambda-zreference > span > .ext-wikilambda-referenced-type')
  //   .should('contain', '26486')
  // })
})

// TODO: Create an error type Underflow

// TODO: Function predecessor

// TODO: Function add
