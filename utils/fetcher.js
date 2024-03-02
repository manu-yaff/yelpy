export function Fetcher(notified) {
  this._state = {
    error: null,
    loading: false,
    data: null,
  };

  this.state = new Proxy(this._state, {
    set: notified,
  });
}

Fetcher.prototype.fetchData = async function (callback) {
  this.state.loading = true;

  const [data, error] = await callback();

  error ? (this.state.error = error) : (this.state.data = data);

  this.state.loading = false;
};
