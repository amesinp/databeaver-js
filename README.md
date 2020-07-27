# DataBeaver Node Client

NodeJS wrapper for the [DataBeaver API](https://databeaver.gitbook.io/databeaver-docs/).

## Installation

Install via npm:
>$ npm i databeaver-js

## Usage

### Intializing a Client

Intialize a client using the API key for your organization gotten from the DataBeaver admin dashboard.

```javascript
const databeaver = require('databeaver-js');

const client = new databeaver.Client(
  process.env.API_KEY,
  databeaver.Environment.Sandbox
);
```

### Functions

| Method | Purpose
| --- | ---
| `getProjectById(id)` | Get a single project using the id
| `getProjectByName(name)` | Get a single project using the name
| `getProjects(options)` | Get a paginated list of projects based on the options specified (type `RequestOptions`). Returns a type of `Response`
| `getFormById(id)` | Get a single form using the id
| `getFormByName(name)` | Get a single form using the name
| `getForms(options)` | Get a paginated list of forms based on the options specified (type `RequestOptions`). Returns a type of `Response`
| `getDispatchById(id)` | Get a single dispatch using the id
| `getDispatchByName(name)` | Get a single dispatch using the name
| `getDispatches(options)` | Get a paginated list of dispatches based on the options specified (type `RequestOptions`). Returns a type of `Response`
| `getAgentById(id)` | Get a single agent using the id
| `getAgentByEmail(email)` | Get a single agent using the email address
| `getAgents(options)` | Get a paginated list of agent based on the options specified (type `RequestOptions`). Returns a type of `Response`
| `getEntryById(id)` | Get a single entry using the id
| `getEntries(options)` | Get a paginated list of entries based on the options specified (type `RequestOptions`). Returns a type of `Response`

### Types

`RequestOptions`

```typescript
{
  filter: object, 
  page: number, 
  perPage: number,
  sortBy: string,
  sortOrder: string,
}
```

`Response`

```typescript
{
  total: number,
  data: Array,
  links: {
    current: string,
    previous: string,
    next: string
  }
}
```

## Examples

Get all the projects in your organization with a maximum of 10 projects returned per page.

```javascript
client.getProjects({
  page: 1,
  perPage: 10
}).then((projects) => {
  console.log(projects.total);
});
```

Get all accepted entries for form `507f1f77bcf86cd799439011` with a maximum of 30 projects returned per page.

```javascript
client.getEntries({
  filter: {
    form: '507f1f77bcf86cd799439011',
    status: 'accepted'
  },
  page: 1,
}).then((projects) => {
  console.log(projects.total);
});
```

Get a single entry using the id.

```javascript
client.getEntryById('507f191e810c19729de860ea').then((entry) => {
  console.log(entry);
});
```

Get a single project using the name.

```javascript
client.getProjectByName('Project 1').then((project) => {
  console.log(project);
});
```