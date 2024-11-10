import axios from "axios";
import { config } from "../../utils/config.js";
import { useEffect, useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState(null);

  async function getReceivedRequest() {
    try {
      const res = await axios.get(
        config.urls.baseUrl + config.urls.user.requestReceived,
        { withCredentials: true },
      );
      setRequests(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        config.urls.baseUrl + config.urls.request.review + `/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      const nextRequests = [...requests].filter((rq) => rq.connectionId !== id);
      setRequests(nextRequests);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReceivedRequest();
  }, []);

  return (
    <div className={"flex flex-col items-center mt-10 w-full"}>
      <h1 className={"text-2xl font-semibold"}>
        {requests && requests.length === 0 && "No"} Requests
      </h1>
      <div className={"flex flex-wrap gap-4 my-5"}>
        {requests?.map((request, idx) => (
          <div
            className="card bg-purple-100 text-center text-base-300 shadow-xl max-w-[350px]"
            key={idx}
          >
            <figure>
              <img
                src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Movie"
                className={"object-cover w-full  h-[250px] object-top"}
              />
            </figure>
            <div className="card-body">
              <p className={"text-nowrap font-semibold"}>
                {request.user.firstName} {request.user.lastName}
              </p>{" "}
              <p className={"text-nowrap"}>
                {request.user.age} ({request.user.gender})
              </p>
              <p className={""}>{request.user.about}</p>
              <div className={"flex gap-4 mx-auto"}>
                <button
                  className={"btn btn-warning"}
                  onClick={() =>
                    reviewRequest("rejected", request.connectionId)
                  }
                >
                  Reject
                </button>
                <button
                  className={"btn btn-success"}
                  onClick={() =>
                    reviewRequest("accepted", request.connectionId)
                  }
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Requests;
