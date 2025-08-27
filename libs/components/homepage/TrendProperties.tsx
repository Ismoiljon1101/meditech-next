import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Property as Instrument } from '../../types/property/property';
import { InstrumentsInquiry as InstrumentsInquiry } from '../../types/property/property.input';
import TrendInstrumentsCard from './TrendPropertyCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROPERTIES as GET_INSTRUMENTS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_INSTRUMENTS as LIKE_TARGET_INSTRUMENT } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';

interface TrendInstrumentsProps {
	initialInput: InstrumentsInquiry;
}

const TrendInstruments = (props: TrendInstrumentsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendInstruments, setTrendProperties] = useState<Instrument[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetInstrument] = useMutation(LIKE_TARGET_INSTRUMENT);

	const {
		loading: getInstrumentsLoading,
		data: getInstrumentsData,
		error: getInstrumentsError,
		refetch: getInstrumentsRefetch,
	} = useQuery(GET_INSTRUMENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTrendProperties(data?.getProperties?.list);
		},
	});

	/** HANDLERS **/
	const likeInstrumentHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			//  execute likeTargetProperty Mutation
			await likeTargetInstrument({ variables: { input: id } });
			// execute getPropertiesRefetch
			await getInstrumentsRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR,likeInstrumentHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (trendInstruments) console.log('trendInstruments:', trendInstruments);
	if (!trendInstruments) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Trend Instruments</span>
					</Stack>
					<Stack className={'card-box'}>
						{trendInstruments.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{trendInstruments.map((property: Instrument) => {
									return (
										<SwiperSlide key={property._id} className={'trend-property-slide'}>
											<TrendInstrumentsCard property={property} likePropertyHandler={likeInstrumentHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Trend Instruments</span>
							<p>Trend is based on likes</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-trend-prev'} />
								<div className={'swiper-trend-pagination'}></div>
								<EastIcon className={'swiper-trend-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{trendInstruments.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								spaceBetween={15}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{trendInstruments.map((property: Instrument) => {
									return (
										<SwiperSlide key={property._id} className={'trend-property-slide'}>
											<TrendInstrumentsCard property={property} likePropertyHandler={likeInstrumentHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendInstruments.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'propertyLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendInstruments;
