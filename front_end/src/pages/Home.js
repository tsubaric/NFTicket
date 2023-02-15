import * as React from "react";
import "./Home.css";
const Home = () => {
  const propsData = {
    dashboard: {
      dashboard: {
        search: "search",
        events: "Events\n",
        myTickets: "My Tickets\n",
        connectWallet: "Connect Wallet",
        createEvent: "Create Event\n\n",
      },
    },
  };
  return (
    <div className="home"style={{ backgroundImage: "url(https://miro.medium.com/max/1400/0*hDAyhnOx767w5qma.jpg)" }}>
      <br />
      <br />

      <div className="nf-ticket">NFTicket</div>
      <br />
      <div className="createViewTxt">
      <p>Create - View - Transfer</p>
      </div>

      <div className="rectangle-4">
        <span className="website-description">
          <p>Welcome to NFTicket, your ultimate source for all your nft ticketing needs. We are a team of dedicated professionals who specialize in providing a comprehensive platform for the transfer, creation, and viewing of NFT tickets. Our platform makes it easy to manage your event tickets, and our simple, intuitive user interface ensures that you can quickly and easily manage your NFT tickets. </p>
        </span>
      </div>

     

    </div>
  );
};
export default Home;
