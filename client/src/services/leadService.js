const API_URL = '/api/leads'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const getLeads = async () => {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch leads')
  }

  return response.json()
}

export const createLead = async (leadData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(leadData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create lead')
  }

  return response.json()
}

export const updateLead = async (id, leadData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(leadData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to update lead')
  }

  return response.json()
}

export const deleteLead = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete lead')
  }

  return response.json()
}
