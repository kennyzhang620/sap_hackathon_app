class SAP_Event {
    // delivery means format (In-Person or Virtual)
    // location is the address of the event if it is in person, or the invitation link if online.
    // All items in this class must be filled in. Null or tentative parameters are not permitted.

    constructor(ID, delivery, locationS, date, time24H) {
        if (ID != null && delivery != null && locationS != null && date != null && time24H != null) {
            this.EventID = ID;
            this.deliveryType = delivery;
            this.locationT = locationS;
            this.dateTime = new Date(date + ' ' + time24H);
        }
    }

    eventID() {
        return this.EventID;
    }

    type() {
        return this.deliveryType;
    }

    location_Str() {
        return this.locationT;
    }

    get_date_time() {
        return this.dateTime;
    }


}


