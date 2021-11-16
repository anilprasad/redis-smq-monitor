import { TQueryRequest } from '../../../../hooks/useQuery';
import React from 'react';
import MessageOption from './MessageOption';

interface IProps {
    messageId: string;
    sequenceId: number;
    RequeueMessageRequestFactory: (messageId: string, sequenceId: number) => TQueryRequest<void>;
    requeueMessageSuccessCallback: () => void;
}

const RequeueMessage: React.FC<IProps> = ({
    messageId,
    sequenceId,
    RequeueMessageRequestFactory,
    requeueMessageSuccessCallback
}) => {
    return (
        <MessageOption
            messageId={messageId}
            sequenceId={sequenceId}
            confirmationModalTitle={`Message Re-queuing`}
            confirmationModalBody={`Are you sure you want to re-queue this message?`}
            messageOptionCaption={`Re-queue`}
            RequestFactory={RequeueMessageRequestFactory}
            successCallback={requeueMessageSuccessCallback}
            successMessage={`Message ID ${messageId} has been successfully re-queued.`}
        />
    );
};

export default RequeueMessage;