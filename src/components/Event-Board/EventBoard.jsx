import React, { Fragment, useState, useRef, useEffect } from "react";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import TaskForm from "./TaskForm";
import "./EventBoard.scss";
import Swimlane from "./Swimlane";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEventBoard, withEventBoard } from "../../contexts/EventBoardContext";
import SwimlaneItem from "./SwimlaneItem";
import Modal from "../Modal";

const EventBoard = () => {
  // Form
  const [form, setForm] = useState({ visible: false, column: null });
  const hasBeenDragged = useRef(false);

  const openForm = (columnId) => {
    setForm({ visible: true, column: columnId });
  };

  // Initial data
  const { data, updateColumns, setEventBoardData } = useEventBoard();

  // are we currently dragging the item?
  // drag event
  // useRef keeps stays constant between renders
  // event drag event, we save the coordiantes to the current (useRef)
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

      // need to add an event listener to the current event
      dragNode.current = e.target;
      dragNode.current.addEventListener("dragend", handleDragEnd);
      setTimeout(() => {
        setDragging(true);
        hasBeenDragged.current = true;
      }, 0);
    },
    [handleDragEnd, hasBeenDragged]
  );

  // Need to update what column the task is in
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

    // if the node is not equal to the current target
    if (e.target !== dragNode.current) {
      console.log("target is not the same");
      setEventBoardData((oldList) => {
        // deep copy
        let newList = JSON.parse(JSON.stringify(oldList.items));
        // splice -> if we take our params.itemIndex at zero
        // make sure same group
        // remove current item from current columnIndex
        newList[params.columnIndex].items.splice(
          params.itemIndex,
          0,
          newList[currItem.columnIndex].items.splice(currItem.itemIndex, 1)[0]
        );

        // the current item is not longer the current item, it is now the target item
        dragItem.current = params;

        // update the order keys on each task
        // const newListWithOrderKeysModified = formatDataForApiUpdate(newList);

        return { ...oldList, items: newList };
      });
    }
  };

  const getStyles = (params) => {
    // get the current item
    const currItem = dragItem.current;
    // if current columnIndex = params columnIndex, & current itemIndex = params itemIndex, return className
    if (currItem.columnIndex === params.columnIndex && currItem.itemIndex === params.itemIndex) {
      return "item current";
    }
    return "item";
  };

  return (
    <Fragment>
      <h1>{data?.title}</h1>
      <div className="board-container">
        <div className="drag-n-drop scrollbar">
          {/* column, and column index => for each column create column
           */}
          {!!data.items?.length &&
            data.items.map((column, columnIndex) => {
              return (
                // when there are no cards in the group...
                // if we are dragging, column has no items -> add listener (dragEnter)
                // sent event, {columnIndex, and itemIndex default to zero (as there is no item yet)}
                <Swimlane
                  onDragEnter={
                    dragging && !column.items.length ? (e) => handleDragEnter(e, { columnIndex, itemIndex: 0 }) : null
                  }
                  key={column.id}
                  title={column.title}
                >
                  {/* item, itemIndex => inside the column, iterate through all our items */}
                  {column.items.map((item, itemIndex) => {
                    return (
                      // pass the event, columnIndex and itemIndex (coordinates [0,0])
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
