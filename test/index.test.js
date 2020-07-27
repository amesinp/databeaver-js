const databeaver = require('../lib/index');
const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

const sandboxUrl = 'https://api-databeaver-developer.bluegreensoft.com';
const client = new databeaver.Client(
  'testkey', 
  databeaver.Environment.Sandbox
);
const testResult = {
  success: true,
  _metadata: {
    total: 2,
    page: 1,
    perPage: 1,
    pageLinks: {
      current: 'https://api-databeaver-developer.bluegreensoft.com?page=1&perPage=1',
      next: 'https://api-databeaver-developer.bluegreensoft.com?page=2&perPage=1'
    }
  },
  data: [
    {
      id: '1'
    }
  ]
};

describe('Projects', () => {
  before(async () => {
    nock(sandboxUrl)
      .get('/v1/projects?status=active&page=1')
      .reply(200, testResult);
    
    nock(sandboxUrl)
      .get('/v1/projects?name=test&perPage=1')
      .reply(200, testResult);

    const copy = JSON.parse(JSON.stringify(testResult));
    copy._metadata.total = 0;
    copy._metadata.pageLinks = {};
    copy.data = [];
    nock(sandboxUrl)
      .get('/v1/projects?name=invalidtest&perPage=1')
      .reply(200, copy);

    nock(sandboxUrl)
      .get('/v1/projects/1')
      .reply(200, {
        success: true,
        data: testResult.data[0]
      });

    nock(sandboxUrl)
      .get('/v1/projects/3')
      .reply(404, {
        success: false
      });
  });

  describe('Get Projects', async () => {
    it('Should get projects', async () => {
      const projects = await client.getProjects({
        filter: {
          status: 'active'
        },
        page: 1
      });
      expect(projects.total).to.be.equal(testResult._metadata.total);
      expect(projects.links.current).to.be.equal(testResult._metadata.pageLinks.current);
      expect(projects.links.next).to.be.equal(testResult._metadata.pageLinks.next);
      expect(projects.data.length).to.be.equal(1);
      expect(projects.data[0].id).to.be.equal(testResult.data[0].id);
    });
    it('Should get project by id', async () => {
      const project = await client.getProjectById('1');
      expect(project.name).to.be.equal(testResult.data[0].name);
    });
    it('Should return null with invalid id', async () => {
      const project = await client.getProjectById('3');
      expect(project).to.be.equal(null);
    });
    it('Should get project by name', async () => {
      const project = await client.getProjectByName('test');
      expect(project.id).to.be.equal(testResult.data[0].id);
    });
    it('Should return null with invalid name', async () => {
      const project = await client.getProjectByName('invalidtest');
      expect(project).to.be.equal(null);
    });
  });
});

describe('Forms', () => {
  before(async () => {
    nock(sandboxUrl)
      .get('/v1/forms?status=active&page=1')
      .reply(200, testResult);
    
    nock(sandboxUrl)
      .get('/v1/forms?name=test&perPage=1')
      .reply(200, testResult);

    const copy = JSON.parse(JSON.stringify(testResult));
    copy._metadata.total = 0;
    copy._metadata.pageLinks = {};
    copy.data = [];
    nock(sandboxUrl)
      .get('/v1/forms?name=invalidtest&perPage=1')
      .reply(200, copy);

    nock(sandboxUrl)
      .get('/v1/forms/1')
      .reply(200, {
        success: true,
        data: testResult.data[0]
      });

    nock(sandboxUrl)
      .get('/v1/forms/3')
      .reply(404, {
        success: false
      });
  });

  describe('Get Forms', async () => {
    it('Should get forms', async () => {
      const forms = await client.getForms({
        filter: {
          status: 'active'
        },
        page: 1
      });
      expect(forms.total).to.be.equal(testResult._metadata.total);
      expect(forms.links.current).to.be.equal(testResult._metadata.pageLinks.current);
      expect(forms.links.next).to.be.equal(testResult._metadata.pageLinks.next);
      expect(forms.data.length).to.be.equal(1);
      expect(forms.data[0].id).to.be.equal(testResult.data[0].id);
    });
    it('Should get form by id', async () => {
      const form = await client.getFormById('1');
      expect(form.name).to.be.equal(testResult.data[0].name);
    });
    it('Should return null with invalid id', async () => {
      const form = await client.getFormById('3');
      expect(form).to.be.equal(null);
    });
    it('Should get form by name', async () => {
      const form = await client.getFormByName('test');
      expect(form.id).to.be.equal(testResult.data[0].id);
    });
    it('Should return null with invalid name', async () => {
      const form = await client.getFormByName('invalidtest');
      expect(form).to.be.equal(null);
    });
  });
});

