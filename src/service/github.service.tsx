import axios from 'axios';

class GithubService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL + '/github';
  }

  async getUserRepos(username: string, perPage: number): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/user/${username}/repos/${perPage}`);
    return response.data;
  }

  async getUserCommitsPerMonth(username: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/user/${username}/commits-per-month`);
    return response.data;
  }

  async getTopLanguages(username: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/user/${username}/top-languages`);
    return response.data;
  }
}

export default GithubService;