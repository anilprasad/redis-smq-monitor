import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { TWebsocketOnlineStreamPayloadData } from '../../../transport/websocket/streams/websocketOnlineStream';
import { IQueueOnlineStreamProps } from './OnlineStream';

interface IProps extends Omit<IQueueOnlineStreamProps, 'stream'> {
    online: Record<string, string> | null;
}

const OnlineStreamPage: React.FC<IProps> = ({ online = {}, getOnlineItemLink, noItemsMessage }) => {
    const data: JSX.Element[] = [];
    for (const id in online) {
        const item: TWebsocketOnlineStreamPayloadData = JSON.parse(online[id]);
        data.push(
            <tr key={`queue-online-${id}`}>
                <td>
                    <Link key={`queue-online-${id}-link`} to={getOnlineItemLink(id)}>
                        {id}
                    </Link>
                </td>
                <td>
                    {item.pid} /
                    <br />
                    {item.hostname}
                </td>
                <td>
                    {item.ipAddress.map((ip, index) => (
                        <div key={index}>{ip}</div>
                    ))}
                </td>
                <td>{new Date(item.createdAt).toUTCString()}</td>
            </tr>
        );
    }

    if (!data.length) {
        return <p>{noItemsMessage}</p>;
    }

    return (
        <div className={'mb-4'}>
            <Table className={'table table-striped'} hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>
                            PID /
                            <br />
                            Hostname
                        </th>
                        <th>
                            IP
                            <br />
                            Address
                        </th>
                        <th>
                            Started
                            <br />
                            Since
                        </th>
                    </tr>
                </thead>
                <tbody>{data}</tbody>
            </Table>
        </div>
    );
};

export default OnlineStreamPage;