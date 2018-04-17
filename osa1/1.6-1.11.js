import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ hyvä, neutraali, huono }) => {
  if (hyvä === 0 && neutraali === 0 && huono === 0){
    return (
      <div>
        <h1>statistiikka</h1>
        ei yhtään palautetta annettu
      </div>
    )
  }
  return(
    <div>
      <h1>statistiikka</h1>
      <table>
      <tbody>
        <Statistic text="hyvä" value={hyvä}/>
        <Statistic text="neutraali" value={neutraali}/>
        <Statistic text="huono" value={huono}/>
        <Statistic text="keskiarvo" value={Number(((hyvä-huono)/(hyvä+neutraali+huono)).toFixed(1))}/>
        <Statistic text="positiivisia" value={Number((100*hyvä/(hyvä+neutraali+huono)).toFixed(1))+" %"}/>
      </tbody>
      </table>
    </div>
    )  
}

const Statistic = ({ value, text }) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>  
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyvä: 0,
      neutraali: 0,
      huono: 0,
    }
  }
  klikHyvä = () => {
    this.setState({
      hyvä: this.state.hyvä + 1,
    })
  }

  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1,
    })
  }

  klikHuono = () => {
    this.setState({
      huono: this.state.huono + 1,
    })
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>
        <div>
        <Button
          handleClick={this.klikHyvä}
          text="hyvä"
        />
        <Button
          handleClick={this.klikNeutraali}
          text="neutraali"
        />
        <Button
          handleClick={this.klikHuono}
          text="huono"
        />
        </div>
        
        <Statistics
          hyvä={this.state.hyvä}
          neutraali={this.state.neutraali}
          huono={this.state.huono}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

