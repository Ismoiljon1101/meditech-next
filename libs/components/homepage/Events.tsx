import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

interface EventData {
	eventTitle: string;
	city: string;
	description: string;
	imageSrc: string;
}
const eventsData: EventData[] = [
	{
		eventTitle: 'CardioCheck ECG Device Demo',
		city: 'Incheon',
		description:
			'Join the live demonstration of the latest CardioCheck ECG devices at Incheon Medical Expo and learn about advanced heart monitoring technology!',
		imageSrc: '/img/events/INCHEON.webp',
	},
	{
		eventTitle: 'Seoul Pharma Conference',
		city: 'Seoul',
		description:
			'Explore cutting-edge pharmaceutical innovations and attend lectures on new drug developments at the Seoul Pharma Conference!',
		imageSrc: '/img/events/SEOUL.webp',
	},
	{
		eventTitle: 'Daegu Medical Tech Fair',
		city: 'Daegu',
		description:
			'Discover the newest medical devices and healthcare technologies at the Daegu Medical Tech Fair held in the city center!',
		imageSrc: '/img/events/DAEGU.webp',
	},
	{
		eventTitle: 'Busan Healthcare Symposium',
		city: 'Busan',
		description:
			'Attend workshops and seminars on advanced healthcare solutions and medical instruments at the Busan Healthcare Symposium!',
		imageSrc: '/img/events/BUSAN.webp',
	},
];

const EventCard = ({ event }: { event: EventData }) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				style={{
					backgroundImage: `url(${event?.imageSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Box component={'div'} className={'info'}>
					<strong>{event?.city}</strong>
					<span>{event?.eventTitle}</span>
				</Box>
				<Box component={'div'} className={'more'}>
					<span>{event?.description}</span>
				</Box>
			</Stack>
		);
	}
};

const Events = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className={'white'}>Events</span>
							<p className={'white'}>Events waiting your attention!</p>
						</Box>
					</Stack>
					<Stack className={'card-wrapper'}>
						{eventsData.map((event: EventData) => {
							return <EventCard event={event} key={event?.eventTitle} />;
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
