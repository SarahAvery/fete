import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import TaskForm from "./TaskForm";
import SwimlaneItem from "./SwimlaneItem";
import Swimlane from "./Swimlane";
import Modal from "../Modal";
import { Link } from "react-router-dom";


import "./EventBoard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useEventBoard, withEventBoard } from "../../contexts/EventBoardContext";
// import { RouteList } from "../Routes";

const EventBoard = () => {
  // Form
  const [form, setForm] = useState({ visible: false, column: null });
  const hasBeenDragged = useRef(false);

  const openForm = (columnId) => {
    setForm({ visible: true, column: columnId });
  };

  // Initial data
  const { data, updateColumns, setEventBoardData } = useEventBoard();
  
  const params = new URLSearchParams(document.location.search.substring(1));
  const eventId = params.get("eventId");

  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  // clean up dragStart
  const handleDragEnd = React.useCallback((evt) => {
    console.log("ending drag");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  }, []);

  useEffect(() => {
    if (!dragging && hasBeenDragged.current) {
      updateColumns(formatDataForApiUpdate(data.items));
    }
  }, [dragging, data.items, updateColumns]);

  const handleDragStart = React.useCallback(
    (e, params) => {
      console.log("drag starting...", params);
      dragItem.current = params;

      dragNode.current = e.target;
      dragNode.current.addEventListener("dragend", handleDragEnd);
      setTimeout(() => {
        setDragging(true);
        hasBeenDragged.current = true;
      }, 0);
    },
    [handleDragEnd, hasBeenDragged]
  );

  const formatDataForApiUpdate = (columns) => {
    return columns.map((column) => {
      const items = column.items.map((task, index) => {
        if (task) {
          task.columnId = column.id;
          task.order = index;
        }
        return task;
      });
      column.items = items;
      return column;
    });
  };

  const handleDragEnter = (e, params) => {
    console.log("entering drag..", params);
    const currItem = dragItem.current;

    if (e.target !== dragNode.current) {
      console.log("target is not the same");
      setEventBoardData((oldList) => {
        // deep copy
        let newList = JSON.parse(JSON.stringify(oldList.items));

        newList[params.columnIndex].items.splice(
          params.itemIndex,
          0,
          newList[currItem.columnIndex].items.splice(currItem.itemIndex, 1)[0]
        );
        dragItem.current = params;
        return { ...oldList, items: newList };
      });
    }
  };

  const getStyles = (params) => {
    const currItem = dragItem.current;
    if (currItem.columnIndex === params.columnIndex && currItem.itemIndex === params.itemIndex) {
      return "item current";
    }
    return "item";
  };

  return (
    <Fragment>
      <div className="eventboard-background">
        <div className="EventBoard">
          <div className="header-banner">
            <h1>{data?.title}</h1>
            <div className="btn-container right">
              <Link className="button" to={`/profile?eventId=${eventId}`}>
                Event Profile
              </Link>
            </div>
          </div>
          <div className="board-container">
            <div className="drag-n-drop scrollbar">
              {!!data.items?.length &&
                data.items.map((column, columnIndex) => {
                  return (
                    <Swimlane
                      onDragEnter={
                        dragging && !column.items.length
                          ? (e) => handleDragEnter(e, { columnIndex, itemIndex: 0 })
                          : null
                      }
                      key={column.id}
                      title={column.title}
                      column={column}
                    >
                      {column.items.map((item, itemIndex) => {
                        return (
                          <SwimlaneItem
                            item={item}
                            draggable
                            onDragStart={(e) => {
                              handleDragStart(e, { columnIndex, itemIndex });
                            }}
                            onDragEnter={
                              dragging
                                ? (e) => {
                                    handleDragEnter(e, { columnIndex, itemIndex });
                                  }
                                : null
                            }
                            className={dragging ? getStyles({ columnIndex, itemIndex }) : "item"}
                            key={item.id}
                          />
                        );
                      })}

                      <div className="add-btn-container">
                        <div className="add-btn" onClick={(e) => openForm((e.target = columnIndex))}>
                          <FontAwesomeIcon icon={faPlus} className="add-item-button" />
                          <p>Add Task</p>
                        </div>

                        <Modal
                          isOpen={form.visible && form.column === columnIndex}
                          onClose={() => setForm({ ...form, visible: false })}
                        >
                          <TaskForm columnId={column.id} column={column.items} />
                        </Modal>
                      </div>
                    </Swimlane>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

EventBoard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      column_id: PropTypes.number,
      column_title: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          item_id: PropTypes.number,
          item_title: PropTypes.string,
          item_content: PropTypes.string,
        })
      ),
    })
  ),
};

export default withEventBoard(EventBoard);
