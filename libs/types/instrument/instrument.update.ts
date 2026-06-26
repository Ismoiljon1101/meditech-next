import { InstrumentBrand, InstrumentLocation, InstrumentStatus, InstrumentType } from '../../enums/instrument.enum';

export interface InstrumentUpdate {
	_id: string;
	instrumentType?: InstrumentType;
	instrumentStatus?: InstrumentStatus;
	instrumentLocation?: InstrumentLocation;
	instrumentAddress?: string;
	instrumentTitle?: string;
	instrumentPrice?: number;
	instrumentSize?: number;
	instrumentQuantity?: number;
	instrumentCondition?: number;
	instrumentImages?: string[];
	instrumentDesc?: string;
	instrumentBarter?: boolean;
	instrumentRent?: boolean;
	instrumentBrand?: InstrumentBrand;
	soldAt?: Date;
	deletedAt?: Date;
	manufacturedAt?: Date;
}
