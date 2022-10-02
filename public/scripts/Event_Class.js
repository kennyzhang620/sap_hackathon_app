class SAP_Event {
    // delivery means format (In-Person or Virtual)
    // location is the address of the event if it is in person, or the invitation link if online.
    // All items in this class must be filled in. Null or tentative parameters are not permitted.

    constructor(ID, type, city, country, state, date, time24H) {
        if (ID != null && type != null && city != null && country != null && state != null && date != null && time24H != null) {
            this.EventID = ID;
            this.type = type;
            this.city = city;
			this.country = country;
			this.state = state;
            this.dateTime = new Date(date + ' ' + time24H);
        }
    }

    eventID() {
        return this.EventID;
    }

    e_type() {
        return this.type;
    }

    location_city() {
        return this.city;
    }
	
    location_country() {
        return this.country;
    }
	
    location_state() {
        return this.state;
    }

    get_date_time() {
        return this.dateTime;
    }


}


