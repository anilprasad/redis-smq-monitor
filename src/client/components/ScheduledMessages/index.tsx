import { withRouter } from 'react-router';
import React, { useCallback } from 'react';
import QueueMessages from '../common/QueueMessages';
import { purgeScheduledMessages } from '../../transport/http/api';
import { getScheduledMessages } from '../../transport/http/api';
import { deleteScheduledMessage } from '../../transport/http/api';

const ScheduledMessages: React.FC = () => {
    const FetchQueueMessagesRequestFactory = useCallback((skip: number, take: number) => {
        return () =>
            getScheduledMessages(skip, take).then((result) => {
                return {
                    ...result,
                    data: {
                        ...result.data,
                        data: {
                            ...result.data.data,
                            items: result.data.data.items.map((i) => ({
                                message: i
                            }))
                        }
                    }
                };
            });
    }, []);
    const DeleteQueueMessageRequestFactory = useCallback((messageId: string) => {
        return () => deleteScheduledMessage(messageId);
    }, []);

    return (
        <>
            <h1 className={'display-4'}>Scheduled Messages</h1>
            <QueueMessages
                FetchQueueMessagesRequestFactory={FetchQueueMessagesRequestFactory}
                DeleteQueueMessageRequestFactory={DeleteQueueMessageRequestFactory}
                deleteMessagesRequestCallback={purgeScheduledMessages}
            />
        </>
    );
};

export default withRouter(ScheduledMessages);
