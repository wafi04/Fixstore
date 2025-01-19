export type ROLE = "ADMIN" | "USER";
export interface UserData {
  id: string;
  email: string;
  name: string;
  role: ROLE;
  image: string | null;
}

export interface ProfileData {
  id: string;
  userId: string;
  gender: "LAKILAKI" | "PEREMPUAN";
  birthDate: string;
  age: 20;
  birthPlace: string;
  phoneNumber: string;
  user: UserData;
}

export interface AddressData {
  city: string;
  country: string;
  id: string;
  isDefault: boolean;
  postalCode: string;
  state: string;
  street: string;
  userId: string;
}
