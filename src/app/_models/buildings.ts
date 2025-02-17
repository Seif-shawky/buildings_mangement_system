export class School {
  constructor(
    public id: number,
    public name:string | null,
    public buildings: building[] = []
  ) {}
}

export class building {
  constructor(
    public id: number,
    public name:string | null,
    public schoolId: number, // Parent reference to School
    public floors: Floor[] = []
  ) {}
}

export class Floor {
  constructor(
    public id:number | null,
    public name:string | null,
    public buildingId: number // Parent reference to Building
  ) {}
}
