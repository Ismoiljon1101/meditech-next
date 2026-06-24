import { InstrumentBrand, InstrumentLocation, InstrumentStatus, InstrumentType } from '../../enums/instrument.enum';
import { Direction } from '../../enums/common.enum';

export interface InstrumentInput {
	instrumentType: InstrumentType;
	instrumentLocation: InstrumentLocation;
	instrumentAddress: string;
	instrumentTitle: string;
	instrumentPrice: number;
	instrumentSize: number;
	instrumentQuantity: number;
	instrumentCondition: number;
	instrumentImages: string[];
	instrumentDesc?: string;
	instrumentBarter?: boolean;
	instrumentRent?: boolean;
	instrumentBrand?: InstrumentBrand;
	memberId?: string;
	manufacturedAt?: Date;
}

interface IISearch {
	memberId?: string;
	locationList?: InstrumentLocation[];
	typeList?: InstrumentType[];
	brandList?: InstrumentBrand[];
	conditionList?: Number[];
	quantityList?: Number[];
	options?: string[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	sizeRange?: Range;
	text?: string;
}

export interface InstrumentsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: IISearch;
}

interface SIISearch {
	instrumentStatus?: InstrumentStatus;
}

export interface SellerInstrumentsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: SIISearch;
}

interface ALIISearch {
	instrumentStatus?: InstrumentStatus;
	instrumentLocationList?: InstrumentLocation[];
}

export interface AllInstrumentsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALIISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
