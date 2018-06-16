import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

	// Date Format
	public readonly DATE_FORMAT_DD_MM_YYYY = 'DD-MM-YYYY';
	// Storage
	public readonly USER_PROFILE: String = 'user-profile';
	public readonly TOKEN: String = 'token';
	public readonly ROLE_ID: String = 'role-id';

	// Messages
	public readonly WEBSERVICE_INTERNET_NOT_CONNNECTED: String = 'Unable to perform request. Check if the device is connect to internet';

	// Others
	public readonly IMAGE_PLACEHOLDER: String = 'assets/avatar-placeholder.png';

	// Roles
	public readonly ROLE_ADMIN: Number = 1;
	public readonly ROLE_VENDOR: Number = 2;
	public readonly ROLE_USER: Number = 3;

	// Tab Item id
	public readonly TAB_MORE: Number = 1;
	public readonly TAB_OFFERS: Number = 2;
	public readonly TAB_VENDORS: Number = 3;
}
