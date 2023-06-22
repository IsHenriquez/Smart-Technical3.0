import axios from 'axios'

export async function obtenerDatos() {
  try {
    const response = await axios.get('https://timezone.abstractapi.com/v1/current_time/?api_key=e01fa1e2b8864b96a80e4beae664534e&location=Santiago, Chile') // Reemplaza con la URL de tu API
    
    console.log(response.data.datetime)
    var x= response.data.datetime
    return x
  } catch (error) {
    console.error(error)
    throw error 
  }
}
