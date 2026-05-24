import axios from './axios'

export const getLeads = async () => {
  const response = await axios.get('/leads')
  return response.data
}

export const createLead = async (leadData) => {
  const response = await axios.post('/leads', leadData)
  return response.data
}

export const updateLead = async (id, leadData) => {
  const response = await axios.put(`/leads/${id}`, leadData)
  return response.data
}

export const deleteLead = async (id) => {
  const response = await axios.delete(`/leads/${id}`)
  return response.data
}
