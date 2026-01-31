export interface EventLocation {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface InterfaceEventInput {
  title: string;
  description: string;
  start: string;
  end: string;
  location: EventLocation;
}