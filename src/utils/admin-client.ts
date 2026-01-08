export async function deleteProperty(id: string): Promise<any> {
  return apiFetch<any>(`http://localhost:3000/property/${id}`, {
    method: 'DELETE',
  });
}

export async function getPropertyById(id: string): Promise<any> {
  return apiFetch<any>(`http://localhost:3000/property/${id}`);
}

export async function updateProperty(id: string, propertyData: any): Promise<any> {
  return apiFetch<any>(`http://localhost:3000/property/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(propertyData),
  });
}



export async function createProperty(propertyData: any): Promise<any> {
  return apiFetch<any>('http://localhost:3000/property', {
    method: 'POST',
    body: JSON.stringify(propertyData),
  });
}

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
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error: any = new Error(errorData.message || 'API-Anfrage fehlgeschlagen');
    error.response = { data: errorData };
    throw error;
  }
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

export async function getProperties(): Promise<any[]> {
  return apiFetch<any[]>('http://localhost:3000/property');
}



