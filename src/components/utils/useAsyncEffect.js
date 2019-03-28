// @flow
import { useEffect } from 'react';

const useAsyncEffect = (effect: Function, triggers: Array<any>) => {
    useEffect(() => {
        effect();
    },
    triggers
    )
}

export default useAsyncEffect;