import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AppAgeValidationPipe implements PipeTransform {
  transform(age: any, metadata: ArgumentMetadata) {
    if (age < 0 || age > 150) {
      throw new Error('Age error!');
    }
    const ageData = {
      0: 'child',
      13: 'teenager',
      18: 'adult',
      60: 'old',
    };
    let prevIndex = 'child';
    for (const ageIndex in ageData) {
      const prevLabel = ageData[prevIndex];
      if (age < ageIndex) {
        return prevLabel;
      }
      prevIndex = ageIndex;
    }
    return 'old';
  }
}
