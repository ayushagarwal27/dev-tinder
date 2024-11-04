import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../utils/config.js";
import UserCard from "../../components/UserCard.jsx";

const Connections = () => {
  const [connections, setConnections] = useState(null);

  async function getConnections() {
    try {
      const res = await axios.get(
        config.urls.baseUrl + config.urls.user.connections,
        { withCredentials: true },
      );
      setConnections(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className={"flex flex-col items-center mt-10 w-full"}>
      <h1 className={"text-2xl font-semibold"}>
        {connections && connections.length === 0 && "No"} Connections
      </h1>
      <div className={"flex flex-wrap gap-4 my-5"}>
        {connections?.map((connection, idx) => (
          <div
            className="card card-side bg-purple-100 text-base-300 shadow-xl max-w-[350px]"
            key={idx}
          >
            <figure>
              <img
                src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Movie"
                className={"object-cover h-full"}
              />
            </figure>
            <div className="card-body">
              <p className={"text-nowrap"}>
                {connection.firstName} {connection.lastName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Connections;
