export async function resolveOnNextAnimationFrame() {
  await new Promise(resolve => {
    requestAnimationFrame(resolve);
  })
}
