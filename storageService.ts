
import { Post, User } from '../types';

const API_URL = 'https://api.npoint.io/80060ca5968d4f532f62';

export interface DBStructure {
  version: string;
  lastUpdate: string;
  users: User[];
  posts: Post[];
}

export const storageService = {
  // Busca todo o estado do servidor
  fetchData: async (): Promise<DBStructure> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      // Fallback para estrutura básica caso a API falhe ou esteja vazia
      return { version: "1.0", lastUpdate: new Date().toISOString(), users: [], posts: [] };
    }
  },

  // Salva todo o estado no servidor
  saveData: async (data: DBStructure): Promise<boolean> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          lastUpdate: new Date().toISOString()
        })
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao salvar na API:', error);
      return false;
    }
  },

  // Sessão local apenas para manter o ID do usuário logado no navegador dele
  getCurrentSessionId: (): string | null => {
    return localStorage.getItem('oreidoscorts_session_id');
  },

  setSessionId: (id: string | null) => {
    if (id) {
      localStorage.setItem('oreidoscorts_session_id', id);
    } else {
      localStorage.removeItem('oreidoscorts_session_id');
    }
  }
};
