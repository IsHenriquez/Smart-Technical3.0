import axios from 'axios'

export async function obtenerDatos() {
  try {
    const response = await axios.get('https://smarttechnicalcl.000webhostapp.com/api/vehicle') // Reemplaza con la URL de tu API
    
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
