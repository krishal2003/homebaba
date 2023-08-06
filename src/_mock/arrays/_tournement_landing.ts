import _mock from '../_mock';

export const _tournament_landing = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  heading: _mock.heading(index),
  subHeading: _mock.text.title(index),
  detail: _mock.text.description(index),
  image: _mock.image.avatar(index),
  team1: _mock.text.team1(index),
  team1score: _mock.team1score(index),
  team2: _mock.text.team2(index),
  team2score: _mock.team2score(index),
  date: _mock.date(index),
}));
