var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function Fetch({ callback, observer, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const state = {
            loading: false,
            error: null,
            data: null,
        };
        const proxyState = new Proxy(state, { set: observer });
        try {
            proxyState.loading = true;
            const data = yield callback();
            proxyState.data = data;
        }
        catch (error) {
            proxyState.error = error;
        }
        finally {
            proxyState.loading = false;
        }
    });
}
