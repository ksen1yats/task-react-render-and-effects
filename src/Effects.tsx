import { useState, useEffect } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const [lastMessage, setLastMessage] = useState<number | string>(-1);

    useEffect(() => {
        // При смене источника считаем, что сообщений ещё не было
        setLastMessage(-1);

        const callback = (message: number | string) => {
            setLastMessage(message);
        };

        subscribe(props.sourceId, callback);

        // Отписываемся при размонтировании или смене sourceId
        return () => {
            unsubscribe(props.sourceId, callback);
        };
    }, [props.sourceId]);

    return (
        <div>
            {props.sourceId}: {lastMessage}
        </div>
    );
}
