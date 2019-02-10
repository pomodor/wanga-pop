const fs = require('fs')
const Papa = require('papaparse')
const Bayes = require('bayes')
const _ = require('lodash')

console.log('Train...')

classifier = Bayes()
let f = fs.readFileSync('../data/liberpop.csv', 'utf8')

var train = (resolve, reject) => {
  Papa.parse(f, {
    delimiter: ',',
    complete: (result) => {
      _.each(result.data, (i) => {
        if (i[2]!=null) {
          classifier.learn(i[2].toLowerCase(), i[4])
        }
      })    
    }
  })
  resolve(1)
}

(new Promise(train)).then(() => {
  console.log('Done')
  fs.writeFile('../data/probabilities.json', classifier.toJson(), () => {
    console.log('Results have been written to probabilities.json')
  })
})
