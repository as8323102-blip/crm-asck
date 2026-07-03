const API_URL = 'http://localhost/crm-api/index.php';

export const XAMPPService = {
  async getData() {
    const response = await fetch(`${API_URL}?action=get_data`);
    if (!response.ok) throw new Error('Error al cargar datos de XAMPP');
    return response.json();
  },

  async createClient(client) {
    const response = await fetch(`${API_URL}?action=create_client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client)
    });
    if (!response.ok) throw new Error('Error al crear cliente');
    return response.json();
  },

  async updateClient(clientId, updates) {
    const response = await fetch(`${API_URL}?action=update_client&id=${clientId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Error al actualizar cliente');
    return response.json();
  },

  async deleteClient(clientId) {
    const response = await fetch(`${API_URL}?action=delete_client&id=${clientId}`, {
      method: 'POST' // O DELETE, nuestro index.php soporta ambos
    });
    if (!response.ok) throw new Error('Error al eliminar cliente');
    return response.json();
  },

  async addNote(note) {
    const response = await fetch(`${API_URL}?action=add_note`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    });
    if (!response.ok) throw new Error('Error al agregar nota');
    return response.json();
  },

  async addTask(task) {
    const response = await fetch(`${API_URL}?action=add_task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Error al agregar tarea');
    return response.json();
  },

  async toggleTask(taskId, completed) {
    const response = await fetch(`${API_URL}?action=toggle_task&id=${taskId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completada: completed })
    });
    if (!response.ok) throw new Error('Error al alternar estado de tarea');
    return response.json();
  }
};
