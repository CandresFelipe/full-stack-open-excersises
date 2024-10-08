const mongoose = require('mongoose')
const crypto = require('crypto')

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit()
}

const password = process.argv[2]
const name =process.argv[3]
const number = process.argv[4]
const appName = 'Phonebook'

const url = `mongodb+srv://carrerafandres2496:${password}@cluster0.wehxz.mongodb.net/${appName}?retryWrites=true&w=majority&appName=cluster0`

mongoose.set('strictQuery', false)

const phonebookSchema = mongoose.Schema({
    id: String,
    name: String,
    number: String
})

const Person = mongoose.model('Person', phonebookSchema)

async function stablishDBConnection() {
    if(mongoose.connection.readyState === 0) {
        console.log('connecting to database...')
        await mongoose.connect(url)
    }
}

function addPerson(data) {
    const {name, number} = data
    const id = crypto.randomUUID()

        const person = new Person({
            id,
            name,
            number
        })
    
        person.save().then((res) => {
            console.log(`Added ${res.name} number: ${res.number} to phonebook.`)
            mongoose.connection.close()
        })
}

function showAllPersons() {
    Phonebook.find({}).then((res) => {
            res.forEach(person => {
                console.log(person)
            });
            mongoose.connection.close()
    })
}

function main() {
    stablishDBConnection().then(() => {
        if(!name || !number) {
            showAllPersons()
        }else {
            addPerson({name, number})
        }
    })
}

main()
