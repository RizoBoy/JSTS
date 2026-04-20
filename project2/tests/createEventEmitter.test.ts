import { describe, it, expect, jest } from '@jest/globals';
import { createEventEmitter } from '../src/utils/createEventEmitter';

describe('createEventEmitter', () => {
  it('should emit events to listeners', () => {
    const emitter = createEventEmitter<'test'>();
    const listener = jest.fn();
    emitter.on('test', listener);

    emitter.emit('test', 'arg1', 'arg2');
    expect(listener).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should handle multiple listeners', () => {
    const emitter = createEventEmitter<'event'>();
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    emitter.on('event', listener1);
    emitter.on('event', listener2);

    emitter.emit('event');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  it('should remove listeners', () => {
    const emitter = createEventEmitter<'test'>();
    const listener = jest.fn();
    emitter.on('test', listener);
    emitter.off('test', listener);

    emitter.emit('test');
    expect(listener).not.toHaveBeenCalled();
  });

  it('should handle different event types', () => {
    const emitter = createEventEmitter<'event1' | 'event2'>();
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    emitter.on('event1', listener1);
    emitter.on('event2', listener2);

    emitter.emit('event1');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).not.toHaveBeenCalled();
  });
});