// import _ from 'lodash';
// import {
//   USER_GET_ALL,
// } from '../actions/types';

// export default function(state = [], action) {
//   switch (action.type) {
//     case USER_GET_ALL:
//       return _.extend({}, state, _.keyBy(action.payload.data, 'id'));
//     default:
//       return state;
//   }
// }

export default function() {
  return [
    {id: "1", name: "Jane Doe"},
    {id: "2", name: "Jane Doe2"},
    {id: "3", name: "Jane Doe3"},
    {id: "4", name: "Jane Doe4"},
    {id: "5", name: "Jane Doe5"},
  ]
}
