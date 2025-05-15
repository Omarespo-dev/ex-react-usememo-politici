
import { useEffect, useState } from 'react'
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





  return (
    <>
      <header>
        <h1>CARD POLITICI</h1>
      </header>
      <main>
        <div className='container-flex'>
          {dataApi.map(politic => {
            return <section className='flex-card'>
              <img src={!politic.image ? "/img/Photo-Image-Icon-Graphics-10388619-1-1-580x386.jpg" : politic.image} />


              <div>
                <p>Name: {politic.name}</p>
                <p>Position: {politic.position}</p>
                <p>Biography: {politic.biography}</p>
              </div>


            </section>
          })}




        </div>
      </main>
    </>
  )
}

export default App









// Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.