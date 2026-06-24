import React from 'react';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import { Instrument } from '../../../types/instrument/instrument';
import { REACT_APP_API_URL } from '../../../config';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { InstrumentStatus } from '../../../enums/instrument.enum';

interface Data {
	id: string;
	title: string;
	price: string;
	seller: string;
	location: string;
	type: string;
	status: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{ id: 'id', numeric: true, disablePadding: false, label: 'MB ID' },
	{ id: 'title', numeric: true, disablePadding: false, label: 'TITLE' },
	{ id: 'price', numeric: false, disablePadding: false, label: 'PRICE' },
	{ id: 'seller', numeric: false, disablePadding: false, label: 'SELLER' },
	{ id: 'location', numeric: false, disablePadding: false, label: 'LOCATION' },
	{ id: 'type', numeric: false, disablePadding: false, label: 'TYPE' },
	{ id: 'status', numeric: false, disablePadding: false, label: 'STATUS' },
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface InstrumentPanelListType {
	instruments: Instrument[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateInstrumentHandler: any;
	removeInstrumentHandler: any;
}

export const InstrumentPanelList = (props: InstrumentPanelListType) => {
	const {
		instruments,
		anchorEl,
		menuIconClickHandler,
		menuIconCloseHandler,
		updateInstrumentHandler,
		removeInstrumentHandler,
	} = props;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{instruments.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}

						{instruments.length !== 0 &&
							instruments.map((instrument: Instrument, index: number) => {
								const instrumentImage = `${REACT_APP_API_URL}/${instrument?.instrumentImages[0]}`;

								return (
									<TableRow hover key={instrument?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="left">{instrument._id}</TableCell>
										<TableCell align="left" className={'name'}>
											{instrument.instrumentStatus === InstrumentStatus.ACTIVE ? (
												<Stack direction={'row'}>
													<Link href={`/equipment/detail?id=${instrument?._id}`}>
														<div>
															<Avatar alt="Instrument" src={instrumentImage} sx={{ ml: '2px', mr: '10px' }} />
														</div>
													</Link>
													<Link href={`/equipment/detail?id=${instrument?._id}`}>
														<div>{instrument.instrumentTitle}</div>
													</Link>
												</Stack>
											) : (
												<Stack direction={'row'}>
													<div>
														<Avatar alt="Instrument" src={instrumentImage} sx={{ ml: '2px', mr: '10px' }} />
													</div>
													<div style={{ marginTop: '10px' }}>{instrument.instrumentTitle}</div>
												</Stack>
											)}
										</TableCell>
										<TableCell align="center">{instrument.instrumentPrice}</TableCell>
										<TableCell align="center">{instrument.memberData?.memberNick}</TableCell>
										<TableCell align="center">{instrument.instrumentLocation}</TableCell>
										<TableCell align="center">{instrument.instrumentType}</TableCell>
										<TableCell align="center">
											{instrument.instrumentStatus === InstrumentStatus.DELETE && (
												<Button
													variant="outlined"
													sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
													onClick={() => removeInstrumentHandler(instrument._id)}
												>
													<DeleteIcon fontSize="small" />
												</Button>
											)}

											{instrument.instrumentStatus === InstrumentStatus.SOLD && (
												<Button className={'badge warning'}>{instrument.instrumentStatus}</Button>
											)}

											{instrument.instrumentStatus === InstrumentStatus.ACTIVE && (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
														{instrument.instrumentStatus}
													</Button>

													<Menu
														className={'menu-modal'}
														MenuListProps={{ 'aria-labelledby': 'fade-button' }}
														anchorEl={anchorEl[index]}
														open={Boolean(anchorEl[index])}
														onClose={menuIconCloseHandler}
														TransitionComponent={Fade}
														sx={{ p: 1 }}
													>
														{Object.values(InstrumentStatus)
															.filter((ele) => ele !== instrument.instrumentStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() => updateInstrumentHandler({ _id: instrument._id, instrumentStatus: status })}
																	key={status}
																>
																	<Typography variant={'subtitle1'} component={'span'}>
																		{status}
																	</Typography>
																</MenuItem>
															))}
													</Menu>
												</>
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
