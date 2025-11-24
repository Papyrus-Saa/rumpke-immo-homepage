
export function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
}

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = {
    ...(options.headers || {}),
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) throw new Error('API request failed');
  return res.json();
}


export async function getAgents(): Promise<any[]> {
  return apiFetch<any[]>('http://localhost:3000/agent?active=false');
}


export async function createAgent(agentData: any): Promise<any> {
  return apiFetch<any>('http://localhost:3000/agent', {
    method: 'POST',
    body: JSON.stringify(agentData),
  });
}


export async function deleteAgent(id: string): Promise<any> {
  return apiFetch<any>(`http://localhost:3000/agent/${id}`, {
    method: 'DELETE',
  });
}

export async function editAgent(agentData: any): Promise<any> {
  const { id, created_at, updated_at, ...allowedFields } = agentData;
  return apiFetch<any>(`http://localhost:3000/agent/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(allowedFields),
  });
}


