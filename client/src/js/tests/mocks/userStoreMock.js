import AppConstants from '../../constants/AppConstants';
const userStoreMock = {
  actionType: AppConstants.RECEIVE_LOGIN,
  articles: [
    {
      author: 'TNW Deals',
      title: 'Build electronics projects',
      description: 'Understanding electronics',

    },
    {
      author: 'Rachel Kaser',
      title: 'Facebook brings out a new ‘Order Food’ option',
      description: 'Facebook is rolling out a new food ordering option',

    }
  ]
};

export default userStoreMock;