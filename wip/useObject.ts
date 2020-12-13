function usePrevious() {

}

function useForceUpdate() {
	const [_, forceUpdate] = useReducer(x => !x, false);
	return forceUpdate;
}

function hookSetter<T extends object>(target: T, hook: (...args: Parameters<typeof Reflect.set>) => void): T {
	return new Proxy(target, {
		get(...args) {
			return hookSetter(Reflect.get(...args), hook);
		},
		set(...args) {
			const result = Reflect.set(...args);
			hook(...args);
			return result;
		}
	}) as T;
}

function useObject<T extends object>(entity: T) {
	const forceUpdate = useForceUpdate();
	const [state, setState] = useState<T>(hookSetter(entity, forceUpdate));

	useEffect(() => {
		setState(hookSetter(entity, forceUpdate))
	}, [entity]);

	return state;
}
