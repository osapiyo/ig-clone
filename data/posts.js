import { USERS } from './users'

export const POSTS = [
  {
    imageUrl: 'https://picsum.photos/300/300',
    user: USERS[0].user,
    likes: '782',
    caption: 'Pie jelly muffin muffin sweet roll marshmallow fruitcake.',
    profile_picture: USERS[0].image,
    comments: [
      {
        user: USERS[1].user,
        comment: 'Bear claw sugar plum jelly chocolate cake dessert.',
      },
      {
        user: USERS[2].user,
        comment: 'Danish bear claw biscuit.',
      },
    ],
  },
  {
    imageUrl: 'https://picsum.photos/400',
    user: USERS[4].user,
    likes: '15',
    caption:
      'Cupcake ipsum dolor sit amet lemon drops sweet carrot cake. Dragée pastry croissant toffee pie carrot cake donut cupcake.',
    profile_picture: USERS[4].image,
    comments: [
      {
        user: USERS[3].user,
        comment:
          'Cheesecake muffin tootsie roll sweet roll chocolate oat cake macaroon cotton candy.',
      },
      {
        user: USERS[1].user,
        comment: 'Tootsie roll oat cake jujubes gummi bears.',
      },
    ],
  },
]
