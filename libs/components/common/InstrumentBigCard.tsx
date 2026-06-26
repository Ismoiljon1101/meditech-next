import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Instrument } from '../../types/instrument/instrument';
import { REACT_APP_API_URL, topInstrumentRank } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface InstrumentBigCardProps {
	instrument: Instrument;
	likeInstrumentHandler?: any;
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

const InstrumentBigCard = (props: InstrumentBigCardProps) => {
	const { instrument, likeInstrumentHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const goInstrumentDetailPage = (instrumentId: string) => {
		router.push(`/equipment/detail?id=${instrumentId}`);
	};

	if (device === 'mobile') {
		return (
			<Stack
				className="property-big-card-box"
				onClick={() => goInstrumentDetailPage(instrument?._id)}
				role="button"
				tabIndex={0}
				aria-label={`View details for ${instrument?.instrumentTitle ?? 'instrument'}`}
				onKeyDown={(e: React.KeyboardEvent) => {
					if (e.key === 'Enter' || e.key === ' ') goInstrumentDetailPage(instrument?._id);
				}}
			>
				<Box
					component="div"
					className="card-img"
					style={{
						backgroundImage: `url(${REACT_APP_API_URL}/${instrument?.instrumentImages?.[0]})`,
						backgroundColor: '#f2f2f2',
					}}
				>
					{instrument && instrument?.instrumentRank >= topInstrumentRank && (
						<div className="status" aria-label="Top instrument">
							<img src="/img/icons/electricity.svg" alt="" aria-hidden="true" />
							<span>top</span>
						</div>
					)}
					<div className="price">${formatterStr(instrument?.instrumentPrice)}</div>
				</Box>
				<Box component="div" className="info">
					<strong className="title">{instrument?.instrumentTitle}</strong>
					<p className="desc">{instrument?.instrumentAddress}</p>
					<div className="options">
						<div className="option">
							<img src="/img/icons/bed.svg" alt="" aria-hidden="true" />
							<span>{conditionLabel(instrument?.instrumentCondition)}</span>
						</div>
						<div className="option">
							<img src="/img/icons/room.svg" alt="" aria-hidden="true" />
							<span>{instrument?.instrumentQuantity} Quantity</span>
						</div>
						<div className="option">
							<img src="/img/icons/expand.svg" alt="" aria-hidden="true" />
							<span>{instrument?.instrumentSize} m³</span>
						</div>
					</div>
					<Divider className="divider" />
					<div className="bott">
						<div className="tags">
							{instrument?.instrumentRent ? <p>Lease</p> : <span>Sale</span>}
						</div>
						<div className="buttons-box">
							<IconButton color="default" aria-label="Views">
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{instrument?.instrumentViews}</Typography>
							<IconButton
								color="default"
								aria-label={instrument?.meLiked && instrument?.meLiked[0]?.myFavorite ? 'Unlike' : 'Like'}
								onClick={(e: { stopPropagation: () => void }) => {
									e.stopPropagation();
									likeInstrumentHandler?.(user, instrument?._id);
								}}
							>
								{instrument?.meLiked && instrument?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{instrument?.instrumentLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="property-big-card-box" onClick={() => goInstrumentDetailPage(instrument?._id)}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${instrument?.instrumentImages?.[0]})` }}
				>
					{instrument && instrument?.instrumentRank >= topInstrumentRank && (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					)}
					<div className={'price'}>${formatterStr(instrument?.instrumentPrice)}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{instrument?.instrumentTitle}</strong>
					<p className={'desc'}>{instrument?.instrumentAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{conditionLabel(instrument?.instrumentCondition)}</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{instrument?.instrumentQuantity} Quantity</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{instrument?.instrumentSize} m³</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<div>
							{instrument?.instrumentRent ? <p>Lease</p> : <span>Sale</span>}
						</div>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{instrument?.instrumentViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e: { stopPropagation: () => void }) => {
									e.stopPropagation();
									likeInstrumentHandler?.(user, instrument?._id);
								}}
							>
								{instrument?.meLiked && instrument?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{instrument?.instrumentLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default InstrumentBigCard;
