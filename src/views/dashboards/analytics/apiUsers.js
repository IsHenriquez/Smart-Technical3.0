import axios from '@axios'

export async function obtenerDatosUser() {
  try {
    const response = await axios.get('https://smarttechnicalcl.000webhostapp.com/api/user', {
      headers: {
        'Authorization': `Bearer ${"26|kZJgrhNAvyXIoqc90hvd9vPFDGnbXGwYGonjuntg"}`,
      },
        
    })

    return response.data

  } catch (error) {
    console.error(error)
    throw error
  }
}
