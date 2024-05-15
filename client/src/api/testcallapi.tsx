import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface OlympicsEvent {
    id: string;
    sport: string;
    discipline: string;
    date: string;
    athletes: Array<{ name: string, country: string }>;
}

const OlympicsData: React.FC = () => {
    const [events, setEvents] = useState<OlympicsEvent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOlympicsData = async () => {
            try {
                const response = await axios.get('https://api.olympicsapi.com/events', {
                    headers: { 'Authorization': 'Bearer YOUR_API_KEY' }  // Remplacez 'YOUR_API_KEY' par votre clé API personnelle
                });
                setEvents(response.data.events);
                setIsLoading(false);
            } catch (error: any) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchOlympicsData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Olympic Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <strong>{event.sport}:</strong> {event.discipline}
                        <ul>
                            {event.athletes.map(athlete => (
                                <li key={athlete.name}>{athlete.name} ({athlete.country})</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OlympicsData;
