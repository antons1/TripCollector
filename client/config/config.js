import { merge as _merge} from 'lodash';

import { config as defaultConfig } from './default';
import { config as devConfig } from './dev';

export function config() {
    const toMerge = (() => {
        switch(process.env.NODE_ENV) {
            default:
            case "production":
                return {};
            case "development":
                return devConfig;
        }
    })()
    return _merge(defaultConfig, toMerge);
}