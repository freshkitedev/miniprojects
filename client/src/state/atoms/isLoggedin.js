// atom.js
import { atom, useRecoilState } from 'recoil';

const initialStoredValue = localStorage.getItem('isLoggedInState');
const defaultInitialValue = initialStoredValue ? JSON.parse(initialStoredValue) : false;

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: defaultInitialValue,
});

export const useLoggedInState = () => {
  const [value, setValue] = useRecoilState(isLoggedInState);

  const setAndStoreValue = newValue => {
    setValue(newValue);
    localStorage.setItem('isLoggedInState', JSON.stringify(newValue));
  };

  return [value, setAndStoreValue];
};
