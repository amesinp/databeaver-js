interface EntitySnippet {
  id: string;
}

interface RoleSnippet {
  name: string;
}

interface Admin {
  id: string;
  role: RoleSnippet;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: string;
  profilePicture: string;
  phone: string;
}

interface Project {
  id: string;
  name: string;
  dispatches: EntitySnippet[];
  createdBy?: Admin;
  modifiedBy?: Admin;
  createdAt: Date;
  updatedAt: Date;
}

interface Form {
  id: string;
  formData?: Record<string, any>[];
  dispatched: boolean;
  status: string;
  name: string;
  sector?: string;
  createdBy?: Admin;
  modifiedBy?: Admin;
  createdAt: Date;
  updatedAt: Date;
}

interface Agent {
  id: string;
  groups: AgentGroup[];
  status: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePicture?: string;
  location: AgentLocation[];
  createdAt: Date;
  updatedAt: Date;
}

interface AgentLocation {
  country?: string;
  city?: string;
  state?: string;
  zone?: string;
}

interface AgentGroup {
  id: string;
  name: string;
  colour: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BaseDispatch {
  id: string;
  dispatchType: string;
  status: DispatchStatus;
  instructions?: string;
  name: string;
  dueDate: Date;
  colour: string;
  totalExpectedEntries: number;
  amountPerEntry: number;
  totalBudget: number;
  createdBy: Admin;
  modifiedBy: Admin;
  createdAt: Date;
  updatedAt: Date;
}

interface Dispatch extends BaseDispatch {
  form: string;
  project: string;
  recipients: {
    agents: EntitySnippet[];
    agentGroups: EntitySnippet[];
  };
}

interface PopulatedDispatch extends BaseDispatch {
  form: Form;
  project: Project;
  recipients: {
    agents: Agent[];
    agentGroups: AgentGroup[];
  };
}

enum DispatchStatus {
  completed = 'completed',
  dispatched = 'dispatched',
  draft = 'draft',
  suspended = 'suspended',
}

interface BaseEntry {
  id: string;
  status: string;
  location: {
    address?: string;
    country?: string;
    state?: string;
    lga?: string;
    city?: string;
    coordinates?: {
      longitude: number;
      lattitude: number;
    };
  };
  answers: EntryAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

interface Entry extends BaseEntry {
  dispatch: string;
  form: string;
  project: string;
  agent: string;
}

interface PopulatedEntry extends BaseEntry {
  dispatch: Dispatch;
  form: Form;
  project: Project;
  agent: Agent;
}

interface EntryAnswer {
  type?: string;
  question?: string;
  answer?: any;
}

interface RequestOptions {
  filter?: Record<string, string>;
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: string;
}

interface PageLinks {
  current?: string;
  previous?: string;
  next?: string;
}

interface Response<T> {
  total: number;
  data: T[];
  links?: PageLinks;
}

export {
  Project,
  Form,
  Dispatch,
  PopulatedDispatch,
  Agent,
  Entry,
  PopulatedEntry,
  RequestOptions,
  Response,
};
