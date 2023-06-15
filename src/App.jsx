import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import ImageCripto from './assets/img/imagen-criptos.png'
import Spiner from './components/Spiner'

const Contenedor = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCriptp = async () =>{
        setCargando(true);
        setResultado({})
        const {moneda, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const response = await fetch(url);
        const result = await response.json();

        setResultado(result.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      }
      cotizarCriptp();
    }
  }, [monedas])

  return (
    <Contenedor>
      <Image
        src={ImageCripto}
        alt="imagenes criptomonedas"
      />

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          setMonedas={setMonedas}
        />
        {cargando && <Spiner />}
        {resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>
    </Contenedor>
  )
}

export default App
