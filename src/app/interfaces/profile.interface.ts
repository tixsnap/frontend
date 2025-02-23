export interface IProfile {
  id?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string | undefined;
  createdAt?: string;
  updatedAt?: string;
  user : {
    point: {
      totalPoint?: string
      isExpired: boolean
    }
  }
}
