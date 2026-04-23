export function createEventEmitter<T extends string>() {
    type EventMap = Record<T, (...args: unknown[]) => void>;
    const listeners = new Map<T, Set<(...args: unknown[]) => void>>();

    return {
        on<K extends T>(event: K, listener: EventMap[K]): void {
            if (!listeners.has(event)) {
                listeners.set(event, new Set());
            }
            listeners.get(event)!.add(listener);
        },

        emit<K extends T>(event: K, ...args: Parameters<EventMap[K]>): void {
            const eventListeners = listeners.get(event);
            if (eventListeners) {
                eventListeners.forEach((listener) => listener(...args));
            }
        },

        off<K extends T>(event: K, listener: EventMap[K]): void {
            const eventListeners = listeners.get(event);
            if (eventListeners) {
                eventListeners.delete(listener);
            }
        },
    };
}
