export function FetchData({ callback, observer }) {
  const state = {
    loading: false,
    error: null,
    data: null,
  };

  const proxyState = new Proxy(state, { set: observer });

  (async function () {
    try {
      proxyState.loading = true;

      const data = await callback();
      proxyState.data = data;
    } catch (error) {
      proxyState.error = error;
    } finally {
      proxyState.loading = false;
    }
  })();
}