describe('Dispatches', () => {
  before(async () => {
    nock(sandboxUrl)
      .get('/v1/dispatches?status=dispatched&page=1')
      .reply(200, testResult);
    
    nock(sandboxUrl)
      .get('/v1/dispatches?name=test&perPage=1')
      .reply(200, testResult);

    const copy = JSON.parse(JSON.stringify(testResult));
    copy._metadata.total = 0;
    copy._metadata.pageLinks = {};
    copy.data = [];
    nock(sandboxUrl)
      .get('/v1/dispatches?name=invalidtest&perPage=1')
      .reply(200, copy);

    nock(sandboxUrl)
      .get('/v1/dispatches/1')
      .reply(200, {
        success: true,
        data: testResult.data[0]
      });

    nock(sandboxUrl)
      .get('/v1/dispatches/3')
      .reply(404, {
        success: false
      });
  });

  describe('Get Dispatches', async () => {
    it('Should get dispatches', async () => {
      const dispatches = await client.getDispatches({
        filter: {
          status: 'dispatched'
        },
        page: 1
      });
      expect(dispatches.total).to.be.equal(testResult._metadata.total);
      expect(dispatches.links.current).to.be.equal(testResult._metadata.pageLinks.current);
      expect(dispatches.links.next).to.be.equal(testResult._metadata.pageLinks.next);
      expect(dispatches.data.length).to.be.equal(1);
      expect(dispatches.data[0].id).to.be.equal(testResult.data[0].id);
    });
    it('Should get dispatch by id', async () => {
      const dispatch = await client.getDispatchById('1');
      expect(dispatch.name).to.be.equal(testResult.data[0].name);
    });
    it('Should return null with invalid id', async () => {
      const dispatch = await client.getDispatchById('3');
      expect(dispatch).to.be.equal(null);
    });
    it('Should get dispatch by name', async () => {
      const dispatch = await client.getDispatchByName('test');
      expect(dispatch.id).to.be.equal(testResult.data[0].id);
    });
    it('Should return null with invalid name', async () => {
      const dispatch = await client.getDispatchByName('invalidtest');
      expect(dispatch).to.be.equal(null);
    });
  });
});

describe('Agents', () => {
  before(async () => {
    nock(sandboxUrl)
      .get('/v1/agents?status=active&page=1')
      .reply(200, testResult);
    
    nock(sandboxUrl)
      .get('/v1/agents?email=test&perPage=1')
      .reply(200, testResult);

    const copy = JSON.parse(JSON.stringify(testResult));
    copy._metadata.total = 0;
    copy._metadata.pageLinks = {};
    copy.data = [];
    nock(sandboxUrl)
      .get('/v1/agents?email=invalidtest&perPage=1')
      .reply(200, copy);

    nock(sandboxUrl)
      .get('/v1/agents/1')
      .reply(200, {
        success: true,
        data: testResult.data[0]
      });

    nock(sandboxUrl)
      .get('/v1/agents/3')
      .reply(404, {
        success: false
      });
  });

  describe('Get Agents', async () => {
    it('Should get agents', async () => {
      const agents = await client.getAgents({
        filter: {
          status: 'active'
        },
        page: 1
      });
      expect(agents.total).to.be.equal(testResult._metadata.total);
      expect(agents.links.current).to.be.equal(testResult._metadata.pageLinks.current);
      expect(agents.links.next).to.be.equal(testResult._metadata.pageLinks.next);
      expect(agents.data.length).to.be.equal(1);
      expect(agents.data[0].id).to.be.equal(testResult.data[0].id);
    });
    it('Should get agent by id', async () => {
      const agent = await client.getAgentById('1');
      expect(agent.name).to.be.equal(testResult.data[0].name);
    });
    it('Should return null with invalid id', async () => {
      const agent = await client.getAgentById('3');
      expect(agent).to.be.equal(null);
    });
    it('Should get agent by email', async () => {
      const agent = await client.getAgentByEmail('test');
      expect(agent.id).to.be.equal(testResult.data[0].id);
    });
    it('Should return null with invalid email', async () => {
      const agent = await client.getAgentByEmail('invalidtest');
      expect(agent).to.be.equal(null);
    });
  });
});

describe('Entries', () => {
  before(async () => {
    nock(sandboxUrl)
      .get('/v1/entries?status=pending&page=1')
      .reply(200, testResult);

    nock(sandboxUrl)
      .get('/v1/entries/1')
      .reply(200, {
        success: true,
        data: testResult.data[0]
      });

    nock(sandboxUrl)
      .get('/v1/entries/3')
      .reply(404, {
        success: false
      });
  });

  describe('Get Entries', async () => {
    it('Should get entries', async () => {
      const entries = await client.getEntries({
        filter: {
          status: 'pending'
        },
        page: 1
      });
      expect(entries.total).to.be.equal(testResult._metadata.total);
      expect(entries.links.current).to.be.equal(testResult._metadata.pageLinks.current);
      expect(entries.links.next).to.be.equal(testResult._metadata.pageLinks.next);
      expect(entries.data.length).to.be.equal(1);
      expect(entries.data[0].id).to.be.equal(testResult.data[0].id);
    });
    it('Should get entry by id', async () => {
      const entry = await client.getEntryById('1');
      expect(entry.name).to.be.equal(testResult.data[0].name);
    });
    it('Should return null with invalid id', async () => {
      const entry = await client.getEntryById('3');
      expect(entry).to.be.equal(null);
    });
  });
});
