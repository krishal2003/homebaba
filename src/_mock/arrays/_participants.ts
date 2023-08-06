import _mock from "../_mock";
import { randomInArray } from "../utils";

export interface IParticipationList  {
    id: string;
    avatarUrl: string;
    name: string;
    username: string;
    organization: string;
    status: string;
  }
  
  export const _participantList = [...Array(24)].map((_, index) => ({
    id: _mock.id(index),
    avatarUrl: _mock.image.avatar(index),
    name: _mock.name.fullName(index),
    username: _mock.name.firstName(index),
    organization: _mock.company(index),
    status: randomInArray(['accepted', 'pending']),
  }));