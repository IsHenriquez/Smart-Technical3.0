import axios from '@axios'

export async function obtenerDatos() {
  try {
    const response = await axios.get('https://api.gael.cloud/general/public/clima/SCQN') // Reemplaza con la URL de tu API
    
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
