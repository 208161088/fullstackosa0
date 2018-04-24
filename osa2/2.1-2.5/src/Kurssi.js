import React from 'react'

const Kurssi = props => {
    const rivit = () => props.kurssit.map((k, i) => <div key={i}>
    <Otsikko kurssi={k.nimi} />
    <Sisalto osat={k.osat} />
    <Yhteensa osat={k.osat} /></div>)
      return (
        <div>
          <Otsikko kurssi='Opetusohjelma' />
          {rivit()}
        </div>
      )
    }
    const Otsikko = (props) => {
      return (
        <div>
          <h1>{props.kurssi}</h1>
        </div>
      )
    }
    const Sisalto = (props) => {
      const rivit = () => props.osat.map((osa, i) => <div key={i}>
      <Osa osa={osa.nimi} tehtavia={osa.tehtavia}/></div>)
      return (
        <div>
          {rivit()}
        </div>
      )
      }
    const Yhteensa = props => {
      const teht = () => props.osat.map((osa) => osa.tehtavia)
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      return (
        <div>
        <p>yhteensä {teht().reduce(reducer)} tehtävää</p>
        </div>
      )
    }
      const Osa = (props) => {
        return (
            <div>
                <p>{props.osa} {props.tehtavia}</p>
            </div>
        )
        }
        
export default Kurssi