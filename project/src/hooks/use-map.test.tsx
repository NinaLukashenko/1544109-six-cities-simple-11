import { renderHook } from '@testing-library/react';
import { makeFakeCity } from '../utils/mocks';
import useMap from './use-map';

const target = document.createElement('div');
document.body.appendChild(target);
const ref = {
  current: target,
};

const mockCity = makeFakeCity();

describe('Hook: useMap', () => {
  it('should return map element', () => {
    const { result } = renderHook(() => useMap(ref, mockCity));
    const map = result.current;

    expect(map).toBeInstanceOf(Object);
  });
});
