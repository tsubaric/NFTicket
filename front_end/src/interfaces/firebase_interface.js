import { ref, onValue, get, child } from "firebase/database";
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
  const eventRef = ref(database, "events/" + eventId);
  onValue(eventRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};
