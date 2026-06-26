import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { InstrumentLocation, InstrumentType } from '../../enums/instrument.enum';
import { InstrumentsInquiry } from '../../types/instrument/instrument.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { instrumentSize } from '../../config';
import RefreshIcon from '@mui/icons-material/Refresh';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: InstrumentsInquiry;
	setSearchFilter: any;
	initialInput: InstrumentsInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [instrumentLocations] = useState<InstrumentLocation[]>(Object.values(InstrumentLocation));
	const [instrumentTypes] = useState<InstrumentType[]>(Object.values(InstrumentType));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router.push(
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				{ scroll: false },
			);
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router.push(
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				{ scroll: false },
			);
		}

		if (searchFilter?.search?.conditionList?.length == 0) {
			delete searchFilter.search.conditionList;
			router.push(
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				{ scroll: false },
			);
		}

		if (searchFilter?.search?.quantityList?.length == 0) {
			delete searchFilter.search.quantityList;
			router.push(
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				{ scroll: false },
			);
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router.push(
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
				{ scroll: false },
			);
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const locationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}
			} catch (err: any) {
				console.log('ERROR, locationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const typeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}
			} catch (err: any) {
				console.log('ERROR, typeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const conditionSelectHandler = useCallback(
		async (number: Number) => {
			try {
				if (number != 0) {
					if (searchFilter?.search?.conditionList?.includes(number)) {
						await router.push(
							`/equipment?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									conditionList: searchFilter?.search?.conditionList?.filter((item: Number) => item !== number),
								},
							})}`,
							`/equipment?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									conditionList: searchFilter?.search?.conditionList?.filter((item: Number) => item !== number),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/equipment?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, conditionList: [...(searchFilter?.search?.conditionList || []), number] },
							})}`,
							`/equipment?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, conditionList: [...(searchFilter?.search?.conditionList || []), number] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.conditionList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
						`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
						{ scroll: false },
					);
				}
			} catch (err: any) {
				console.log('ERROR, conditionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const quantitySelectHandler = useCallback(
		async (number: Number) => {
			try {
				if (number != 0) {
					if (searchFilter?.search?.quantityList?.includes(number)) {
						await router.push(
							`/equipment?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									quantityList: searchFilter?.search?.quantityList?.filter((item: Number) => item !== number),
								},
							})}`,
							`/equipment?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									quantityList: searchFilter?.search?.quantityList?.filter((item: Number) => item !== number),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/equipment?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, quantityList: [...(searchFilter?.search?.quantityList || []), number] },
							})}`,
							`/equipment?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, quantityList: [...(searchFilter?.search?.quantityList || []), number] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.quantityList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
						`/equipment?input=${JSON.stringify({ ...searchFilter, search: { ...searchFilter.search } })}`,
						{ scroll: false },
					);
				}
			} catch (err: any) {
				console.log('ERROR, quantitySelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const optionSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.options?.includes(value)) {
					await router.push(
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						`/equipment?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}
			} catch (err: any) {
				console.log('ERROR, optionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const sizeHandler = useCallback(
		async (e: any, type: string) => {
			const value = e.target.value;
			if (type == 'start') {
				await router.push(
					`/equipment?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, sizeRange: { ...searchFilter.search.sizeRange, start: value } },
					})}`,
					`/equipment?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, sizeRange: { ...searchFilter.search.sizeRange, start: value } },
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/equipment?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, sizeRange: { ...searchFilter.search.sizeRange, end: value } },
					})}`,
					`/equipment?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, sizeRange: { ...searchFilter.search.sizeRange, end: value } },
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const priceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/equipment?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 } },
					})}`,
					`/equipment?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 } },
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/equipment?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 } },
					})}`,
					`/equipment?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 } },
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/equipment?input=${JSON.stringify(initialInput)}`,
				`/equipment?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Equipment</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({ ...searchFilter, search: { ...searchFilter.search, text: searchText } });
								}
							}}
							endAdornment={
								<CancelRoundedIcon
									onClick={() => {
										setSearchText('');
										setSearchFilter({ ...searchFilter, search: { ...searchFilter.search, text: '' } });
									}}
								/>
							}
						/>
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Location
					</p>
					<Stack className={'property-location'}>
						{instrumentLocations.map((location: string) => (
							<Stack className={'input-box'} key={location}>
								<Checkbox
									id={location}
									className="property-checkbox"
									color="default"
									size="small"
									value={location}
									checked={(searchFilter?.search?.locationList || []).includes(location as InstrumentLocation)}
									onChange={locationSelectHandler}
								/>
								<label htmlFor={location} style={{ cursor: 'pointer' }}>
									<Typography className="property-type">{location}</Typography>
								</label>
							</Stack>
						))}
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Equipment Type</Typography>
					<div className="type">
						{instrumentTypes.map((type: string) => (
							<Stack className={'input-box'} key={type}>
								<Checkbox
									id={type}
									className="property-checkbox"
									color="default"
									size="small"
									value={type}
									onChange={typeSelectHandler}
									checked={(searchFilter?.search?.typeList || []).includes(type as InstrumentType)}
								/>
								<label style={{ cursor: 'pointer' }}>
									<Typography className="property_type">{type}</Typography>
								</label>
							</Stack>
						))}
					</div>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Condition (1–5)</Typography>
					<Stack direction="row" className="button-group" sx={{ flexDirection: 'row !important', display: 'flex !important' }}>
						<Button
							sx={{ borderRadius: '12px 0 0 12px', border: !searchFilter?.search?.conditionList ? '2px solid #181A20' : '1px solid #b9b9b9' }}
							onClick={() => conditionSelectHandler(0)}
						>Any</Button>
						{[1, 2, 3, 4].map((n) => (
							<Button
								key={n}
								sx={{
									borderRadius: 0,
									border: searchFilter?.search?.conditionList?.includes(n) ? '2px solid #181A20' : '1px solid #b9b9b9',
									borderLeft: searchFilter?.search?.conditionList?.includes(n) ? undefined : 'none',
								}}
								onClick={() => conditionSelectHandler(n)}
							>{n}</Button>
						))}
						<Button
							sx={{ borderRadius: '0 12px 12px 0', border: searchFilter?.search?.conditionList?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9' }}
							onClick={() => conditionSelectHandler(5)}
						>5</Button>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Quantity</Typography>
					<Stack className="button-group" sx={{ flexDirection: 'row !important', display: 'flex !important' }}>
						<Button
							sx={{ borderRadius: '12px 0 0 12px', border: !searchFilter?.search?.quantityList ? '2px solid #181A20' : '1px solid #b9b9b9' }}
							onClick={() => quantitySelectHandler(0)}
						>Any</Button>
						{[1, 2, 3, 4].map((n) => (
							<Button
								key={n}
								sx={{
									borderRadius: 0,
									border: searchFilter?.search?.quantityList?.includes(n) ? '2px solid #181A20' : '1px solid #b9b9b9',
									borderLeft: searchFilter?.search?.quantityList?.includes(n) ? undefined : 'none',
								}}
								onClick={() => quantitySelectHandler(n)}
							>{n}</Button>
						))}
						<Button
							sx={{ borderRadius: '0 12px 12px 0', border: searchFilter?.search?.quantityList?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9' }}
							onClick={() => quantitySelectHandler(5)}
						>5+</Button>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Options</Typography>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Lease'}
							className="property-checkbox"
							color="default"
							size="small"
							value={'instrumentRent'}
							checked={(searchFilter?.search?.options || []).includes('instrumentRent')}
							onChange={optionSelectHandler}
						/>
						<label htmlFor={'Lease'} style={{ cursor: 'pointer' }}>
							<Typography className="property-type">Available for Lease</Typography>
						</label>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Size (m³)</Typography>
					<Stack className="square-year-input" sx={{ flexDirection: 'row !important', display: 'flex !important' }}>
						<FormControl>
							<InputLabel id="size-min-label">Min</InputLabel>
							<Select
								labelId="size-min-label"
								value={searchFilter?.search?.sizeRange?.start ?? 0}
								label="Min"
								onChange={(e: any) => sizeHandler(e, 'start')}
								MenuProps={MenuProps}
							>
								{instrumentSize.map((size: number) => (
									<MenuItem value={size} disabled={(searchFilter?.search?.sizeRange?.end || 0) < size} key={size}>{size}</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl>
							<InputLabel id="size-max-label">Max</InputLabel>
							<Select
								labelId="size-max-label"
								value={searchFilter?.search?.sizeRange?.end ?? 500}
								label="Max"
								onChange={(e: any) => sizeHandler(e, 'end')}
								MenuProps={MenuProps}
							>
								{instrumentSize.map((size: number) => (
									<MenuItem value={size} disabled={(searchFilter?.search?.sizeRange?.start || 0) > size} key={size}>{size}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="square-year-input" sx={{ flexDirection: 'row !important', display: 'flex !important' }}>
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => { if (e.target.value >= 0) priceHandler(e.target.value, 'start'); }}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => { if (e.target.value >= 0) priceHandler(e.target.value, 'end'); }}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Equipment</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({ ...searchFilter, search: { ...searchFilter.search, text: searchText } });
								}
							}}
							endAdornment={
								<CancelRoundedIcon
									onClick={() => {
										setSearchText('');
										setSearchFilter({ ...searchFilter, search: { ...searchFilter.search, text: '' } });
									}}
								/>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Location
					</p>
					<Stack
						className={'property-location'}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => { if (!searchFilter?.search?.locationList) setShowMore(false); }}
					>
						{instrumentLocations.map((location: string) => (
							<Stack className={'input-box'} key={location}>
								<Checkbox
									id={location}
									className="property-checkbox"
									color="default"
									size="small"
									value={location}
									checked={(searchFilter?.search?.locationList || []).includes(location as InstrumentLocation)}
									onChange={locationSelectHandler}
								/>
								<label htmlFor={location} style={{ cursor: 'pointer' }}>
									<Typography className="property-type">{location}</Typography>
								</label>
							</Stack>
						))}
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Equipment Type</Typography>
					{instrumentTypes.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="property-checkbox"
								color="default"
								size="small"
								value={type}
								onChange={typeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as InstrumentType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="property_type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Condition (1–5)</Typography>
					<Stack className="button-group">
						<Button
							sx={{ borderRadius: '12px 0 0 12px', border: !searchFilter?.search?.conditionList ? '2px solid #181A20' : '1px solid #b9b9b9' }}
							onClick={() => conditionSelectHandler(0)}
						>Any</Button>
						{[1, 2, 3, 4].map((n) => (
							<Button
								key={n}
								sx={{
									borderRadius: 0,
									border: searchFilter?.search?.conditionList?.includes(n) ? '2px solid #181A20' : '1px solid #b9b9b9',
									borderLeft: searchFilter?.search?.conditionList?.includes(n) ? undefined : 'none',
								}}
								onClick={() => conditionSelectHandler(n)}
							>{n}</Button>
						))}
						<Button
							sx={{ borderRadius: '0 12px 12px 0', border: searchFilter?.search?.conditionList?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9' }}
							onClick={() => conditionSelectHandler(5)}
						>5</Button>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Quantity</Typography>
					<Stack className="button-group">
						<Button
							sx={{ borderRadius: '12px 0 0 12px', border: !searchFilter?.search?.quantityList ? '2px solid #181A20' : '1px solid #b9b9b9' }}
							onClick={() => quantitySelectHandler(0)}
						>Any</Button>
						{[1, 2, 3, 4].map((n) => (
							<Button
								key={n}
								sx={{
									borderRadius: 0,
									border: searchFilter?.search?.quantityList?.includes(n) ? '2px solid #181A20' : '1px solid #b9b9b9',
									borderLeft: searchFilter?.search?.quantityList?.includes(n) ? undefined : 'none',
								}}
								onClick={() => quantitySelectHandler(n)}
							>{n}</Button>
						))}
						<Button
							sx={{ borderRadius: '0 12px 12px 0', border: searchFilter?.search?.quantityList?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9' }}
							onClick={() => quantitySelectHandler(5)}
						>5+</Button>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Options</Typography>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Lease'}
							className="property-checkbox"
							color="default"
							size="small"
							value={'instrumentRent'}
							checked={(searchFilter?.search?.options || []).includes('instrumentRent')}
							onChange={optionSelectHandler}
						/>
						<label htmlFor={'Lease'} style={{ cursor: 'pointer' }}>
							<Typography className="property-type">Available for Lease</Typography>
						</label>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Size (m³)</Typography>
					<Stack className="square-year-input">
						<FormControl>
							<InputLabel id="size-min-label">Min</InputLabel>
							<Select
								labelId="size-min-label"
								value={searchFilter?.search?.sizeRange?.start ?? 0}
								label="Min"
								onChange={(e: any) => sizeHandler(e, 'start')}
								MenuProps={MenuProps}
							>
								{instrumentSize.map((size: number) => (
									<MenuItem value={size} disabled={(searchFilter?.search?.sizeRange?.end || 0) < size} key={size}>{size}</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl>
							<InputLabel id="size-max-label">Max</InputLabel>
							<Select
								labelId="size-max-label"
								value={searchFilter?.search?.sizeRange?.end ?? 500}
								label="Max"
								onChange={(e: any) => sizeHandler(e, 'end')}
								MenuProps={MenuProps}
							>
								{instrumentSize.map((size: number) => (
									<MenuItem value={size} disabled={(searchFilter?.search?.sizeRange?.start || 0) > size} key={size}>{size}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => { if (e.target.value >= 0) priceHandler(e.target.value, 'start'); }}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => { if (e.target.value >= 0) priceHandler(e.target.value, 'end'); }}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
