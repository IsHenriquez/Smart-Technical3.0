import axios from 'axios';

export async function obtenerTicket() {
  try {
    const response = await axios.get('https://smarttechnicalcl.000webhostapp.com/api/ticket');
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
