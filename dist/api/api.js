var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { businessDetailObjectFromApiResponse } from '../adapters/business-detail.adapter.js';
import { businessObjectFromApiResponse } from '../adapters/business.adapter.js';
import { API_HOST } from '../common/constants.js';
import { BUSINESS_DETAIL_QUERY, SEARCH_BUSINESS_QUERY } from './queries.js';
export function getBusinessBySearch(searchTerm, location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield fetch(API_HOST, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    query: SEARCH_BUSINESS_QUERY,
                    variables: { searchTerm, location },
                }),
            });
            const { data } = (yield result.json());
            const businessList = data.search.business;
            return businessList.map(businessObjectFromApiResponse);
        }
        catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });
}
export function getBusinessDetail(businessId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield fetch(API_HOST, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    query: BUSINESS_DETAIL_QUERY,
                    variables: {
                        id: businessId,
                    },
                }),
            });
            const { data } = (yield result.json());
            const businessDetail = data.business;
            return businessDetailObjectFromApiResponse(businessDetail);
        }
        catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    });
}
