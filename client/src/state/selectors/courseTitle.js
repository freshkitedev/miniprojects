import { selector, useRecoilValue } from 'recoil';
import { CourseState } from '../atoms/Courses';

export const courseTitleSelector = selector({
  key: 'courseTitleSelector',
  get: ({ get }) => {
    const courseDetails = get(CourseState);
    return courseDetails.title;
  },
});

