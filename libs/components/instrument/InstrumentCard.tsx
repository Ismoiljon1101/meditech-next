import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Instrument } from '../../types/instrument/instrument';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface InstrumentCardType {
	instrument: Instrument;
	likeInstrumentHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
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

const InstrumentCard = (props: InstrumentCardType) => {
	const { instrument, likeInstrumentHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = instrument?.instrumentImages[0]
		? `${REACT_APP_API_URL}/${instrument?.instrumentImages[0]}`
		: '/img/banner/header1.webp';

	if (device === 'mobile') {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/equipment/detail',
							query: { id: instrument?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{instrument && instrument?.instrumentRank > 50 && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(instrument?.instrumentPrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/equipment/detail',
									query: { id: instrument?._id },
								}}
							>
								<Typography>{instrument.instrumentTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{instrument.instrumentAddress}, {instrument.instrumentLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<img src="/img/icons/bed.svg" alt="" />
							<Typography>{conditionLabel(instrument?.instrumentCondition)} Condition</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/room.svg" alt="" />
							<Typography>{instrument.instrumentQuantity} Units</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/expand.svg" alt="" />
							<Typography>{instrument.instrumentSize} m³</Typography>
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={instrument.instrumentRent ? '' : 'disabled-type'}
							>
								Lease
							</Typography>
						</Stack>
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{instrument?.instrumentViews}</Typography>
								<IconButton color={'default'} onClick={() => likeInstrumentHandler(user, instrument?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : instrument?.meLiked && instrument?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{instrument?.instrumentLikes}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/equipment/detail',
							query: { id: instrument?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{instrument && instrument?.instrumentRank > 50 && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(instrument?.instrumentPrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/equipment/detail',
									query: { id: instrument?._id },
								}}
							>
								<Typography>{instrument.instrumentTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{instrument.instrumentAddress}, {instrument.instrumentLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<img src="/img/icons/bed.svg" alt="" />
							<Typography>{conditionLabel(instrument?.instrumentCondition)} Condition</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/room.svg" alt="" />
							<Typography>{instrument.instrumentQuantity} Units</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/expand.svg" alt="" />
							<Typography>{instrument.instrumentSize} m³</Typography>
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={instrument.instrumentRent ? '' : 'disabled-type'}
							>
								Lease
							</Typography>
						</Stack>
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{instrument?.instrumentViews}</Typography>
								<IconButton color={'default'} onClick={() => likeInstrumentHandler(user, instrument?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : instrument?.meLiked && instrument?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{instrument?.instrumentLikes}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default InstrumentCard;
