/* eslint-disable no-param-reassign */
import { action, thunk } from 'easy-peasy';
import { Data } from 'api';

export default {
  page: 'MyContent',
  data: '',
  setData: action((state, payload) => {
    state.data = payload;
  }),
  getData: thunk(async (actions, payload) => {
    const d = await Data(payload);
    if (d.ok) {
      actions.setData(d.data);
    }
  }),
};
