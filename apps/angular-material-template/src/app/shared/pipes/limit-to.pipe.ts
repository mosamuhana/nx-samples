import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'limitTo',
})
export class LimitToPipe implements PipeTransform {
	transform(value: string | null | undefined, limitTo: string): string {
		if (value == null) {
			return '';
		}

		const limit = limitTo ? parseInt(limitTo, 10) : 10;
		const trail = '..';

		return value.length > limit ? value.substring(0, limit) + trail : value;
	}
}
