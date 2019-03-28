import { url } from "../components/utils/constants";

const data = {
    groups: [
      {
        id: 1,
        members: [
          {
            id: 'CustRep1',
            name: 'John Doe',
            role: 'Chairman',
            leads: [
              {
                id: 'lead1',
                name: 'Max Power',
                owner: 'John Doe',
                status: 'new',
                company: 'Power Co',
                url: 'https://example.com/leads?Id=lead1'
              }
            ],
            deals: [
              {
                id: 'deal1',
                name: 'Power company - new install of windows',
                owner: 'John Doe',
                amount: 1000,
                closeDate: '21.7.2019',
                workAmount: 8,
                url: 'https://example.com/deals?Id=deal1',
                stage: 'TT'
              }
            ]
          }
        ]
      }
    ]
  }

const axiosMock = {
    post: jest.fn((_url) => {
        if (_url === `${url}/login.php`) {
            return Promise.resolve({
                data: 'data'
            });
        }
            return null;
    }),
    get: jest.fn(_url => {
        if (_url === `${url}/data.php`)
            {
                return Promise.resolve({
                    data
                });
            }
            return null;
    })
};

export default axiosMock;