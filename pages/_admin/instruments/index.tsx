import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import TablePagination from '@mui/material/TablePagination';
import { InstrumentPanelList } from '../../../libs/components/admin/instruments/InstrumentList';
import { AllInstrumentsInquiry } from '../../../libs/types/instrument/instrument.input';
import { Instrument } from '../../../libs/types/instrument/instrument';
import { InstrumentLocation, InstrumentStatus } from '../../../libs/enums/instrument.enum';
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert';
import { InstrumentUpdate } from '../../../libs/types/instrument/instrument.update';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_INSTRUMENT_BY_ADMIN, UPDATE_INSTRUMENT_BY_ADMIN } from '../../../apollo/admin/mutation';
import { GET_ALL_INSTRUMENTS_BY_ADMIN } from '../../../apollo/admin/query';
import { T } from '../../../libs/types/common';

const AdminInstruments: NextPage = ({ initialInquiry, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [instrumentsInquiry, setInstrumentsInquiry] = useState<AllInstrumentsInquiry>(initialInquiry);
	const [instruments, setInstruments] = useState<Instrument[]>([]);
	const [instrumentsTotal, setInstrumentsTotal] = useState<number>(0);
	const [value, setValue] = useState(
		instrumentsInquiry?.search?.instrumentStatus ? instrumentsInquiry?.search?.instrumentStatus : 'ALL',
	);
	const [searchType, setSearchType] = useState('ALL');

	/** APOLLO REQUESTS **/
	const [updateInstrumentByAdmin] = useMutation(UPDATE_INSTRUMENT_BY_ADMIN);
	const [removeInstrumentByAdmin] = useMutation(REMOVE_INSTRUMENT_BY_ADMIN);

	const {
		loading: getAllInstrumentsByAdminLoading,
		data: getAllInstrumentsByAdminData,
		error: getAllInstrumentsByAdminError,
		refetch: getAllInstrumentsByAdminRefetch,
	} = useQuery(GET_ALL_INSTRUMENTS_BY_ADMIN, {
		fetchPolicy: 'network-only',
		variables: { input: instrumentsInquiry },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setInstruments(data?.getAllInstrumentsByAdmin?.list);
			setInstrumentsTotal(data?.getAllInstrumentsByAdmin?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		getAllInstrumentsByAdminRefetch({ input: instrumentsInquiry }).then();
	}, [instrumentsInquiry]);

	/** HANDLERS **/
	const changePageHandler = async (event: unknown, newPage: number) => {
		instrumentsInquiry.page = newPage + 1;
		await getAllInstrumentsByAdminRefetch({ input: instrumentsInquiry });
		setInstrumentsInquiry({ ...instrumentsInquiry });
	};

	const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		instrumentsInquiry.limit = parseInt(event.target.value, 10);
		instrumentsInquiry.page = 1;
		await getAllInstrumentsByAdminRefetch({ input: instrumentsInquiry });
		setInstrumentsInquiry({ ...instrumentsInquiry });
	};

	const menuIconClickHandler = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const menuIconCloseHandler = () => {
		setAnchorEl([]);
	};

	const tabChangeHandler = async (event: any, newValue: string) => {
		setValue(newValue);
		setInstrumentsInquiry({ ...instrumentsInquiry, page: 1, sort: 'createdAt' });

		switch (newValue) {
			case 'ACTIVE':
				setInstrumentsInquiry({ ...instrumentsInquiry, search: { instrumentStatus: InstrumentStatus.ACTIVE } });
				break;
			case 'SOLD':
				setInstrumentsInquiry({ ...instrumentsInquiry, search: { instrumentStatus: InstrumentStatus.SOLD } });
				break;
			case 'DELETE':
				setInstrumentsInquiry({ ...instrumentsInquiry, search: { instrumentStatus: InstrumentStatus.DELETE } });
				break;
			default:
				delete instrumentsInquiry?.search?.instrumentStatus;
				setInstrumentsInquiry({ ...instrumentsInquiry });
				break;
		}
	};

	const removeInstrumentHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to remove?')) {
				await removeInstrumentByAdmin({ variables: { input: id } });
				await getAllInstrumentsByAdminRefetch({ input: instrumentsInquiry });
			}
			menuIconCloseHandler();
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const searchTypeHandler = async (newValue: string) => {
		try {
			setSearchType(newValue);
			if (newValue !== 'ALL') {
				setInstrumentsInquiry({
					...instrumentsInquiry,
					page: 1,
					sort: 'createdAt',
					search: {
						...instrumentsInquiry.search,
						instrumentLocationList: [newValue as InstrumentLocation],
					},
				});
			} else {
				delete instrumentsInquiry?.search?.instrumentLocationList;
				setInstrumentsInquiry({ ...instrumentsInquiry });
			}
		} catch (err: any) {
			console.log('searchTypeHandler: ', err.message);
		}
	};

	const updateInstrumentHandler = async (updateData: InstrumentUpdate) => {
		try {
			await updateInstrumentByAdmin({ variables: { input: updateData } });
			menuIconCloseHandler();
			await getAllInstrumentsByAdminRefetch({ input: instrumentsInquiry });
		} catch (err: any) {
			menuIconCloseHandler();
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Box component={'div'} className={'content'}>
			<Typography variant={'h2'} className={'tit'} sx={{ mb: '24px' }}>
				Instrument List
			</Typography>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									onClick={(e: any) => tabChangeHandler(e, 'ALL')}
									value="ALL"
									className={value === 'ALL' ? 'li on' : 'li'}
								>
									All
								</ListItem>
								<ListItem
									onClick={(e: any) => tabChangeHandler(e, 'ACTIVE')}
									value="ACTIVE"
									className={value === 'ACTIVE' ? 'li on' : 'li'}
								>
									Active
								</ListItem>
								<ListItem
									onClick={(e: any) => tabChangeHandler(e, 'SOLD')}
									value="SOLD"
									className={value === 'SOLD' ? 'li on' : 'li'}
								>
									Sold
								</ListItem>
								<ListItem
									onClick={(e: any) => tabChangeHandler(e, 'DELETE')}
									value="DELETE"
									className={value === 'DELETE' ? 'li on' : 'li'}
								>
									Delete
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<Select sx={{ width: '160px', mr: '20px' }} value={searchType}>
									<MenuItem value={'ALL'} onClick={() => searchTypeHandler('ALL')}>
										ALL
									</MenuItem>
									{Object.values(InstrumentLocation).map((location: string) => (
										<MenuItem value={location} onClick={() => searchTypeHandler(location)} key={location}>
											{location}
										</MenuItem>
									))}
								</Select>
							</Stack>
							<Divider />
						</Box>
						<InstrumentPanelList
							instruments={instruments}
							anchorEl={anchorEl}
							menuIconClickHandler={menuIconClickHandler}
							menuIconCloseHandler={menuIconCloseHandler}
							updateInstrumentHandler={updateInstrumentHandler}
							removeInstrumentHandler={removeInstrumentHandler}
						/>

						<TablePagination
							rowsPerPageOptions={[10, 20, 40, 60]}
							component="div"
							count={instrumentsTotal}
							rowsPerPage={instrumentsInquiry?.limit}
							page={instrumentsInquiry?.page - 1}
							onPageChange={changePageHandler}
							onRowsPerPageChange={changeRowsPerPageHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

AdminInstruments.defaultProps = {
	initialInquiry: {
		page: 1,
		limit: 10,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default withAdminLayout(AdminInstruments);
