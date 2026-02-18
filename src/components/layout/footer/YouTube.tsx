import React from 'react';
import { useTranslations } from '@deriv-com/translations';
import { Tooltip } from '@deriv-com/ui';

const YouTube = () => {
    const { localize } = useTranslations();

    return (
        <Tooltip
            as='a'
            className='app-footer__icon'
            href='https://www.youtube.com/@LocoTradinghub'
            target='_blank'
            tooltipContent={localize('YouTube')}
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.8 4.8c-.2-1.3-.8-2.2-2-2.4C11.4 2 8 2 8 2s-3.4 0-5.8.4c-1.2.2-1.8 1.1-2 2.4-.2 1-.2 2.1-.2 3.2 0 1.1 0 2.2.2 3.2.2 1.3.8 2.2 2 2.4 2.4.4 5.8.4 5.8.4s3.4 0 5.8-.4c1.2-.2 1.8-1.1 2-2.4.2-1 .2-2.1.2-3.2 0-1.1 0-2.2-.2-3.2zM6.4 10.4V5.6L10.4 8l-4 2.4z"
                    fill="var(--text-general)"
                />
            </svg>
        </Tooltip>
    );
};

export default YouTube;
