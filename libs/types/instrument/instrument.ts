import { InstrumentBrand, InstrumentLocation, InstrumentStatus, InstrumentType } from '../../enums/instrument.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Instrument {
	_id: string;
	instrumentType: InstrumentType;
	instrumentStatus: InstrumentStatus;
	instrumentLocation: InstrumentLocation;
	instrumentAddress: string;
	instrumentTitle: string;
	instrumentPrice: number;
	instrumentSize: number;
	instrumentQuantity: number;
	instrumentCondition: number;
	instrumentViews: number;
	instrumentLikes: number;
	instrumentComments: number;
	instrumentRank: number;
	instrumentImages: string[];
	instrumentDesc?: string;
	instrumentBarter: boolean;
	instrumentRent: boolean;
	instrumentBrand?: InstrumentBrand;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	manufacturedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Instruments {
	list: Instrument[];
	metaCounter: TotalCounter[];
}
