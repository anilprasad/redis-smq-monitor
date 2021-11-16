import { TQueryRequest } from '../../../../hooks/useQuery';
import React from 'react';
import MessageOption from './MessageOption';

interface IProps {
    messageId: string;
    sequenceId: number;
    deleteMessageSuccessCallback: () => void;
    DeleteMessageRequestFactory: (messageId: string, sequenceId: number) => TQueryRequest<void>;
}

const DeleteMessage: React.FC<IProps> = ({
    messageId,
    sequenceId,
    DeleteMessageRequestFactory,
    deleteMessageSuccessCallback
}) => {
    return (
        <MessageOption
            messageId={messageId}
            sequenceId={sequenceId}
            confirmationModalTitle={`Message Deletion`}
            confirmationModalBody={`Are you sure you want to delete this message?`}
            messageOptionCaption={`Delete`}
            RequestFactory={DeleteMessageRequestFactory}
            successCallback={deleteMessageSuccessCallback}
            successMessage={`Message ID ${messageId} has been successfully deleted.`}
        />
    );
};

export default DeleteMessage;