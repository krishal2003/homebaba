import _mock from '../_mock';
import { randomNumberRange } from '../utils';


export const _tournamentCards = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  cover: _mock.image.cover(index),
  name: _mock.name.fullName(index),
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  totalPosts: randomNumberRange(999, 99999),
  role: _mock.role(index),
}));

