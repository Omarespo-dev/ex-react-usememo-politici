
import { useEffect, useState, useMemo, memo } from 'react'
import './App.css'

function App() {

  // Salva la risposta in uno stato React (useState).
  const [dataApi, setDataApi] = useState([])



  // 📌 Milestone 1: Recuperare e visualizzare i dati
  // Effettua una chiamata API a
  // http://localhost:5000/politicians
  // Questa funzione ritorna una promise
  async function chiamataApi() {

    try {
      const responseData = await fetch(`http://localhost:5000/politicians`)

      //Gestiamo error 404 per endpoint scritto male 
      if (!responseData.ok) {
        throw new Error(`HTTP error! status: ${responseData.status}`);
      }

      const convertJson = await responseData.json()

      setDataApi(convertJson);


    } catch (error) {
      console.error('ERRORE RILEVATO', error);
    }


  }

  // non faccio fare chiamate illimitate
  useEffect(() => {
    chiamataApi()
  }, [])


  // Dati ricavati dall chiamata
  console.log(dataApi)


  //Use State per input
    const [searchInput, SetSearchInput] = useState("")

    //filtriamo per nome e biografia mi cambia solo quelle delle dipendeze cioe non rienderizza tutto senza useMemo
    const filtredArr = useMemo(() => {
      return dataApi.filter(p => {
        return (p.name + p.biography).toLowerCase().includes(searchInput.toLowerCase())
      })
    }, [dataApi, searchInput])



  // 📌 Milestone 3: Ottimizzare il rendering delle card con React.memo per la renderizzazione delle card senza infatti reinderizza tutti i componenti
  const PoliticiansCard = memo(({ politician }) => {
    // console.log(`render: ${politician.name}`);
  
    return (
      <section className='flex-card'>
        <img src={!politician.image ? "/img/No-Image-Placeholder.svg.png" : politician.image}  onError={e => e.currentTarget.src = "/img/No-Image-Placeholder.svg.png"}/>


        <div>
          <p>Name: {politician.name}</p>
          <p>Position: {politician.position}</p>
          <p>Biography: {politician.biography}</p>
        </div>


      </section>
    )
  })


  return (
    <>
      <header>
        <h1>CARD POLITICI</h1>
        <input
          type="text"
          placeholder='Cerca per Nome o Biografia'
          //value fa sì che l’input segua sempre quello che c’è scritto nello stato di React.
          value={searchInput}

          //onChange serve a dire a React di aggiornare lo stato ogni volta che tu scrivi qualcosa.
          onChange={e => SetSearchInput(e.target.value)}
        />
      </header>
      <main>
        <div className='container-flex'>
          {filtredArr.map(politic => (
            <PoliticiansCard key={politic.id} politician={politic} />
          ))}


        </div>
      </main>
    </>
  )
}

export default App

