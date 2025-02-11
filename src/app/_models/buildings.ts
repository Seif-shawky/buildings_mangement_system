export class Floor {
    constructor(public id: number, public floorName: string, public buildingId: number) {}
}

export class building {
    constructor(
        public id: number,
        public building: string,
        public school: string,
        public selected: boolean,
        public floors: Floor[] = [] // Initialize with an empty array
    ) {}
}
