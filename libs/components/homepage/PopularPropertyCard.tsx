import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Instrument } from '../../types/instrument/instrument';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topInstrumentRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface PopularPropertyCardProps {
	instrument: Instrument;
}

const conditionLabel = (val?: number) => {
	switch (val) {
		case 1: return 'Satisfying';
		case 2: return 'Not Bad';
		case 3: return 'Good';
		case 4: return 'Very Good';
		case 5: return 'Like New';
		default: return 'Unknown';
	}
};

const PopularPropertyCard = (props: PopularPropertyCardProps) => {
	const { instrument } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (id: string) => {
		await router.push({ pathname: '/equipment/detail', query: { id } });
	};

	const renderCard = () => (
		<Stack className="popular-card-box">
			<Box
				component={'div'}
				className={'card-img'}
				style={{ backgroundImage: `url(${REACT_APP_API_URL}/${instrument?.instrumentImages[0]})` }}
				onClick={() => pushDetailHandler(instrument._id)}
			>
				{instrument && instrument?.instrumentRank >= topInstrumentRank ? (
					<div className={'status'}>
						<img src="/img/icons/electricity.svg" alt="" />
						<span>top</span>
					</div>
				) : (
					''
				)}
				<div className={'price'}>${instrument.instrumentPrice}</div>
			</Box>
			<Box component={'div'} className={'info'}>
				<strong className={'title'} onClick={() => pushDetailHandler(instrument._id)}>
					{instrument.instrumentTitle}
				</strong>
				<p className={'desc'}>{instrument.instrumentAddress}</p>
				<div className={'options'}>
					<div>
						<img src="/img/icons/bed.svg" alt="" />
						<span>{conditionLabel(instrument?.instrumentCondition)} Condition</span>
					</div>
					<div>
						<img src="/img/icons/room.svg" alt="" />
						<span>{instrument?.instrumentQuantity} Units</span>
					</div>
					<div>
						<img src="/img/icons/expand.svg" alt="" />
						<span>{instrument?.instrumentSize} m³</span>
					</div>
				</div>
				<Divider sx={{ mt: '15px', mb: '17px' }} />
				<div className={'bott'}>
					<p>{instrument?.instrumentRent ? 'Lease' : 'Sale'}</p>
					<div className="view-like-box">
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{instrument?.instrumentViews}</Typography>
					</div>
				</div>
			</Box>
		</Stack>
	);

	if (device === 'mobile') {
		return renderCard();
	} else {
		return renderCard();
	}
};

export default PopularPropertyCard;
