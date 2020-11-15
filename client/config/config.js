import { merge as _merge} from 'lodash';

import { config as defaultConfig } from './default';
import { config as localConfig } from './local';

export function config() {
    const toMerge = (() => {
        switch(process.env.TC_ENV || process.env.NODE_ENV) {
            default:
            case "production":
            case "development":
                return {};
            case "local":
                return localConfig;
        }
    })()
    return _merge(defaultConfig, toMerge);
}