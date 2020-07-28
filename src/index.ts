import axios from 'axios';
import {
  Project,
  Form,
  Dispatch,
  PopulatedDispatch,
  Agent,
  Entry,
  PopulatedEntry,
  RequestOptions,
  Response,
} from './types';

class DataBeaverAPI {
  #apiKey: string;
  #baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.#apiKey = apiKey;
    this.#baseUrl = baseUrl;
  }

  async getById<T>(prefix: string, id: string): Promise<T | null> {
    try {
      const response = await this.sendAPIRequest(
        `${prefix}/${id}`,
        RequestMethod.GET,
      );
      return response.success ? (response.data as T) : null;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async getOneBy<T>(
    prefix: string,
    key: string,
    value: string,
  ): Promise<T | null> {
    try {
      const params = new URLSearchParams();
      params.set(key, value);
      params.set('perPage', '1');

      const response = await this.sendAPIRequest(
        prefix,
        RequestMethod.GET,
        params,
      );
      return response.success && response.data.length > 0
        ? (response.data[0] as T)
        : null;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async getBy<T>(
    prefix: string,
    options?: RequestOptions,
  ): Promise<Response<T>> {
    const params = options ? this.getUrlParams(options) : undefined;

    const response = await this.sendAPIRequest(
      prefix,
      RequestMethod.GET,
      params,
    );
    if (response.success) {
      return {
        total: response._metadata.total,
        data: response.data as T[],
        pageCount: response._metadata.pageCount,
        links: {
          current: response._metadata.pageLinks.current || undefined,
          previous: response._metadata.pageLinks.previous || undefined,
          next: response._metadata.pageLinks.next || undefined,
        },
      };
    }

    return {
      total: 0,
      data: [],
      pageCount: 1,
      links: undefined,
    };
  }

  private async sendAPIRequest(
    path: string,
    method: RequestMethod,
    params?: URLSearchParams,
    data?: Record<string, any>,
  ): Promise<Record<string, any>> {
    const url = `${this.#baseUrl}/v1/${path}`;
    const response = await axios({
      url,
      params,
      method,
      data,
      headers: {
        Authorization: `Bearer ${this.#apiKey}`,
      },
    });
    return response.data;
  }

  private getUrlParams(options: RequestOptions): URLSearchParams {
    const params = new URLSearchParams();
    if (options.filter) {
      for (const key in options.filter) {
        params.set(key, options.filter[key]);
      }
    }
    if (options.page) {
      params.set('page', options.page.toString());
    }
    if (options.perPage) {
      params.set('perPage', options.perPage.toString());
    }
    if (options.sortBy) {
      params.set('sortBy', options.sortBy);
    }
    if (options.sortOrder) {
      params.set('sortOrder', options.sortOrder);
    }
    return params;
  }
}

enum RequestMethod {
  GET = 'GET',
}

class Client {
  #apiClient: DataBeaverAPI;

  constructor(apiKey: string, env: Environment) {
    this.#apiClient = new DataBeaverAPI(apiKey, env);
  }

  async getProjectById(id: string): Promise<Project | null> {
    return await this.#apiClient.getById<Project>('projects', id);
  }

  async getProjectByName(name: string): Promise<Project | null> {
    return await this.#apiClient.getOneBy<Project>('projects', 'name', name);
  }

  async getProjects(options?: RequestOptions): Promise<Response<Project>> {
    return await this.#apiClient.getBy<Project>('projects', options);
  }

  async getFormById(id: string): Promise<Form | null> {
    return await this.#apiClient.getById<Form>('forms', id);
  }

  async getFormByName(name: string): Promise<Form | null> {
    return await this.#apiClient.getOneBy<Form>('forms', 'name', name);
  }

  async getForms(options?: RequestOptions): Promise<Response<Form>> {
    return await this.#apiClient.getBy<Form>('forms', options);
  }

  async getDispatchById(id: string): Promise<PopulatedDispatch | null> {
    return await this.#apiClient.getById<PopulatedDispatch>('dispatches', id);
  }

  async getDispatchByName(name: string): Promise<PopulatedDispatch | null> {
    return await this.#apiClient.getOneBy<PopulatedDispatch>(
      'dispatches',
      'name',
      name,
    );
  }

  async getDispatches(options?: RequestOptions): Promise<Response<Dispatch>> {
    return await this.#apiClient.getBy<Dispatch>('dispatches', options);
  }

  async getAgentById(id: string): Promise<Agent | null> {
    return await this.#apiClient.getById<Agent>('agents', id);
  }

  async getAgentByEmail(email: string): Promise<Agent | null> {
    return await this.#apiClient.getOneBy<Agent>('agents', 'email', email);
  }

  async getAgents(options?: RequestOptions): Promise<Response<Agent>> {
    return await this.#apiClient.getBy<Agent>('agents', options);
  }

  async getEntryById(id: string): Promise<PopulatedEntry | null> {
    return await this.#apiClient.getById<PopulatedEntry>('entries', id);
  }

  async getEntries(options?: RequestOptions): Promise<Response<Entry>> {
    return await this.#apiClient.getBy<Entry>('entries', options);
  }
}

enum Environment {
  Production = 'https://api.developer.databeaver.co',
  Sandbox = 'https://api-databeaver-developer.bluegreensoft.com',
}

export { Client, Environment };
