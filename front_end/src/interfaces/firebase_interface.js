import { ref, get, child } from "firebase/database";
import { database } from "../firebase";

export const getEvents = async (lastEventId) => {
  const cur_events = [];
  console.log("last event id: " + lastEventId);
  for (let i = 0; i < lastEventId; i++) {
    const dbRef = ref(database);
    get(child(dbRef, `events/${i}`)).then((snapshot) => {
      if (snapshot.exists()) {
        cur_events.push(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }
  return cur_events;
};

export const getEventInfo = async (eventId) => {
  const dbRef = ref(database);
  //will need a similar fix above
  //need to return the get otherwise the other file doesn't get the data from this function
  return get(child(dbRef, `events/${eventId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("data: ", data);
        return data;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
