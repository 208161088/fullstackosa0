import React from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'
import './index.css'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      notification: null
    }
  }

  componentDidMount() {
      personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addName = (event) => {
    event.preventDefault()
    const names = this.state.persons.map(person => person.name)
    if(names.indexOf(this.state.newName)===-1){
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      personService
      .create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: '',
          notification: 'lisättiin '+personObject.name
        })
        setTimeout(() => {
          this.setState({notification: null})
        }, 5000)
      })

    }else{
      this.setState({
        newName: '',
        newNumber: ''
      })
    }

  }
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  poista = (id, name) => {
    if(window.confirm('poistetaanko '+name)){
      personService.remove(id)
      const ids=this.state.persons.map(person => person.id)
      const index=ids.indexOf(id)
      const newPersons=this.state.persons
      newPersons.splice(index,1)
      this.setState({
        persons: newPersons,
      })
    }
  }

  render() {
    console.log('render')
    return (
      <div>
        <Notification message={this.state.notification}/>
        <h2>Puhelinluettelo</h2>
        <Lomake
        submit={this.addName}
        nameValue={this.state.newName}
        numberValue={this.state.newNumber}
        nameEventHandler={this.handleNameChange}
        numberEventHandler={this.handleNumberChange}
        />
        <NumberList
          persons={this.state.persons}
          deleter={this.poista}
        />
      </div>
    )
  }
}



const NumberList = (props) => {
  return(
  <div>
  <h2>Numerot</h2>
  <table>
  <tbody>
    {props.persons.map(person =>
    <tr key={person.name}>
      <Information text={person.name}/>
      <Information text={person.number}/>
       <td><button onClick= {()=>props.deleter(person.id, person.name)}>poista</button></td>
    </tr>)}
  </tbody>
  </table>
  </div>
  )
}


const Information = ({text}) => (
  <td>{text}</td>
)

const Lomake = (props) => (
  <form onSubmit={props.submit}>
          <div>
            nimi:
            <input
            value={props.nameValue} 
            onChange={props.nameEventHandler}/>
          </div>
          <div>
            numero:
            <input 
            value={props.numberValue} 
            onChange={props.numberEventHandler}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)