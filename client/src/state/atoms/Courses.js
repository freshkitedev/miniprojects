import { atom } from 'recoil';

export const CourseState = atom({
  key: 'coursedetails',
  default: {
    title: '',
    description: '',
    image: '',
    price: 0,
    error: null,
  },
});
