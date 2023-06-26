import axios from '@axios'

export async function obtenerDatos() {
  try {
    const url1 = 'https://api.weatherapi.com/v1/forecast.json?key=c8171ef085fc4fbd82c171455232206&q=Santiago&days=1&aqi=no&alerts=no'
    const url2 = 'https://api.gael.cloud/general/public/clima/SCQN'

    const request1 = axios.get(url1)
    const request2 = axios.get(url2)

    const [response1, response2] = await Promise.all([request1, request2])

    const datosApi1 = response1.data
    const datosApi2 = response2.data

    const { location, current, forecast } = datosApi1
    const { Estado } = datosApi2

    return {
      name: location.name,
      temp_c: current.temp_c,
      maxtemp_c: forecast.forecastday[0].day.maxtemp_c,
      mintemp_c: forecast.forecastday[0].day.mintemp_c,
      estado: Estado
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
