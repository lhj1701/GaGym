export interface GymTrainerItem{
  id:number;
  trainerName : string;
  trainerIntro : string;
  trainerPhotoUrl : string;
  pt1DayPrice : string;
  pt3DayPrice : string;
  pt7DayPrice : string;
  yoga1DayPrice : string;
  yoga3DayPrice : String;
  yoga7DayPrice : string;
  pilates1DayPrice : string;
  pilates3DayPrice : string;
  pilates7DayPrice : string;
}

export interface GymDetailItem{
      gymName: string;
      thumbnailUrl:  string;
      gymAddress: string;
      gymCoNum: number;
      gymTime :  string;
      trainerName :  string;
      trainerPhotoUrl :  string;
      trainerIntro :  string;
      trainerSpecial: string;
      // gymPrice : gymPrice[],
      gymPhotoUrl :  string;
      // gymService : gymserviceList[],
      gymNotice :  string;
    }

