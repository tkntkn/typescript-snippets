function createMethodDecorator<Class, Prototype, MethodName extends string>(override) {
  return function <T, A extends []>(
    target: Prototype,
    props: MethodName,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = function(this: Class, ...args: A) {
      return override((...args: A) => Reflect.apply(method, this, args));
    }
    return descriptor;
  }
}

function prohibitDoubleExecution<T>(
  target: T,
  props: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  let executing = false;
  descriptor.value = async function (...args: any[]) {
    if (executing) {
      return;
    }
    executing = true;
    const result = await Reflect.apply(method, this, args);
    executing = false;
    return result;
  };
}

const prohibitDoubleExecution2 = createMethodDecorator((method) => {
  let executing = false;
  return async (...args) => {
    if (executing) return;
    executing = true;
    const result = await method(args);
    executing = false;
    return result;
  }
});
