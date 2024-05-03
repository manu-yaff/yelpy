export interface State<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
}

interface FetchProps<T> {
  callback: () => Promise<T>;
  observer: (
    target: State<T>,
    property: string | symbol,
    newValue: any,
    receiver: any
  ) => boolean;
}

export async function Fetch<ResCallbackType>({
  callback,
  observer,
}: FetchProps<ResCallbackType>) {
  const state: State<ResCallbackType> = {
    loading: false,
    error: null,
    data: null,
  };

  const proxyState = new Proxy(state, { set: observer });

  try {
    proxyState.loading = true;

    const data = await callback();
    proxyState.data = data;
  } catch (error: unknown) {
    proxyState.error = error as Error;
  } finally {
    proxyState.loading = false;
  }
}
