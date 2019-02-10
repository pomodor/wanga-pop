const fs = require('fs')

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const bayes = require('bayes')

const _ = require('lodash')


const trained = '../data/probabilities.json'

let classifier = bayes.fromJson(fs.readFileSync(trained))

rl.on('line', (line) => {
  console.log(classifier.categorize(line.toLowerCase()))
}).on('close', () => {
  console.log('Bye-bye!')
  rl.close()
})
