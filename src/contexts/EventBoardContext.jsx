import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/apiUtils";

// app.post('/board/:boardId/add')
// api/board/${boardId}/add
// { swimId: 2, item: item }

// on drag end
// app.post('/board/:boardId/update')
// { swimId: 3, items: items }

// Events (Kanban)
// const eventData = [
//   {
//     swim_id: 1,
//     swim_title: "Open",
//     swim_order: 0,
//     items: [
//       {
//         item_id: 1,
//         item_order: 0,
//         item_title: "flowers",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//       {
//         item_id: 2,
//         item_title: "dress",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//     ],
//   },

//   {
//     swim_id: 2,
//     swim_title: "in-progress",
//     items: [
//       {
//         item_id: 3,
//         item_title: "cake tasting",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//     ],
//   },

//   {
//     swim_id: 3,
//     swim_title: "feedback",
//     items: [
//       {
//         item_id: 4,
//         item_title: "seating chart",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//       {
//         item_id: 5,
//         item_title: "invitations",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//     ],
//   },

//   {
//     swim_id: 4,
//     swim_title: "complete",
//     items: [
//       {
//         item_id: 6,
//         item_title: "venue",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//     ],
//   },
// ];

export const EventBoardContext = React.createContext();

const EventBoardContextProvider = ({ children }) => {
  const [data, setEventBoardData] = useState({ title: "", items: [] });
  // const { location } = useLocation();

  useEffect(() => {
    getSwimlanes();
  }, []);

  const getSwimlanes = () => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const eventId = params.get("eventId");

    apiRequest(`${process.env.REACT_APP_API_URL}/board/${eventId}`, { method: "GET" })
      .then((res) => res.json())
      .then((swimlaneData) => {
        // Sort the swimlane tasks based on the task.order key from the api
        const swimlanes = swimlaneData.items;
        const swimlanesSorted = swimlanes.map((swimlane) => {
          const tasks = swimlane.items;
          const tasksSorted = tasks.reduce((acc, curr) => {
            acc[curr.order] = curr;
            return acc;
          }, []);
          return { ...swimlane, items: tasksSorted };
        });

        setEventBoardData({ ...swimlaneData, items: swimlanesSorted });
      });
  };

  const updateSwimlanes = async (data) => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const eventId = params.get("eventId");

    try {
      await apiRequest(`${process.env.REACT_APP_API_URL}/board/${eventId}/update`, {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      // setEventBoardData(data);
      // getSwimlanes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EventBoardContext.Provider value={{ data, setEventBoardData, updateSwimlanes }}>
      {children}
    </EventBoardContext.Provider>
  );
};

export const withEventBoard = (Component) => (props) => (
  <EventBoardContextProvider>
    <Component {...props} />
  </EventBoardContextProvider>
);

export const useEventBoard = () => {
  const context = React.useContext(EventBoardContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
