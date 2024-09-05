import axios from 'axios'

export async function search(cep: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    return response.data as unknown
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    throw error
  }
}
