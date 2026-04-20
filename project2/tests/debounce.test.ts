import { describe, it, expect, jest } from '@jest/globals';
import { debounce } from '../src/utils/debounce';

describe('debounce', () => {
  it('should delay function execution', async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 150));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should reset delay on subsequent calls', async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    await new Promise(resolve => setTimeout(resolve, 50));
    debouncedFn();
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(mockFn).not.toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 60));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments correctly', async () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 50);

    debouncedFn('arg1', 'arg2');
    await new Promise(resolve => setTimeout(resolve, 60));
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});