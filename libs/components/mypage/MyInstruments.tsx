import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { InstrumentCard } from './InstrumentCard';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Instrument } from '../../types/instrument/instrument';
import { SellerInstrumentsInquiry } from '../../types/instrument/instrument.input';
import { T } from '../../types/common';
import { InstrumentStatus } from '../../enums/instrument.enum';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { UPDATE_INSTRUMENT } from '../../../apollo/user/mutation';
import { GET_SELLER_INSTRUMENTS } from '../../../apollo/user/query';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';

const MyInstruments: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<SellerInstrumentsInquiry>(initialInput);
	const [sellerInstruments, setSellerInstruments] = useState<Instrument[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateInstrument] = useMutation(UPDATE_INSTRUMENT);
	const {
		loading: getSellerInstrumentsLoading,
		data: getSellerInstrumentsData,
		error: getSellerInstrumentsError,
		refetch: getSellerInstrumentsRefetch,
	} = useQuery(GET_SELLER_INSTRUMENTS, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setSellerInstruments(data?.getSellerInstruments?.list);
			setTotal(data?.getSellerInstruments?.metaCounter[0]?.total ?? 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: InstrumentStatus) => {
		setSearchFilter({ ...searchFilter, search: { instrumentStatus: value } });
	};

	const deleteInstrumentHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to delete this instrument?')) {
				await updateInstrument({
					variables: {
						input: {
							_id: id,
							instrumentStatus: 'DELETE',
						},
					},
				});
				await getSellerInstrumentsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const updateInstrumentHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(`Are you sure to change to ${status} status?`)) {
				await updateInstrument({
					variables: {
						input: {
							_id: id,
							instrumentStatus: status,
						},
					},
				});
				await getSellerInstrumentsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	if (user?.memberType !== 'SELLER') {
		router.back();
	}

	const renderList = () => (
		<div id="my-property-page">
			<Stack className="main-title-box">
				<Stack className="right-box">
					<Typography className="main-title">My Instruments</Typography>
					<Typography className="sub-title">We are glad to see you again!</Typography>
				</Stack>
			</Stack>
			<Stack className="property-list-box">
				<Stack className="tab-name-box">
					<Typography
						onClick={() => changeStatusHandler(InstrumentStatus.ACTIVE)}
						className={searchFilter.search.instrumentStatus === 'ACTIVE' ? 'active-tab-name' : 'tab-name'}
					>
						On Sale
					</Typography>
					<Typography
						onClick={() => changeStatusHandler(InstrumentStatus.SOLD)}
						className={searchFilter.search.instrumentStatus === 'SOLD' ? 'active-tab-name' : 'tab-name'}
					>
						On Sold
					</Typography>
				</Stack>
				<Stack className="list-box">
					<Stack className="listing-title-box">
						<Typography className="title-text">Listing title</Typography>
						<Typography className="title-text">Date Published</Typography>
						<Typography className="title-text">Status</Typography>
						<Typography className="title-text">View</Typography>
						{searchFilter.search.instrumentStatus === 'ACTIVE' && (
							<Typography className="title-text">Action</Typography>
						)}
					</Stack>

					{sellerInstruments?.length === 0 ? (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Instrument found!</p>
						</div>
					) : (
						sellerInstruments.map((instrument: Instrument) => (
							<InstrumentCard
								key={instrument._id}
								instrument={instrument}
								deleteInstrumentHandler={deleteInstrumentHandler}
								updateInstrumentHandler={updateInstrumentHandler}
							/>
						))
					)}

					{sellerInstruments.length !== 0 && (
						<Stack className="pagination-config">
							<Stack className="pagination-box">
								<Pagination
									count={Math.ceil(total / searchFilter.limit)}
									page={searchFilter.page}
									shape="circular"
									color="primary"
									onChange={paginationHandler}
								/>
							</Stack>
							<Stack className="total-result">
								<Typography>{total} instrument available</Typography>
							</Stack>
						</Stack>
					)}
				</Stack>
			</Stack>
		</div>
	);

	if (device === 'mobile') {
		return renderList();
	} else {
		return renderList();
	}
};

MyInstruments.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			instrumentStatus: 'ACTIVE',
		},
	},
};

export default MyInstruments;
