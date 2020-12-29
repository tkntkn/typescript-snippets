interface CustomEventTarget<Name, Event> {
    addEventListener(name: Name, callback: (event: Event)=> void): void;
    removeEventListener(name: Name, callback: (event: Event)=> void): void;
}

export function resolveOnEvent<
    Event,
    Name extends string = string,
    Target extends CustomEventTarget<Name, Event> = CustomEventTarget<Name, Event>
>(target: Target, name: Name) {
    return new Promise<Event>((resolve) => {
        const onEvent = (event: Event) => {
            target.removeEventListener(name, onEvent);
            resolve(event);
        }
        target.addEventListener(name, onEvent);
    });
}
