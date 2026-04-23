/**
 * Creates an event emitter with typed events
 * @returns An object with on, emit, and off methods
 */
export function createEventEmitter<T extends string>() {
    type EventMap = Record<T, (...args: unknown[]) => void>;
    const listeners = new Map<T, Set<(...args: unknown[]) => void>>();

    return {
        /**
         * Registers an event listener
         * @param event - The event name
         * @param listener - The listener function
         */
        on<K extends T>(event: K, listener: EventMap[K]): void {
            if (!listeners.has(event)) {
                listeners.set(event, new Set());
            }
            listeners.get(event)!.add(listener);
        },

        /**
         * Emits an event with arguments
         * @param event - The event name
         * @param args - Arguments to pass to listeners
         */
        emit<K extends T>(event: K, ...args: Parameters<EventMap[K]>): void {
            const eventListeners = listeners.get(event);
            if (eventListeners) {
                eventListeners.forEach((listener) => listener(...args));
            }
        },

        /**
         * Removes an event listener
         * @param event - The event name
         * @param listener - The listener function to remove
         */
        off<K extends T>(event: K, listener: EventMap[K]): void {
            const eventListeners = listeners.get(event);
            if (eventListeners) {
                eventListeners.delete(listener);
            }
        },
    };
}
