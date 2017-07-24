const clone=require("clone");
const db = {}

const defaultData = {
  contacts: [
    {
      id: 'ryan',
      name: 'Ryan Florence',
      email: 'ryan@reacttraining.com',
      avatarURL:'/ryan.jpg'
    },
    {
      id: 'michael',
      name: 'Michael Jackson',
      email: 'michael@reacttraining.com',
      avatarURL: '/michael.jpg'
    },
    {
      id: 'tyler',
      name: 'Tyler McGinnis',
      email: 'tyler@reacttraining.com',
      avatarURL: '/tyler.jpg'
    }
  ]
}
token=Math.random().toString(36).substr(-8);
let data=db[token];
data=db[token]=clone(defaultData);
console.log(db);